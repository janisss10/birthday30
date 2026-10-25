import { supabase } from "../supabase";

export type ProgressData = {
  completedChapters: string[];
};

const defaultProgress: ProgressData = {
  completedChapters: [],
};

export const getProgress = async (): Promise<ProgressData> => {
  const { data, error } = await supabase
    .from("chapter_progress")
    .select("completed_chapters")
    .eq("id", "main")
    .maybeSingle();

  console.log("Progress fetched from Supabase:", data);

  if (error) {
    throw new Error(`Failed to fetch chapter progress: ${error.message}`);
  }

  if (!data) {
    return { ...defaultProgress };
  }

  return {
    completedChapters: Array.isArray(data.completed_chapters)
      ? data.completed_chapters.filter(
          (chapterId): chapterId is string => typeof chapterId === "string",
        )
      : [],
  };
};

export const saveProgress = async (progress: ProgressData): Promise<void> => {
  const { error } = await supabase.from("chapter_progress").upsert(
    {
      id: "main",
      completed_chapters: progress.completedChapters,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`Failed to save chapter progress: ${error.message}`);
  }
};
