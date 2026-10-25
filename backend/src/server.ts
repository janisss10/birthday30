import "./config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authMiddleware";
import { chapters } from "./data/chapters";
import { getProgress, saveProgress } from "./services/progress";
import { getMemories, saveMemories, type Memory } from "./services/memories";
import {
  deleteCloudinaryImage,
  getCloudinaryPublicId,
} from "./services/cloudinary";

const app = express();
const PORT = 3000;

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
app.get("/api/chapters", authenticateToken, (_req, res) => {
  const progress = getProgress();

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
});

app.post("/api/chapters/:chapterId/unlock", authenticateToken, (req, res) => {
  const chapterId = req.params.chapterId as string;
  const { code } = req.body;

  const chapter = chapters.find((item) => item.id === chapterId);

  if (!chapter) {
    return res.status(404).json({
      message: "chapter not found",
    });
  }

  const chapterIndex = chapters.findIndex((item) => item.id === chapterId);

  const progress = getProgress();

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
  saveProgress(progress);

  return res.json({
    message: "Chapter completed",
    chapterId,
  });
});

/*
 * MEMORIES
 */

// get all memories
app.get("/api/memories", authenticateToken, (_req, res) => {
  const memories = getMemories();

  return res.json(memories);
});

// create a new memory
app.post("/api/memories", authenticateToken, (req, res) => {
  const { memoryTime, createdAt, caption, photos } = req.body;

  if (!memoryTime || !createdAt || !Array.isArray(photos)) {
    return res.status(400).json({
      message: "Invalid memory data",
    });
  }

  const memories = getMemories();

  const newMemory: Memory = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    memoryTime,
    createdAt,
    caption: caption?.trim() ?? "",
    photos,
  };

  memories.push(newMemory);
  saveMemories(memories);

  return res.status(201).json(newMemory);
});

// update an existing memory
app.put("/api/memories/:memoryId", authenticateToken, (req, res) => {
  const memoryId = req.params.memoryId as string;
  const { memoryTime, caption, photos } = req.body;

  if (!memoryTime || !Array.isArray(photos)) {
    return res.status(400).json({
      message: "Invalid memory data",
    });
  }

  const memories = getMemories();

  const memoryIndex = memories.findIndex((memory) => memory.id === memoryId);

  if (memoryIndex === -1) {
    return res.status(404).json({
      message: "Memory not found",
    });
  }

  const existingMemory = memories[memoryIndex];

  const updatedMemory: Memory = {
    ...existingMemory,
    memoryTime,
    caption: caption?.trim() ?? "",
    photos,
  };

  memories[memoryIndex] = updatedMemory;

  saveMemories(memories);

  return res.json(updatedMemory);
});

// delete an existing memory
app.delete("/api/memories/:memoryId", authenticateToken, async (req, res) => {
  const memoryId = req.params.memoryId as string;

  // Find the memory to delete
  const memories = getMemories();
  const memoryIndex = memories.findIndex((memory) => memory.id === memoryId);

  if (memoryIndex === -1) {
    return res.status(404).json({ message: "Memory not found" });
  }

  const memory = memories[memoryIndex];

  try {
    // Delete all associated Cloudinary images first
    for (const photoUrl of memory.photos) {
      const publicId = getCloudinaryPublicId(photoUrl);

      if (!publicId) {
        throw new Error(`Could not extract Cloudinary public ID: ${photoUrl}`);
      }

      await deleteCloudinaryImage(publicId);
    }

    // Remove the memory record only after image deletion succeeds
    memories.splice(memoryIndex, 1);
    saveMemories(memories);

    return res.status(204).send();
  } catch (error) {
    console.error("Failed to delete memory and its images:", error);

    return res.status(500).json({
      message:
        "Failed to delete all memory photos. The memory record was kept.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
