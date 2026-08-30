import type { Mission } from "../types/birthday";
import { apiFetch } from "../utils/api";

export const getMissions = async (): Promise<Mission[]> => {
  const response = await apiFetch("/missions");

  if (!response.ok) {
    throw new Error("Failed to fetch missions");
  }

  return response.json();
};

export const unlockMission = async (missionId: string, code: string) => {
  const response = await apiFetch(`/missions/${missionId}/unlock`, {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to unlock mission");
  }

  return data;
};
