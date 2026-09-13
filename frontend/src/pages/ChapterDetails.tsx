import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import type { Chapter } from "../types/birthday";
import { getChapters, unlockChapter } from "../services/chapters";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const chapterDetails = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadchapter = async () => {
      try {
        const chapters = await getChapters();

        const foundChapter = chapters.find((item) => item.id === chapterId);

        if (!foundChapter) {
          setError("Chapter not found.");
          return;
        }

        setChapter(foundChapter);

        const followingChapter = chapters.find(
          (item) => item.number === foundChapter.number + 1,
        );

        setNextChapter(followingChapter ?? null);
      } catch {
        setError("Unable to load chapter.");
      } finally {
        setLoading(false);
      }
    };

    loadchapter();
  }, [chapterId]);

  const handleUnlock = async () => {
    if (!chapterId || !code.trim()) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await unlockChapter(chapterId, code.trim());

      setSuccess("Chapter completed.");
      setCode("");
      setShowCodeInput(false);

      const chapters = await getChapters();

      const updatedChapter = chapters.find((item) => item.id === chapterId);

      if (updatedChapter) {
        setChapter(updatedChapter);
      }

      const followingChapter = chapters.find(
        (item) => item.number === (updatedChapter?.number ?? 0) + 1,
      );

      setNextChapter(followingChapter ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to complete chapter.",
      );
    }
  };

  if (loading) {
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
        <Box sx={{ width: "100%", maxWidth: 650 }}>
          <Typography sx={{ color: "#777", mt: 6 }}>
            Loading Chapter...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!chapter) {
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
        <Box sx={{ width: "100%", maxWidth: 650 }}>
          <Stack spacing={2} sx={{ mt: 6 }}>
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#777",
              }}
            >
              SOMETHING WENT WRONG
            </Typography>

            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              {error || "Chapter not found."}
            </Typography>

            <Button
              onClick={() => navigate("/chapters")}
              startIcon={<ArrowBackIcon />}
              sx={{
                alignSelf: "flex-start",
                borderRadius: 2,
                color: "#171717",
                textTransform: "none",
                fontWeight: 700,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(23, 23, 23, 0.04)",
                },
              }}
            >
              Back to Chapters
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F3EE",
        color: "#171717",
        px: 3,
        py: 4,
        pb: 12,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 650 }}>
        <MotionStack
          spacing={3}
          sx={{
            pt: { xs: 5, sm: 6 },
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Back button */}
          <Button
            onClick={() => navigate("/chapters")}
            startIcon={<ArrowBackIcon />}
            sx={{
              alignSelf: "flex-start",
              minWidth: 0,
              px: 1,
              color: "#777",
              borderRadius: 2,
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(23, 23, 23, 0.04)",
                color: "#171717",
              },
            }}
          >
            Back to Chapters
          </Button>

          {/* Chapter heading */}
          <Stack spacing={1.5}>
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#777",
              }}
            >
              CHAPTER {String(chapter.number).padStart(2, "0")}
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "3.1rem", sm: "4.3rem" },
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "-0.06em",
              }}
            >
              {chapter.title}
            </Typography>
          </Stack>

          {/* Divider */}
          <MotionBox
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.7,
              ease: "easeOut",
            }}
            sx={{
              width: "100%",
              transformOrigin: "center",
            }}
          >
            <Divider sx={{ borderColor: "#D8D5CF" }} />
          </MotionBox>

          {/* Main content */}
          <MotionStack
            spacing={3}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "#444",
              }}
            >
              {chapter.description}
            </Typography>

            {/* Completed state */}
            {chapter.status === "completed" ? (
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    pt: 1,
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      fontSize: 21,
                      color: "#171717",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Chapter completed
                  </Typography>
                </Stack>

                {/* Next chapter reveal */}
                {nextChapter && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                    sx={{
                      borderTop: "1px solid #D8D5CF",
                      pt: 3,
                    }}
                  >
                    <Stack spacing={2.5}>
                      <Stack spacing={0.8}>
                        <Typography
                          sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "#777",
                          }}
                        >
                          NEXT UP
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: { xs: "1.8rem", sm: "2rem" },
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                          }}
                        >
                          Chapter {String(nextChapter.number).padStart(2, "0")}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: "center",
                          color: "#555",
                        }}
                      >
                        <LocationOnOutlinedIcon sx={{ fontSize: 19 }} />

                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                          }}
                        >
                          Head to your next destination.
                        </Typography>
                      </Stack>

                      <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate("/chapters")}
                        sx={{
                          alignSelf: "flex-start",
                          backgroundColor: "#171717",
                          color: "#F5F3EE",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1.3,
                          textTransform: "none",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#171717",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Continue
                      </Button>
                    </Stack>
                  </MotionBox>
                )}

                {!nextChapter && (
                  <MotionBox
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.7,
                    }}
                    sx={{
                      borderTop: "1px solid #D8D5CF",
                      pt: 3,
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#777",
                        }}
                      >
                        THAT'S A WRAP
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: 700,
                        }}
                      >
                        You've reached the end.
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#777",
                          lineHeight: 1.7,
                        }}
                      >
                        Not bad. Now go enjoy the rest of your day.
                      </Typography>
                    </Stack>
                  </MotionBox>
                )}
              </Stack>
            ) : (
              /* Locked / incomplete state */
              <Stack spacing={2.5} sx={{ pt: 1 }}>
                {!showCodeInput && (
                  <>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                        color: "#777",
                      }}
                    >
                      <LockOutlinedIcon sx={{ fontSize: 18 }} />

                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          lineHeight: 1.5,
                        }}
                      >
                        Complete the chapter to receive your code.
                      </Typography>
                    </Stack>

                    <Button
                      variant="contained"
                      onClick={() => setShowCodeInput(true)}
                      sx={{
                        alignSelf: "flex-start",
                        backgroundColor: "#171717",
                        color: "#F5F3EE",
                        borderRadius: 2,
                        px: 2.5,
                        py: 1.3,
                        textTransform: "none",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#171717",
                          boxShadow: "none",
                        },
                      }}
                    >
                      I've completed this chapter
                    </Button>
                  </>
                )}

                {/* Code input */}
                {showCodeInput && (
                  <Stack
                    spacing={2}
                    sx={{
                      maxWidth: 420,
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#777",
                        }}
                      >
                        ✦ YOU MADE IT ✦
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: { xs: "1.8rem", sm: "2rem" },
                          fontWeight: 800,
                          letterSpacing: "-0.03em",
                          lineHeight: 1.1,
                        }}
                      >
                        So... what's the code?
                      </Typography>

                      <Typography
                        sx={{
                          maxWidth: 380,
                          fontSize: "0.9rem",
                          color: "#666",
                          lineHeight: 1.7,
                        }}
                      >
                        Enter the secret code you received after completing this
                        chapter.
                      </Typography>
                    </Stack>

                    <TextField
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      fullWidth
                      placeholder="Secret code"
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          backgroundColor: "rgba(255, 255, 255, 0.35)",
                          "& fieldset": {
                            borderColor: "#D8D5CF",
                          },
                          "&:hover fieldset": {
                            borderColor: "#AAA7A0",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#171717",
                          },
                        },
                      }}
                    />

                    <Stack direction="row" spacing={1.5}>
                      <Button
                        variant="contained"
                        onClick={handleUnlock}
                        disabled={!code.trim()}
                        sx={{
                          backgroundColor: "#171717",
                          color: "#F5F3EE",
                          borderRadius: 2,
                          px: 2.5,
                          py: 1.2,
                          textTransform: "none",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#171717",
                            boxShadow: "none",
                          },
                        }}
                      >
                        Unlock Chapter
                      </Button>

                      <Button
                        onClick={() => {
                          setShowCodeInput(false);
                          setCode("");
                          setError("");
                        }}
                        sx={{
                          borderRadius: 2,
                          color: "#777",
                          px: 2,
                          textTransform: "none",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          "&:hover": {
                            backgroundColor: "rgba(23, 23, 23, 0.04)",
                            color: "#171717",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            )}

            {success && !nextChapter && (
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#171717",
                }}
              >
                ✓ {success}
              </Typography>
            )}

            {error && (
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "#8A3B3B",
                }}
              >
                {error}
              </Typography>
            )}
          </MotionStack>
        </MotionStack>

        <Box sx={{ height: 30 }} />
      </Box>
    </Box>
  );
};

export default chapterDetails;
