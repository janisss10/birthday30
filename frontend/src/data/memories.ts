import type { Memory } from "../types/birthday";

export const memories: Memory[] = [
  {
    id: "memory-01",
    memoryTime: "2026-12-05T12:30:00",
    createdAt: "2026-12-05T12:35:00",
    photos: ["https://placehold.co/1200x800"],
    caption: "And so the birthday begins.",
  },
  {
    id: "memory-02",
    memoryTime: "2026-12-05T14:15:00",
    createdAt: "2026-12-05T14:20:00",
    photos: ["https://placehold.co/800x1000", "https://placehold.co/800x1000"],
    caption: "On our way to the next adventure.",
  },
  {
    id: "memory-03",
    memoryTime: "2026-12-05T16:45:00",
    createdAt: "2026-12-05T16:50:00",
    photos: [
      "https://placehold.co/800x1000",
      "https://placehold.co/800x1000",
      "https://placehold.co/800x1000",
    ],
    caption: "Two photos because one wasn't enough.",
  },
];
