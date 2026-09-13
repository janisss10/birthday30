import { Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import type { Chapter } from "../../types/birthday";
import ChapterCard from "./ChapterCard";

type ChapterListProps = {
  chapters: Chapter[];
  loading: boolean;
  error: string;
  onChapterClick: (chapterId: string) => void;
};

const ChapterList = ({
  chapters,
  loading,
  error,
  onChapterClick,
}: ChapterListProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 1.15,
            staggerChildren: 0.12,
          },
        },
      }}
    >
      <Stack spacing={0}>
        {loading && (
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 10,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            <Typography
              sx={{
                py: 4,
                textAlign: "center",
                color: "#888",
                fontSize: "0.9rem",
              }}
            >
              Preparing your itinerary...
            </Typography>
          </motion.div>
        )}

        {error && (
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              },
            }}
          >
            <Typography
              sx={{
                py: 4,
                textAlign: "center",
                color: "#A33",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </Typography>
          </motion.div>
        )}

        {!loading &&
          !error &&
          chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              onClick={() => onChapterClick(chapter.id)}
            />
          ))}
      </Stack>
    </motion.div>
  );
};

export default ChapterList;
