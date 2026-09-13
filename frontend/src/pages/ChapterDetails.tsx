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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import type { Chapter } from "../types/birthday";
import { getChapters, unlockChapter } from "../services/chapters";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const ChapterDetails = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadChapter = async () => {
      try {
        const chapters = await getChapters();

        const foundChapter = chapters.find((item) => item.id === chapterId);

        if (!foundChapter) {
          setError("Chapter not found.");
          return;
        }

        setChapter(foundChapter);
      } catch {
        setError("Unable to load chapter.");
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterId]);

  const handleUnlock = async () => {
    if (!chapterId || !code.trim()) {
      return;
    }

    setError("");

    try {
      await unlockChapter(chapterId, code.trim());

      setCode("");
      setShowCodeInput(false);

      const chapters = await getChapters();

      const updatedChapter = chapters.find((item) => item.id === chapterId);

      if (updatedChapter) {
        setChapter(updatedChapter);
      }
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Typography
          sx={{
            color: "#777",
            fontSize: "0.9rem",
          }}
        >
          Preparing your chapter...
        </Typography>
      </Box>
    );
  }

  if (!chapter) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F5F3EE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: "100%",
            maxWidth: 650,
          }}
        >
          <Typography
            sx={{
              color: "#171717",
              fontSize: "1rem",
            }}
          >
            {error || "Chapter not found."}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/chapters")}
            sx={{
              alignSelf: "flex-start",
              borderColor: "#171717",
              color: "#171717",
              borderRadius: 2,
              textTransform: "none",
              "&:hover": {
                borderColor: "#171717",
                backgroundColor: "transparent",
              },
            }}
          >
            Back to chapters
          </Button>
        </Stack>
      </Box>
    );
  }

  const isCompleted = chapter.status === "completed";
  const showStartingLocation = chapter.number === 1 && !isCompleted;
  const showNextLocation = isCompleted && Boolean(chapter.nextLocation);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F3EE",
        px: 3,
        py: 6,
      }}
    >
      <MotionStack
        spacing={5}
        sx={{
          width: "100%",
          maxWidth: 650,
          mx: "auto",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* Back */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/chapters")}
          sx={{
            alignSelf: "flex-start",
            color: "#666",
            px: 0,
            textTransform: "none",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "transparent",
              color: "#171717",
            },
          }}
        >
          Back to chapters
        </Button>

        {/* Chapter heading */}
        <Stack spacing={1.5}>
          <Typography
            sx={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "#777",
              textTransform: "uppercase",
            }}
          >
            Chapter {String(chapter.number).padStart(2, "0")}
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.5rem",
                sm: "3rem",
              },
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              color: "#171717",
            }}
          >
            {chapter.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#666",
              maxWidth: 500,
            }}
          >
            {chapter.description}
          </Typography>
        </Stack>

        {/* Starting / next destination */}
        {(showStartingLocation || showNextLocation) && (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
            }}
          >
            <Stack spacing={3}>
              <Divider sx={{ borderColor: "#D8D5CF" }} />

              <Stack spacing={1.5}>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    color: "#777",
                    textTransform: "uppercase",
                  }}
                >
                  Up next
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: "2.2rem",
                      sm: "2.6rem",
                    },
                    lineHeight: 1.05,
                    fontWeight: 500,
                    letterSpacing: "-0.04em",
                    color: "#171717",
                  }}
                >
                  {showStartingLocation
                    ? "A cafe (put location instead)"
                    : chapter.nextLocation}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: "#666",
                    maxWidth: 500,
                  }}
                >
                  {showStartingLocation
                    ? "First things first, we need fuel for the day."
                    : chapter.nextLocationDetails}
                </Typography>
              </Stack>

              <Divider sx={{ borderColor: "#D8D5CF" }} />
            </Stack>
          </MotionBox>
        )}

        {/* Completed state */}
        {isCompleted ? (
          <MotionStack
            spacing={3}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.15,
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
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
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#171717",
                }}
              >
                Chapter completed
              </Typography>
            </Stack>
          </MotionStack>
        ) : (
          /* Incomplete state */
          <Stack spacing={3}>
            <Button
              variant="contained"
              onClick={() => {
                setShowCodeInput(true);
                setError("");
              }}
              sx={{
                alignSelf: "flex-start",
                backgroundColor: "#171717",
                color: "#F5F3EE",
                borderRadius: 2,
                px: 2.5,
                py: 1.2,
                textTransform: "none",
                fontSize: "0.9rem",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#171717",
                  boxShadow: "none",
                },
              }}
            >
              I've completed this chapter
            </Button>

            {/* Code input */}
            {showCodeInput && (
              <MotionBox
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                sx={{
                  pt: 1,
                }}
              >
                <Stack spacing={2.5}>
                  <Stack spacing={0.75}>
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.16em",
                        color: "#777",
                        textTransform: "uppercase",
                      }}
                    >
                      ✦ You made it ✦
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.35rem",
                        fontWeight: 500,
                        color: "#171717",
                      }}
                    >
                      So... what's the code?
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        color: "#666",
                      }}
                    >
                      Enter the secret code you received after completing this
                      chapter.
                    </Typography>
                  </Stack>

                  <TextField
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value);
                      setError("");
                    }}
                    placeholder="Secret code"
                    fullWidth
                    error={Boolean(error)}
                    helperText={error || undefined}
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: 2,
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
                        textTransform: "none",
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
                      variant="text"
                      onClick={() => {
                        setShowCodeInput(false);
                        setCode("");
                        setError("");
                      }}
                      sx={{
                        color: "#666",
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </MotionBox>
            )}
          </Stack>
        )}

        {error && !showCodeInput && (
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "#777",
            }}
          >
            {error}
          </Typography>
        )}
      </MotionStack>
    </Box>
  );
};

export default ChapterDetails;
