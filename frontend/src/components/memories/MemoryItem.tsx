import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { motion } from "motion/react";
import type { Memory } from "../../types/birthday";

type MemoryItemProps = {
  memory: Memory;
  index: number;
  totalMemories: number;
  onEdit: (memory: Memory) => void;
  onDelete: (memoryId: string) => void;
};

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const MemoryItem = ({
  memory,
  index,
  totalMemories,
  onEdit,
  onDelete,
}: MemoryItemProps) => {
  const photoCount = memory.photos.length;

  return (
    <MotionStack
      spacing={2}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5 + index * 0.12,
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      {/* Time + actions */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            right: 0,
          }}
        >
          <IconButton
            onClick={() => onEdit(memory)}
            size="small"
            sx={{
              color: "#777",
              "&:hover": {
                color: "#171717",
                backgroundColor: "rgba(23, 23, 23, 0.04)",
              },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 17 }} />
          </IconButton>

          <IconButton
            onClick={() => onDelete(memory.id)}
            size="small"
            sx={{
              color: "#777",
              "&:hover": {
                color: "#171717",
                backgroundColor: "rgba(23, 23, 23, 0.04)",
              },
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Stack>
      </Box>

      {/* Photos */}
      {photoCount > 0 && (
        <MotionBox
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.65 + index * 0.12,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
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
                justifyContent: photoCount >= 3 ? "flex-start" : "center",
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
                      photoCount === 1 ? "85%" : photoCount === 2 ? "46%" : 150,
                    maxHeight:
                      photoCount === 1 ? 220 : photoCount === 2 ? 190 : 160,
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              ))}
            </Stack>
          </Box>
        </MotionBox>
      )}

      {/* Caption */}
      {memory.caption && (
        <MotionBox
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8 + index * 0.12,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <Typography
            sx={{
              maxWidth: 500,
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontWeight: 500,
              fontSize: "1.05rem",
              lineHeight: 1.6,
              fontStyle: "italic",
              color: "#444",
              letterSpacing: "0.01em",
              textAlign: "center",
            }}
          >
            {memory.caption}
          </Typography>
        </MotionBox>
      )}

      {/* Divider */}
      {index < totalMemories - 1 && (
        <Divider
          sx={{
            mt: 2,
            borderColor: "#D8D5CF",
          }}
        />
      )}
    </MotionStack>
  );
};

export default MemoryItem;
