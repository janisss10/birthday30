import { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import type { Chapter } from "../types/birthday";
import { getChapters } from "../services/chapters";
import ChapterList from "../components/chapters/ChapterList";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const Chapters = () => {
  const navigate = useNavigate();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const data = await getChapters();

        setChapters(data);
      } catch {
        setError("Unable to load chapters.");
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F3EE",
        color: "#171717",
        px: 3,
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 650,
        }}
      >
        <Stack spacing={5}>
          {/* Header */}
          <MotionStack
            spacing={3}
            sx={{
              pt: { xs: 5, sm: 6 },
              width: "100%",
              textAlign: "center",
              alignItems: "center",
            }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.18,
                },
              },
            }}
          >
            {/* Announcement */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#777",
                }}
              >
                ✦ &nbsp; YOUR DAY AWAITS &nbsp; ✦
              </Typography>
            </motion.div>

            {/* Heading */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                  },
                },
              }}
            >
              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "3.4rem",
                    sm: "4.5rem",
                  },
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: "-0.06em",
                }}
              >
                the plan.
              </Typography>
            </motion.div>

            {/* Supporting text */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 12,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                  },
                },
              }}
            >
              <Typography
                sx={{
                  maxWidth: 430,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "#666",
                  letterSpacing: "0.01em",
                }}
              >
                A series of carefully planned activities.
                <br />
                Your cooperation is expected.
              </Typography>
            </motion.div>
          </MotionStack>

          {/* Divider */}
          <MotionBox
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              delay: 0.9,
              duration: 0.7,
              ease: "easeOut",
            }}
            sx={{
              width: "100%",
              transformOrigin: "center",
            }}
          >
            <Divider
              sx={{
                borderColor: "#D8D5CF",
              }}
            />
          </MotionBox>

          {/* Section heading */}
          <MotionStack
            spacing={1}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              THE DAY, UNFOLDED
            </Typography>

            <Typography
              sx={{
                fontSize: "0.9rem",
                color: "#888",
              }}
            >
              One chapter at a time. No spoilers.
            </Typography>
          </MotionStack>

          {/* Chapter list */}
          <ChapterList
            chapters={chapters}
            loading={loading}
            error={error}
            onChapterClick={(chapterId) => navigate(`/chapters/${chapterId}`)}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Chapters;
