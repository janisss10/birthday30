import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authMiddleware";
import { missions } from "./data/missions";
import { getProgress, saveProgress } from "./services/progress";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Mission 30 backend is running!",
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

app.get("/api/missions", authenticateToken, (_req, res) => {
  const progress = getProgress();

  const missionProgress = missions.map((mission, index) => {
    const completed = progress.completedMissions.includes(mission.id);

    const previousMissionCompleted =
      index === 0 ||
      progress.completedMissions.includes(missions[index - 1].id);

    return {
      id: mission.id,
      number: mission.number,
      title: mission.title,
      description: mission.description,
      status: completed
        ? "completed"
        : previousMissionCompleted
          ? "available"
          : "locked",
    };
  });

  return res.json(missionProgress);
});

app.post("/api/missions/:missionId/unlock", authenticateToken, (req, res) => {
  const missionId = req.params.missionId as string;
  const { code } = req.body;

  const mission = missions.find((item) => item.id === missionId);

  if (!mission) {
    return res.status(404).json({
      message: "Mission not found",
    });
  }

  const missionIndex = missions.findIndex((item) => item.id === missionId);

  const progress = getProgress();

  const previousMissionCompleted =
    missionIndex === 0 ||
    progress.completedMissions.includes(missions[missionIndex - 1].id);

  if (!previousMissionCompleted) {
    return res.status(403).json({
      message: "This mission is still locked",
    });
  }

  if (progress.completedMissions.includes(missionId)) {
    return res.json({
      message: "Mission already completed",
    });
  }

  if (code !== mission.code) {
    return res.status(401).json({
      message: "Incorrect mission code",
    });
  }

  progress.completedMissions.push(missionId);

  saveProgress(progress);

  return res.json({
    message: "Mission completed",
    missionId,
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
