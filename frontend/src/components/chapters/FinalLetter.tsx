import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function FinalLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        mt: 8,
        mb: 5,
        px: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 620 }}>
        {/* Introduction */}
        <Stack spacing={1}>
          <Typography
            sx={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "2rem",
              fontStyle: "italic",
              color: "#171717",
            }}
          >
            and that's a wrap.
          </Typography>

          <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
            But before you go, there's one more thing.
          </Typography>
        </Stack>

        {/* Envelope */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "min(100%, 380px)",
            height: 190,
            perspective: 1000,
          }}
        >
          {/* Envelope body */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "8px",
              background: "#E8DDCC",
              boxShadow: "0 8px 24px rgba(23, 23, 23, 0.08)",
              overflow: "hidden",
            }}
          />

          {/* Envelope side folds */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "#D7C8B5",
              clipPath: "polygon(0 0, 50% 58%, 0 100%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "#D1C0AB",
              clipPath: "polygon(100% 0, 50% 58%, 100% 100%)",
            }}
          />

          {/* Bottom fold */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "#DCCDBB",
              clipPath: "polygon(0 100%, 50% 43%, 100% 100%)",
            }}
          />

          {/* Envelope flap */}
          <motion.div
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "#C9B69F",
                clipPath: "polygon(0 0, 100% 0, 50% 62%)",
              }}
            />
          </motion.div>

          {/* Small envelope label */}
          {!isOpen && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                pt: 2,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "1.25rem",
                  fontStyle: "italic",
                  color: "#514638",
                }}
              >
                for you, always.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Letter */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="letter"
              initial={{
                opacity: 0,
                height: 0,
                y: -65,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: -25,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -45,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: "100%",
                maxWidth: 580,
                overflow: "hidden",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  background: "#FBF9F5",
                  border: "1px solid #E8E1D7",
                  borderRadius: "4px",
                  boxShadow: "0 12px 35px rgba(23, 23, 23, 0.07)",
                  px: { xs: 3, sm: 5 },
                  py: { xs: 4, sm: 6 },
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    color: "#999",
                    textAlign: "center",
                    mb: 3,
                  }}
                >
                  A LITTLE NOTE FOR YOU
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "1.35rem",
                    color: "#171717",
                    mb: 3,
                  }}
                >
                  To my favourite person,
                </Typography>

                <Stack spacing={2.5}>
                  <Typography
                    sx={{
                      color: "#444",
                      fontSize: "0.95rem",
                      lineHeight: 1.9,
                    }}
                  >
                    I wanted to make this birthday a little different, something
                    that wasn't just another day on the calendar.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#444",
                      fontSize: "0.95rem",
                      lineHeight: 1.9,
                    }}
                  >
                    test test 1 2 3
                  </Typography>

                  <Typography
                    sx={{
                      color: "#444",
                      fontSize: "0.95rem",
                      lineHeight: 1.9,
                    }}
                  >
                    testing testing 11 22 33
                  </Typography>
                </Stack>

                <Box sx={{ mt: 5 }}>
                  <Typography
                    sx={{
                      color: "#666",
                      fontSize: "0.9rem",
                      mb: 1,
                    }}
                  >
                    All my love,
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "1.8rem",
                      fontStyle: "italic",
                      color: "#171717",
                    }}
                  >
                    Yours, always.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open / close button */}
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          disableElevation
          sx={{
            mt: isOpen ? -1 : 0,
            px: 3.5,
            py: 1.3,
            borderRadius: "999px",
            backgroundColor: "#171717",
            color: "#fff",
            fontSize: "0.8rem",
            fontWeight: 400,
            letterSpacing: "0.02em",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          {isOpen ? "Fold the letter away" : "Open your letter"}
        </Button>
      </Stack>
    </Box>
  );
}
