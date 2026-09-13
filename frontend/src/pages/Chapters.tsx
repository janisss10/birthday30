import { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { Chapter } from "../types/birthday";
import { getChapters } from "../services/chapters";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const chapters = () => {
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
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
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
                hidden: { opacity: 0, y: 25 },
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
                hidden: { opacity: 0, y: 12 },
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
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
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

          {/* Chapters */}
          <MotionStack
            spacing={0}
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
            {loading && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
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
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
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
              chapters.map((chapter, index) => {
                const isLocked = chapter.status === "locked";
                const isCompleted = chapter.status === "completed";
                const isAvailable = chapter.status === "available";

                return (
                  <motion.div
                    key={chapter.id}
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
                          navigate(`/chapters/${chapter.id}`);
                        }
                      }}
                      sx={{
                        position: "relative",
                        py: 3,
                        px: 1,
                        borderTop: index === 0 ? "1px solid #D8D5CF" : "none",
                        borderBottom: "1px solid #D8D5CF",
                        cursor: isLocked ? "default" : "pointer",
                        transition:
                          "background-color 180ms ease, padding 180ms ease",

                        "&:hover": !isLocked
                          ? {
                              backgroundColor: "#ECE9E2",
                              px: 2,
                            }
                          : {},
                      }}
                    >
                      <Stack direction="row" spacing={2.5}>
                        {/* chapter number */}
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

                        {/* chapter content */}
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
              })}
          </MotionStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default chapters;
