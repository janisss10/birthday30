import { Box, Divider, Stack, Typography } from "@mui/material";
import { memories } from "../data/memories";
import { motion } from "motion/react";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const Memories = () => {
  const sortedMemories = [...memories].sort(
    (a, b) =>
      new Date(a.memoryTime).getTime() - new Date(b.memoryTime).getTime(),
  );

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
            spacing={2.5}
            sx={{
              pt: { xs: 5, sm: 6 },
              width: "100%",
              textAlign: "center",
              alignItems: "center",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
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
              ✦ &nbsp; THE DAY, RECORDED &nbsp; ✦
            </Typography>

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
              memory lane
            </Typography>

            <Typography
              sx={{
                maxWidth: 420,
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "#666",
                letterSpacing: "0.01em",
              }}
            >
              A few moments worth remembering.
            </Typography>
          </MotionStack>

          {/* Divider */}
          <MotionBox
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: 0.3,
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

          {/* Memory timeline */}
          <Stack spacing={5}>
            {sortedMemories.map((memory, index) => {
              const photoCount = memory.photos.length;

              return (
                <MotionStack
                  key={memory.id}
                  spacing={2}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + index * 0.12,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                >
                  {/* Memory time */}
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#777",
                    }}
                  >
                    {new Date(memory.memoryTime).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </Typography>

                  {/* Photo gallery */}
                  <Box
                    sx={{
                      width: "100%",
                      overflowX: photoCount >= 3 ? "auto" : "hidden",
                      overflowY: "hidden",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        width: photoCount >= 3 ? "max-content" : "100%",
                        alignItems: "center",
                        justifyContent:
                          photoCount >= 3 ? "flex-start" : "center",
                        ...(photoCount >= 3 && {
                          px: 3,
                        }),
                      }}
                    >
                      {memory.photos.map((photo, photoIndex) => (
                        <Box
                          key={`${memory.id}-${photoIndex}`}
                          component="img"
                          src={photo}
                          alt=""
                          sx={{
                            display: "block",
                            width: "auto",
                            height: "auto",

                            maxWidth:
                              photoCount === 1
                                ? "85%"
                                : photoCount === 2
                                  ? "46%"
                                  : 150,

                            maxHeight:
                              photoCount === 1
                                ? 220
                                : photoCount === 2
                                  ? 190
                                  : 160,

                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Optional caption */}
                  {memory.caption && (
                    <Typography
                      sx={{
                        maxWidth: 500,
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "#555",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {memory.caption}
                    </Typography>
                  )}

                  {/* Divider between memories */}
                  {index < sortedMemories.length - 1 && (
                    <Divider
                      sx={{
                        mt: 2,
                        borderColor: "#D8D5CF",
                      }}
                    />
                  )}
                </MotionStack>
              );
            })}
          </Stack>

          {/* Bottom breathing room */}
          <Box sx={{ height: 30 }} />
        </Stack>
      </Box>
    </Box>
  );
};

export default Memories;
