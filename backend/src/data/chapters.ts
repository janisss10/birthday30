export type Chapter = {
  id: string;
  number: number;
  title: string;
  description: string;
  code: string;
  nextLocation?: string;
  nextLocationDetails?: string;
};

export const chapters: Chapter[] = [
  {
    id: "chapter-01",
    number: 1,
    title: "Let's Begin",
    description: "Every good birthday needs a proper start.",
    code: "1234",
    nextLocation: "Sentosa",
    nextLocationDetails: "Get your helmet ready. It's time to compete.",
  },
  {
    id: "chapter-02",
    number: 2,
    title: "Ready, Set, Go",
    description: "Time to pick up the pace.",
    code: "5678",
    nextLocation: "Escape Room (put location instead)",
    nextLocationDetails: "Time to put those brain cells to work.",
  },
  {
    id: "chapter-03",
    number: 3,
    title: "Think Fast",
    description: "Ready for a little challenge?",
    code: "2468",
    nextLocation: "Solace Studio",
    nextLocationDetails: "A little something to remember today by.",
  },
  {
    id: "chapter-04",
    number: 4,
    title: "Say Cheese",
    description: "Lights, Camera, Action.",
    code: "1357",
    nextLocation: "Marina Barrage",
    nextLocationDetails: "Good food. Good view. Good company.",
  },
];
