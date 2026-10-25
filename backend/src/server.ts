import "./config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authMiddleware";
import { chapters } from "./data/chapters";
import { getProgress, saveProgress } from "./services/progress";
import {
  getMemories,
  createMemory,
  updateMemory,
  deleteMemoryRecord,
  type Memory,
} from "./services/memories";
import {
  deleteCloudinaryImage,
  getCloudinaryPublicId,
} from "./services/cloudinary";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

/*
 * HEALTHCHECK
 */
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "backend is running!",
  });
});

/*
 * AUTHENTICATION
 */
app.post("/api/auth/login", (req, res) => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({
      message: "PIN is required",
    });
  }

  if (pin !== process.env.PIN) {
    return res.status(401).json({
      message: "nice try, but nope",
    });
  }

  const token = jwt.sign(
    { authenticated: true },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return res.json({
    message: "Login successful",
    token,
  });
});

app.get("/api/auth/me", authenticateToken, (_req, res) => {
  res.json({ authenticated: true });
});

/*
 * CHAPTERS
 */
app.get("/api/chapters", authenticateToken, async (_req, res) => {
  try {
    const progress = await getProgress();

    const chapterProgress = chapters.map((chapter, index) => {
      const completed = progress.completedChapters.includes(chapter.id);

      const previousChapterCompleted =
        index === 0 ||
        progress.completedChapters.includes(chapters[index - 1].id);

      return {
        id: chapter.id,
        number: chapter.number,
        title: chapter.title,
        description: chapter.description,
        nextLocation: chapter.nextLocation,
        nextLocationDetails: chapter.nextLocationDetails,
        status: completed
          ? "completed"
          : previousChapterCompleted
            ? "available"
            : "locked",
      };
    });

    return res.json(chapterProgress);
  } catch (error) {
    console.error("Failed to fetch chapter progress:", error);

    return res.status(500).json({
      message: "Failed to load chapter progress",
    });
  }
});

app.post(
  "/api/chapters/:chapterId/unlock",
  authenticateToken,
  async (req, res) => {
    try {
      const chapterId = req.params.chapterId as string;
      const { code } = req.body;

      const chapter = chapters.find((item) => item.id === chapterId);

      if (!chapter) {
        return res.status(404).json({
          message: "chapter not found",
        });
      }

      const chapterIndex = chapters.findIndex((item) => item.id === chapterId);

      const progress = await getProgress();

      const previousChapterCompleted =
        chapterIndex === 0 ||
        progress.completedChapters.includes(chapters[chapterIndex - 1].id);

      if (!previousChapterCompleted) {
        return res.status(403).json({
          message: "This chapter is still locked",
        });
      }

      if (progress.completedChapters.includes(chapterId)) {
        return res.json({
          message: "Chapter already completed",
        });
      }

      if (code !== chapter.code) {
        return res.status(401).json({
          message: "Incorrect chapter code",
        });
      }

      progress.completedChapters.push(chapterId);

      await saveProgress(progress);

      return res.json({
        message: "Chapter completed",
        chapterId,
      });
    } catch (error) {
      console.error("Failed to unlock chapter:", error);

      return res.status(500).json({
        message: "Failed to save chapter progress",
      });
    }
  },
);

/*
 * MEMORIES
 */

// Get all memories
app.get("/api/memories", authenticateToken, async (_req, res) => {
  try {
    const memories = await getMemories();
    return res.json(memories);
  } catch (error) {
    console.error("Failed to fetch memories:", error);

    return res.status(500).json({
      message: "Failed to load memories",
    });
  }
});

// Create a new memory
app.post("/api/memories", authenticateToken, async (req, res) => {
  const { memoryTime, createdAt, caption, photos } = req.body;

  if (!memoryTime || !createdAt || !Array.isArray(photos)) {
    return res.status(400).json({
      message: "Invalid memory data",
    });
  }

  const newMemory: Memory = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    memoryTime,
    createdAt,
    caption: caption?.trim() ?? "",
    photos,
  };

  try {
    const savedMemory = await createMemory(newMemory);
    return res.status(201).json(savedMemory);
  } catch (error) {
    console.error("Failed to create memory:", error);

    return res.status(500).json({
      message: "Failed to save memory",
    });
  }
});

// Update an existing memory
app.put("/api/memories/:memoryId", authenticateToken, async (req, res) => {
  const memoryId = req.params.memoryId as string;
  const { memoryTime, caption, photos } = req.body;

  if (!memoryTime || !Array.isArray(photos)) {
    return res.status(400).json({
      message: "Invalid memory data",
    });
  }

  try {
    const updatedMemory = await updateMemory(memoryId, {
      memoryTime,
      caption: caption?.trim() ?? "",
      photos,
    });

    if (!updatedMemory) {
      return res.status(404).json({
        message: "Memory not found",
      });
    }

    return res.json(updatedMemory);
  } catch (error) {
    console.error("Failed to update memory:", error);

    return res.status(500).json({
      message: "Failed to update memory",
    });
  }
});

// Delete an existing memory
app.delete("/api/memories/:memoryId", authenticateToken, async (req, res) => {
  const memoryId = req.params.memoryId as string;

  try {
    // Find the memory first
    const memories = await getMemories();
    const memory = memories.find((item) => item.id === memoryId);

    if (!memory) {
      return res.status(404).json({
        message: "Memory not found",
      });
    }

    // Delete all associated Cloudinary images first
    for (const photoUrl of memory.photos) {
      const publicId = getCloudinaryPublicId(photoUrl);

      if (!publicId) {
        throw new Error(`Could not extract Cloudinary public ID: ${photoUrl}`);
      }

      await deleteCloudinaryImage(publicId);
    }

    // Delete the database record after image deletion succeeds
    const deleted = await deleteMemoryRecord(memoryId);

    if (!deleted) {
      return res.status(404).json({
        message: "Memory not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Failed to delete memory and its images:", error);

    return res.status(500).json({
      message:
        "Failed to delete memory or its photos. Please check the server logs.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
