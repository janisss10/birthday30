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
            Look at us.
          </Typography>

          <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
            Made it through the whole thing. Here's your bonus content.
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
                    I wanted to make your 30th birthday a little different. Not
                    just another birthday, another cake, or another year older.
                    I wanted to put together a day filled with little things,
                    new experiences, and moments that we'd hopefully look back
                    on and smile about.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#444",
                      fontSize: "0.95rem",
                      lineHeight: 1.9,
                    }}
                  >
                    Thank you for being you. For the laughs, the silly moments,
                    the patience, and all the little things you do that probably
                    go unnoticed but never go unappreciated. Life is a lot more
                    fun with you in it, and I'm really glad I get to do it
                    alongside you.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#444",
                      fontSize: "0.95rem",
                      lineHeight: 1.9,
                    }}
                  >
                    Now that you're officially 30 (yes, I'm still going to
                    remind you), I hope this next chapter brings you more
                    reasons to laugh, more things to look forward to, and plenty
                    of opportunities to do the things you've always wanted to
                    do. I hope today gave you a few memories worth keeping. And
                    more than anything, I hope you know how loved you are, today
                    and on all the ordinary days in between.
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
            px: 2.5,
            py: 0.8,
            minWidth: "auto",
            alignSelf: "flex-start",
            borderRadius: "999px",
            backgroundColor: "#171717",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 400,
            letterSpacing: "0.02em",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          {isOpen ? "Close" : "Reveal"}
        </Button>
      </Stack>
    </Box>
  );
}
