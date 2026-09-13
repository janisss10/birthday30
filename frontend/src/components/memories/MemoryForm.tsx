import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "motion/react";

const MotionBox = motion.create(Box);

type MemoryFormProps = {
  open: boolean;
  editingMemoryId: string | null;
  selectedPhotos: string[];
  memoryTime: string;
  caption: string;
  onClose: () => void;
  onPhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: (index: number) => void;
  onMemoryTimeChange: (value: string) => void;
  onCaptionChange: (value: string) => void;
  onSave: () => void;
};

const MemoryForm = ({
  open,
  editingMemoryId,
  selectedPhotos,
  memoryTime,
  caption,
  onClose,
  onPhotoChange,
  onRemovePhoto,
  onMemoryTimeChange,
  onCaptionChange,
  onSave,
}: MemoryFormProps) => {
  if (!open) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 20,
        backgroundColor: "rgba(23, 23, 23, 0.35)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        pb: "56px",
        boxSizing: "border-box",
      }}
      onClick={onClose}
    >
      <MotionBox
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        onClick={(event) => event.stopPropagation()}
        sx={{
          width: "100%",
          maxWidth: 650,
          height: "65vh",
          maxHeight: "calc(100vh - 56px)",
          backgroundColor: "#F5F3EE",
          px: 3,
          pt: 1.5,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 3,
              borderRadius: 10,
              backgroundColor: "#D8D5CF",
            }}
          />
        </Box>

        {/* Close button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexShrink: 0,
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              color: "#171717",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Header */}
        <Box
          sx={{
            mb: 2,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#777",
              mb: 0.8,
            }}
          >
            {editingMemoryId ? "✦ EDIT MEMORY ✦" : "✦ NEW MEMORY ✦"}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.7rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            {editingMemoryId ? "Edit memory" : "Add a memory"}
          </Typography>
        </Box>

        {/* Scrollable form content */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            pr: 0.5,
            pb: 2,
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#D8D5CF",
              borderRadius: 10,
            },
            scrollbarWidth: "thin",
          }}
        >
          <Stack spacing={2.5}>
            {/* Photos */}
            <Box>
              <Stack spacing={1.5}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<AddPhotoAlternateOutlinedIcon />}
                  sx={{
                    minHeight: selectedPhotos.length > 0 ? 40 : 200,
                    borderColor: "#D8D5CF",
                    color: "#171717",
                    borderRadius: 0,
                    textTransform: "none",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    "&:hover": {
                      borderColor: "#171717",
                      backgroundColor: "rgba(0,0,0,0.02)",
                    },
                  }}
                >
                  {selectedPhotos.length > 0 ? "Add more photos" : "Add photos"}

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={onPhotoChange}
                  />
                </Button>

                {selectedPhotos.length > 0 && (
                  <Box
                    sx={{
                      maxHeight: 190,
                      overflowY: "auto",
                      pr: 0.5,
                      "&::-webkit-scrollbar": {
                        width: 4,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#D8D5CF",
                        borderRadius: 10,
                      },
                      scrollbarWidth: "thin",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: 1,
                      }}
                    >
                      {selectedPhotos.map((photo, index) => (
                        <Box
                          key={`${photo}-${index}`}
                          sx={{
                            position: "relative",
                            aspectRatio: "1 / 1",
                            overflow: "hidden",
                            backgroundColor: "#E8E5DE",
                          }}
                        >
                          <Box
                            component="img"
                            src={photo}
                            alt=""
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />

                          <IconButton
                            onClick={() => onRemovePhoto(index)}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 5,
                              right: 5,
                              width: 26,
                              height: 26,
                              backgroundColor: "rgba(245, 243, 238, 0.9)",
                              color: "#171717",
                              "&:hover": {
                                backgroundColor: "#F5F3EE",
                              },
                            }}
                          >
                            <CloseIcon
                              sx={{
                                fontSize: 16,
                              }}
                            />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>

            {/* Time + caption */}
            <Stack spacing={2}>
              <TextField
                label="Time"
                type="time"
                fullWidth
                value={memoryTime}
                onChange={(event) => onMemoryTimeChange(event.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />

              <TextField
                label="Caption (optional)"
                placeholder="What happened? What were we doing?"
                multiline
                minRows={2}
                maxRows={3}
                fullWidth
                value={caption}
                onChange={(event) => onCaptionChange(event.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Save button */}
        <Box
          sx={{
            flexShrink: 0,
            pt: 1,
            pb: 2,
            backgroundColor: "#F5F3EE",
          }}
        >
          <Button
            fullWidth
            variant="contained"
            disabled={!memoryTime || selectedPhotos.length === 0}
            onClick={onSave}
            sx={{
              minHeight: 48,
              borderRadius: 2,
              backgroundColor: "#171717",
              color: "#F5F3EE",
              textTransform: "none",
              fontSize: "0.9rem",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#171717",
              },
              "&.Mui-disabled": {
                backgroundColor: "#D8D5CF",
                color: "#999",
              },
            }}
          >
            {editingMemoryId ? "Save changes" : "Save memory"}
          </Button>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default MemoryForm;
