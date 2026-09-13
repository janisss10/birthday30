import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "motion/react";
import type { Chapter } from "../../types/birthday";

type ChapterCardProps = {
  chapter: Chapter;
  index: number;
  onClick: () => void;
};

const ChapterCard = ({ chapter, index, onClick }: ChapterCardProps) => {
  const isLocked = chapter.status === "locked";
  const isCompleted = chapter.status === "completed";
  const isAvailable = chapter.status === "available";

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: "easeOut",
          },
        },
      }}
    >
      <Box
        onClick={() => {
          if (!isLocked) {
            onClick();
          }
        }}
        sx={{
          position: "relative",
          py: 3,
          px: 1,
          borderTop: index === 0 ? "1px solid #D8D5CF" : "none",
          borderBottom: "1px solid #D8D5CF",
          cursor: isLocked ? "default" : "pointer",
          transition: "background-color 180ms ease, padding 180ms ease",

          "&:hover": !isLocked
            ? {
                backgroundColor: "#ECE9E2",
                px: 2,
              }
            : {},
        }}
      >
        <Stack direction="row" spacing={2.5}>
          {/* Chapter number */}
          <Typography
            sx={{
              minWidth: 48,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: isLocked ? "#B5B2AC" : "#777",
            }}
          >
            {String(chapter.number).padStart(2, "0")}
          </Typography>

          {/* Chapter content */}
          <Stack
            spacing={0.6}
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Stack direction="row" spacing={1}>
              <Typography
                sx={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isLocked ? "#B5B2AC" : "#888",
                }}
              >
                chapter
              </Typography>

              {isCompleted && (
                <CheckCircleIcon
                  sx={{
                    fontSize: "0.95rem",
                    color: "#777",
                  }}
                />
              )}
            </Stack>

            <Typography
              sx={{
                fontSize: "1.15rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: isLocked ? "#AAA7A1" : "#171717",
              }}
            >
              {chapter.title}
            </Typography>

            <Typography
              sx={{
                fontSize: "0.82rem",
                lineHeight: 1.6,
                color: isLocked ? "#B5B2AC" : "#777",
              }}
            >
              {isLocked
                ? "Complete the previous chapter to unlock this."
                : chapter.description}
            </Typography>
          </Stack>

          {/* Status */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 28,
            }}
          >
            {isLocked && (
              <LockOutlinedIcon
                sx={{
                  fontSize: "1rem",
                  color: "#AAA7A1",
                }}
              />
            )}

            {isCompleted && (
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#777",
                }}
              >
                DONE
              </Typography>
            )}

            {isAvailable && (
              <ArrowForwardIcon
                sx={{
                  fontSize: "1.15rem",
                  color: "#171717",
                }}
              />
            )}
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default ChapterCard;
