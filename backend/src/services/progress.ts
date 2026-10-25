import fs from "fs";
import path from "path";

type ProgressData = {
  completedChapters: string[];
};

const progressFilePath = path.join(process.cwd(), "data", "progress.json");

const defaultProgress: ProgressData = {
  completedChapters: [],
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
  const parsed: unknown = JSON.parse(file);

  if (
    typeof parsed === "object" &&
    parsed !== null &&
    "completedChapters" in parsed &&
    Array.isArray(parsed.completedChapters) &&
    parsed.completedChapters.every((chapterId) => typeof chapterId === "string")
  ) {
    return {
      completedChapters: parsed.completedChapters,
    };
  }

  // Fall back safely if the saved structure is invalid
  return {
    completedChapters: [],
  };
};

export const saveProgress = (progress: ProgressData) => {
  ensureProgressFile();

  fs.writeFileSync(progressFilePath, JSON.stringify(progress, null, 2));
};
