export type ChaptersStatus = "locked" | "available" | "completed";

export type Chapter = {
  id: string;
  number: number;
  title: string;
  description: string;
  status: ChaptersStatus;
  nextLocation?: string;
  nextLocationDetails?: string;
};

export type Memory = {
  id: string;
  memoryTime: string;
  createdAt: string;
  photos: string[];
  caption?: string;
};
