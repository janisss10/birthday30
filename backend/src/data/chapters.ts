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
    title: "A Slow Start",
    description: "Every good birthday needs a proper start.",
    code: "1612",
    nextLocation: "Let's Get This Feast Started",
    nextLocationDetails: "Hope you brought your appetite.",
  },
  {
    id: "chapter-02",
    number: 2,
    title: "A Table for Two",
    description: "A little good food before the next adventure.",
    code: "1996",
    nextLocation: "Serving Looks",
    nextLocationDetails: "Time to give the camera something to work with.",
  },
  {
    id: "chapter-03",
    number: 3,
    title: "Say Cheese",
    description: "Proof that we were here.",
    code: "0305",
    nextLocation: "Notes of Something Special",
    nextLocationDetails: "Let's make a little something worth remembering.",
  },
  {
    id: "chapter-04",
    number: 4,
    title: "A Scent of Adventure",
    description: "Time to create something that's uniquely yours.",
    code: "2025",
    nextLocation: "The Art of Doing Nothing",
    nextLocationDetails: "Time to recharge those batteries.",
  },
  {
    id: "chapter-05",
    number: 5,
    title: "Take a Breather",
    description: "Time to slow things down.",
    code: "2026",
    nextLocation: "The Grand Finale",
    nextLocationDetails:
      "No spoilers. Just know I've saved something VERY good for last.",
  },
];
