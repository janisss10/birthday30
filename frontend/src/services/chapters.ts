import type { Chapter } from "../types/birthday";
import { apiFetch } from "../utils/api";

export const getChapters = async (): Promise<Chapter[]> => {
  const response = await apiFetch("/chapters");

  if (!response.ok) {
    throw new Error("Failed to fetch chapters");
  }

  return response.json();
};

export const unlockChapter = async (chapterId: string, code: string) => {
  const response = await apiFetch(`/chapters/${chapterId}/unlock`, {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to unlock chapter");
  }

  return data;
};
