export type Mission = {
  id: string;
  number: number;
  title: string;
  description: string;
  code: string;
};

export const missions: Mission[] = [
  {
    id: "mission-01",
    number: 1,
    title: "Let's Begin",
    description: "Your birthday adventure starts here.",
    code: "1234",
  },
  {
    id: "mission-02",
    number: 2,
    title: "Ready, Set, Go",
    description: "Something exciting is waiting for you.",
    code: "5678",
  },
  {
    id: "mission-03",
    number: 3,
    title: "Think Fast",
    description: "Time to put those brain cells to work.",
    code: "2468",
  },
  {
    id: "mission-04",
    number: 4,
    title: "Say Cheese",
    description: "A little something to remember today by.",
    code: "1357",
  },
  {
    id: "mission-05",
    number: 5,
    title: "Slow Down",
    description: "The best part of the day is still ahead.",
    code: "3030",
  },
];
