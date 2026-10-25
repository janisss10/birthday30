import type { Memory } from "../types/birthday";

const API_URL = "http://localhost:3000";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("birthday30_token")}`,
  "Content-Type": "application/json",
});

export const getMemories = async (): Promise<Memory[]> => {
  const response = await fetch(`${API_URL}/api/memories`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to load memories");
  }

  return response.json();
};

export const createMemory = async (
  memory: Omit<Memory, "id">,
): Promise<Memory> => {
  const response = await fetch(`${API_URL}/api/memories`, {
    method: "POST",
    headers: getAuthHeaders(),
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
  const response = await fetch(`${API_URL}/api/memories/${memoryId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(memory),
  });

  if (!response.ok) {
    throw new Error("Failed to update memory");
  }

  return response.json();
};

export const deleteMemory = async (memoryId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/memories/${memoryId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete memory");
  }
};
