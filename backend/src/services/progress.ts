import fs from "fs";
import path from "path";

type ProgressData = {
  completedMissions: string[];
};

const progressFilePath = path.join(process.cwd(), "data", "progress.json");

const defaultProgress: ProgressData = {
  completedMissions: [],
};

const ensureProgressFile = () => {
  const dataDirectory = path.dirname(progressFilePath);

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, {
      recursive: true,
    });
  }

  if (!fs.existsSync(progressFilePath)) {
    fs.writeFileSync(
      progressFilePath,
      JSON.stringify(defaultProgress, null, 2),
    );
  }
};

export const getProgress = (): ProgressData => {
  ensureProgressFile();

  const file = fs.readFileSync(progressFilePath, "utf-8");

  return JSON.parse(file);
};

export const saveProgress = (progress: ProgressData) => {
  ensureProgressFile();

  fs.writeFileSync(progressFilePath, JSON.stringify(progress, null, 2));
};
