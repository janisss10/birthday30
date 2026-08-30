import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const Login = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("birthday30_token", data.token);

      navigate("/");
    } catch {
      setError("Unable to connect to the server.");
    }
  };

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
                ✦ &nbsp; A SMALL SECURITY MEASURE &nbsp; ✦
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
                    xs: "3.1rem",
                    sm: "4.3rem",
                  },
                  fontWeight: 900,
                  lineHeight: 0.92,
                  letterSpacing: "-0.06em",
                }}
              >
                before we begin,
                <br />
                prove it's you.
              </Typography>
            </motion.div>

            {/* Supporting text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <Typography
                sx={{
                  maxWidth: 420,
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  color: "#666",
                  letterSpacing: "0.01em",
                }}
              >
                This adventure is strictly for the birthday person.
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
                width: "100%",
                mx: "auto",
                borderColor: "#D8D5CF",
              }}
            />
          </MotionBox>

          {/* Login form */}
          <MotionStack
            spacing={2.5}
            sx={{
              width: "100%",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.1,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              ENTER YOUR SECRET PIN
            </Typography>

            <TextField
              type="password"
              value={pin}
              onChange={(event) => {
                const value = event.target.value.replace(/\D/g, "");

                setPin(value);
                setError("");
              }}
              fullWidth
              autoFocus
              placeholder="••••••"
              error={Boolean(error)}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  maxLength: 6,
                  style: {
                    textAlign: "center",
                    letterSpacing: "0.35em",
                    fontSize: "1.2rem",
                  },
                },
              }}
              sx={{
                maxWidth: 360,

                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  backgroundColor: "#FFFFFF",

                  "& fieldset": {
                    borderColor: "#D8D5CF",
                  },

                  "&:hover fieldset": {
                    borderColor: "#999",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#171717",
                    borderWidth: 1,
                  },
                },
              }}
            />

            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  borderRadius: 0,
                  fontSize: "0.8rem",
                }}
              >
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleLogin}
              disabled={!pin}
              sx={{
                mt: 1,
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

                "&.Mui-disabled": {
                  backgroundColor: "#D8D5CF",
                  color: "#999",
                },
              }}
            >
              Unlock the adventure
            </Button>

            <Typography
              sx={{
                fontSize: "0.65rem",
                color: "#999",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              * apparently this is necessary
            </Typography>
          </MotionStack>

          {/* Bottom decoration */}
          <Box
            sx={{
              height: 70,
              position: "relative",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.5, 0.2, 0.5],
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
                left: "25%",
                top: "25%",
                fontSize: "1rem",
              }}
            >
              ✦
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.4, 0.15, 0.4],
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
                right: "25%",
                top: "45%",
                fontSize: "0.85rem",
              }}
            >
              ✦
            </motion.div>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
