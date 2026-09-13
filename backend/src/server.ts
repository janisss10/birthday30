import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authMiddleware";
import { chapters } from "./data/chapters";
import { getProgress, saveProgress } from "./services/progress";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "backend is running!",
  });
});

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
    {
      authenticated: true,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return res.json({
    message: "Login successful",
    token,
  });
});

app.get("/api/auth/me", authenticateToken, (_req, res) => {
  res.json({
    authenticated: true,
  });
});

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
      message: "Hmm... that's not it",
    });
  }

  progress.completedChapters.push(chapterId);

  saveProgress(progress);

  return res.json({
    message: "Chapter completed",
    chapterId,
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
