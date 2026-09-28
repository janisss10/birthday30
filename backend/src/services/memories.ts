import fs from "fs";
import path from "path";

export type Memory = {
  id: string;
  memoryTime: string;
  createdAt: string;
  caption?: string;
  photos: string[];
};

const memoriesFilePath = path.join(__dirname, "../../data/memories.json");

export const getMemories = (): Memory[] => {
  if (!fs.existsSync(memoriesFilePath)) {
    return [];
  }

  const file = fs.readFileSync(memoriesFilePath, "utf-8");

  return JSON.parse(file);
};

export const saveMemories = (memories: Memory[]) => {
  fs.writeFileSync(memoriesFilePath, JSON.stringify(memories, null, 2));
};
