import { supabase } from "../supabase";

export type Memory = {
  id: string;
  memoryTime: string;
  createdAt: string;
  caption?: string;
  photos: string[];
};

type MemoryRow = {
  id: string;
  memory_time: string;
  created_at: string;
  caption: string | null;
  photos: string[];
};

const toMemory = (row: MemoryRow): Memory => ({
  id: row.id,
  memoryTime: row.memory_time,
  createdAt: row.created_at,
  caption: row.caption ?? "",
  photos: row.photos ?? [],
});

export const getMemories = async (): Promise<Memory[]> => {
  const { data, error } = await supabase
    .from("memories")
    .select("id, memory_time, created_at, caption, photos")
    .order("memory_time", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch memories: ${error.message}`);
  }

  return (data as MemoryRow[]).map(toMemory);
};

export const createMemory = async (memory: Memory): Promise<Memory> => {
  const { data, error } = await supabase
    .from("memories")
    .insert({
      id: memory.id,
      memory_time: memory.memoryTime,
      created_at: memory.createdAt,
      caption: memory.caption ?? "",
      photos: memory.photos,
    })
    .select("id, memory_time, created_at, caption, photos")
    .single();

  if (error) {
    throw new Error(`Failed to create memory: ${error.message}`);
  }

  return toMemory(data as MemoryRow);
};

export const updateMemory = async (
  memoryId: string,
  updates: Pick<Memory, "memoryTime" | "caption" | "photos">,
): Promise<Memory | null> => {
  const { data, error } = await supabase
    .from("memories")
    .update({
      memory_time: updates.memoryTime,
      caption: updates.caption ?? "",
      photos: updates.photos,
    })
    .eq("id", memoryId)
    .select("id, memory_time, created_at, caption, photos")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to update memory: ${error.message}`);
  }

  return data ? toMemory(data as MemoryRow) : null;
};

export const deleteMemoryRecord = async (
  memoryId: string,
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("memories")
    .delete()
    .eq("id", memoryId)
    .select("id");

  if (error) {
    throw new Error(`Failed to delete memory: ${error.message}`);
  }

  return data.length > 0;
};
