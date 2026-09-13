export type Chapter = {
  id: string;
  number: number;
  title: string;
  description: string;
  code: string;
  nextLocation: string;
  nextLocationDetails: string;
};

export const chapters: Chapter[] = [
  {
    id: "chapter-01",
    number: 1,
    title: "Let's Begin",
    description: "Your birthday adventure starts here.",
    code: "1234",
    nextLocation: "A cafe in Toa Payoh",
    nextLocationDetails: "Head here for your first stop.",
  },

  {
    id: "chapter-02",
    number: 2,
    title: "Ready, Set, Go",
    description: "Something exciting is waiting for you.",
    code: "5678",
    nextLocation: "Sentosa",
    nextLocationDetails: "Make your way here for what's next.",
  },

  {
    id: "chapter-03",
    number: 3,
    title: "Think Fast",
    description: "Time to put those brain cells to work.",
    code: "2468",
    nextLocation: "Escape Room",
    nextLocationDetails: "Head here when you're ready.",
  },

  {
    id: "chapter-04",
    number: 4,
    title: "Say Cheese",
    description: "A little something to remember today by.",
    code: "1357",
    nextLocation: "Solace Studio",
    nextLocationDetails: "The final chapter awaits.",
  },

  {
    id: "chapter-05",
    number: 5,
    title: "Slow Down",
    description: "The best part of the day is still ahead.",
    code: "3030",
    nextLocation: "Marina Barrage",
    nextLocationDetails: "",
  },
];
