import type { Memory } from "../types/birthday";
import { apiFetch } from "../utils/api";

export const getMemories = async (): Promise<Memory[]> => {
  const response = await apiFetch("/memories");

  if (!response.ok) {
    throw new Error("Failed to load memories");
  }

  return response.json();
};

export const createMemory = async (
  memory: Omit<Memory, "id">,
): Promise<Memory> => {
  const response = await apiFetch("/memories", {
    method: "POST",
    body: JSON.stringify(memory),
  });

  if (!response.ok) {
    throw new Error("Failed to create memory");
  }

  return response.json();
};

export const updateMemory = async (
  memoryId: string,
  memory: Omit<Memory, "id" | "createdAt">,
): Promise<Memory> => {
  const response = await apiFetch(`/memories/${memoryId}`, {
    method: "PUT",
    body: JSON.stringify(memory),
  });

  if (!response.ok) {
    throw new Error("Failed to update memory");
  }

  return response.json();
};

export const deleteMemory = async (memoryId: string): Promise<void> => {
  const response = await apiFetch(`/memories/${memoryId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete memory");
  }
};
