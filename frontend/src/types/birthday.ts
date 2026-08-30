export type MissionStatus = "locked" | "available" | "completed";

export type Mission = {
  id: string;
  number: number;
  title: string;
  description: string;
  status: MissionStatus;
};

export type Memory = {
  id: string;
  memoryTime: string;
  createdAt: string;
  photos: string[];
  caption?: string;
};
