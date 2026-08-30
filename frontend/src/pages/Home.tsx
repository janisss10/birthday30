import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const Home = () => {
  const navigate = useNavigate();

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
                ✦ &nbsp; A VERY IMPORTANT ANNOUNCEMENT &nbsp; ✦
              </Typography>
            </motion.div>

            {/* Main heading */}
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
                    xs: "3.1rem",
                    sm: "4.3rem",
                  },
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: "-0.06em",
                  maxWidth: 620,
                }}
              >
                unfortunately,
                <br />
                you're 30.
              </Typography>
            </motion.div>

            {/* Supporting text */}
            <Stack spacing={0.5}>
              {/* Slides in from the left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.7,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "#666",
                    letterSpacing: "0.01em",
                  }}
                >
                  There is no known cure.
                </Typography>
              </motion.div>

              {/* Slides in from the right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.9,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    fontWeight: 500,
                    color: "#666",
                    letterSpacing: "0.01em",
                  }}
                >
                  But I've planned something anyway.
                </Typography>
              </motion.div>
            </Stack>
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
                width: "100%",
                mx: "auto",
                borderColor: "#D8D5CF",
              }}
            />
          </MotionBox>

          {/* Text */}
          <MotionStack
            spacing={2.5}
            sx={{
              width: "100%",
              textAlign: "center",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.7,
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
              BEFORE WE BEGIN
            </Typography>

            <Typography
              sx={{
                maxWidth: 430,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#666",
                letterSpacing: "0.01em",
              }}
            >
              You don't need to know where we're going.
              <br />
              You don't need to know what's next.
              <br />
              You just need to show up.
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              I've got the rest.
            </Typography>
          </MotionStack>

          {/* Floating sparkles */}
          <Box
            sx={{
              height: 70,
              position: "relative",
              width: "100%",
            }}
          >
            {/* Left sparkle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.55, 0.25, 0.5],
                y: [0, -8, 0, -6],
              }}
              transition={{
                delay: 1.8,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                left: "18%",
                top: "25%",
                fontSize: "1rem",
              }}
            >
              ✦
            </motion.div>

            {/* Right sparkle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.45, 0.2, 0.45],
                y: [0, -6, 0, -9],
              }}
              transition={{
                delay: 2.1,
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                right: "20%",
                top: "45%",
                fontSize: "0.85rem",
              }}
            >
              ✦
            </motion.div>

            {/* Small sparkle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.35, 0.15, 0.35],
                y: [0, -7, 0, -5],
              }}
              transition={{
                delay: 2.4,
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                left: "35%",
                bottom: "5%",
                fontSize: "0.65rem",
              }}
            >
              ✦
            </motion.div>
          </Box>

          {/* Button */}
          <MotionStack
            spacing={1.5}
            sx={{
              pt: 1,
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.6,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/missions")}
              sx={{
                backgroundColor: "#171717",
                color: "#fff",
                borderRadius: 0,
                px: 4,
                py: 1.7,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "transform 150ms ease, background-color 150ms ease",

                "&:hover": {
                  backgroundColor: "#333",
                  transform: "translateY(-2px)",
                },

                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Fine. Let's go.
            </Button>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999",
                fontStyle: "italic",
              }}
            >
              * participation is unfortunately mandatory
            </Typography>
          </MotionStack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
