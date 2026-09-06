import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { memories as initialMemories } from "../data/memories";
import type { Memory } from "../types/birthday";
import { motion } from "motion/react";
import { useState } from "react";

const MotionStack = motion.create(Stack);
const MotionBox = motion.create(Box);

const Memories = () => {
  const [showAddMemory, setShowAddMemory] = useState(false);

  // Memories displayed on the page
  const [memoryList, setMemoryList] = useState<Memory[]>(initialMemories);

  // New memory form
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [memoryTime, setMemoryTime] = useState("");
  const [caption, setCaption] = useState("");

  // Editing memory
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);

  // Delete confirmation
  const [memoryToDelete, setMemoryToDelete] = useState<string | null>(null);

  const sortedMemories = [...memoryList].sort(
    (a, b) =>
      new Date(a.memoryTime).getTime() - new Date(b.memoryTime).getTime(),
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getCurrentTime = () => {
    const now = new Date();

    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;
  };

  const getMemoryTime = (memoryTime: string) => {
    const date = new Date(memoryTime);

    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}`;
  };

  const openAddMemory = () => {
    setEditingMemoryId(null);
    setMemoryTime(getCurrentTime());
    setShowAddMemory(true);
  };

  // Open existing memory for editing
  const openEditMemory = (memory: Memory) => {
    setEditingMemoryId(memory.id);
    setSelectedPhotos(memory.photos);
    setMemoryTime(getMemoryTime(memory.memoryTime));
    setCaption(memory.caption ?? "");
    setShowAddMemory(true);
  };

  // Handle photo selection
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const newPhotoUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setSelectedPhotos((currentPhotos) => [...currentPhotos, ...newPhotoUrls]);

    // Allows selecting the same file again later
    event.target.value = "";
  };

  // Remove one selected photo
  const removePhoto = (indexToRemove: number) => {
    setSelectedPhotos((currentPhotos) =>
      currentPhotos.filter((_, index) => index !== indexToRemove),
    );
  };

  // Reset the form
  const resetForm = () => {
    setSelectedPhotos([]);
    setMemoryTime("");
    setCaption("");
  };

  // Close panel
  const closeAddMemory = () => {
    setShowAddMemory(false);
    setEditingMemoryId(null);
    resetForm();
  };

  // Save memory
  const handleSaveMemory = () => {
    if (!memoryTime || selectedPhotos.length === 0) return;

    const today = new Date();

    const [hours, minutes] = memoryTime.split(":");

    today.setHours(Number(hours));
    today.setMinutes(Number(minutes));
    today.setSeconds(0);
    today.setMilliseconds(0);

    // Editing existing memory
    if (editingMemoryId) {
      setMemoryList((currentMemories) =>
        currentMemories.map((memory) =>
          memory.id === editingMemoryId
            ? {
                ...memory,
                memoryTime: today.toISOString(),
                caption: caption.trim(),
                photos: selectedPhotos,
              }
            : memory,
        ),
      );

      closeAddMemory();
      return;
    }

    // Creating new memory
    const newMemory: Memory = {
      id: crypto.randomUUID(),
      memoryTime: today.toISOString(),
      createdAt: new Date().toISOString(),
      caption: caption.trim(),
      photos: selectedPhotos,
    };

    setMemoryList((currentMemories) => [...currentMemories, newMemory]);

    closeAddMemory();
  };

  // Open delete confirmation
  const openDeleteConfirm = (memoryId: string) => {
    setMemoryToDelete(memoryId);
  };

  // Close delete confirmation
  const closeDeleteConfirm = () => {
    setMemoryToDelete(null);
  };

  // Delete memory
  const handleDeleteMemory = () => {
    if (!memoryToDelete) return;

    setMemoryList((currentMemories) =>
      currentMemories.filter((memory) => memory.id !== memoryToDelete),
    );

    setMemoryToDelete(null);
  };

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
      <Box
        sx={{
          width: "100%",
          maxWidth: 650,
        }}
      >
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

        {/* Empty state */}
        {sortedMemories.length === 0 ? (
          <MotionStack
            spacing={2}
            sx={{
              alignItems: "center",
              textAlign: "center",
              py: 8,
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.7,
              ease: "easeOut",
            }}
          >
            {/* Recording indicator */}
            <Stack
              direction="row"
              spacing={0.8}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                mb: 0.5,
              }}
            >
              <Box
                component={motion.div}
                animate={{
                  opacity: [1, 0.25, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#171717",
                }}
              />

              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#777",
                  transform: "translateY(1px)",
                }}
              >
                REC
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              This page is waiting for you.
            </Typography>

            <Typography
              sx={{
                maxWidth: 300,
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "#777",
              }}
            >
              Right now, there's nothing here. <br />
              That's about to change.
            </Typography>

            <Button
              onClick={openAddMemory}
              startIcon={<AddPhotoAlternateOutlinedIcon />}
              variant="outlined"
              sx={{
                mt: 1,
                borderColor: "#171717",
                color: "#171717",
                borderRadius: 2,
                px: 2.5,
                py: 1.2,
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: 700,
                "&:hover": {
                  borderColor: "#171717",
                  backgroundColor: "rgba(23, 23, 23, 0.04)",
                },
              }}
            >
              Add your first memory
            </Button>
          </MotionStack>
        ) : (
          /* Memory timeline */
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

                    {/* Edit / Delete */}
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      <IconButton
                        onClick={() => openEditMemory(memory)}
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
                        onClick={() => openDeleteConfirm(memory.id)}
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

                  {/* Photo gallery */}
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

            {/* Back to top */}
            <MotionStack
              spacing={1}
              sx={{
                alignItems: "center",
                textAlign: "center",
                pt: 4,
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8 + sortedMemories.length * 0.12,
                duration: 0.7,
              }}
            >
              <Divider
                sx={{
                  width: "100%",
                  borderColor: "#D8D5CF",
                  mb: 3,
                }}
              />

              <Button
                onClick={scrollToTop}
                sx={{
                  mt: 1,
                  minWidth: 0,
                  px: 0,
                  color: "#777",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#171717",
                  },
                }}
              >
                ↑ back to top
              </Button>
            </MotionStack>
          </Stack>
        )}

        <Box sx={{ height: 30 }} />
      </Box>

      {/* Floating Add Memory button */}
      <Button
        onClick={openAddMemory}
        startIcon={<AddPhotoAlternateOutlinedIcon />}
        sx={{
          position: "fixed",
          bottom: 76,
          right: 20,
          zIndex: 10,

          backgroundColor: "#171717",
          color: "#F5F3EE",

          borderRadius: 2,
          px: 2,
          py: 1.2,

          textTransform: "none",
          fontSize: "0.8rem",
          fontWeight: 700,

          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.12)",

          "&:hover": {
            backgroundColor: "#171717",
          },
        }}
      >
        Add memory
      </Button>

      {/* Add / Edit Memory panel */}
      {showAddMemory && (
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
          onClick={closeAddMemory}
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
              minHeight: "65vh",
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
            {/* Bottom sheet handle */}
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
                onClick={closeAddMemory}
                sx={{
                  color: "#171717",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Panel header */}
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

            {/* Photo Area */}
            <Box
              sx={{
                flexShrink: 0,
              }}
            >
              <Stack spacing={1.5}>
                {/* Photo picker */}
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
                    onChange={handlePhotoChange}
                  />
                </Button>

                {/* Photo previews - Independent Scroll */}
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
                            onClick={() => removePhoto(index)}
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

            {/* Details Area */}
            <Box
              sx={{
                flex: "1 1 0",
                minHeight: 0,

                mt: 2,
                pr: 0.5,
              }}
            >
              <Stack spacing={2}>
                {/* Time */}
                <TextField
                  label="Time"
                  type="time"
                  fullWidth
                  value={memoryTime}
                  onChange={(event) => setMemoryTime(event.target.value)}
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

                {/* Caption */}
                <TextField
                  label="Caption (optional)"
                  placeholder="What happened? What were we doing?"
                  multiline
                  minRows={2}
                  maxRows={3}
                  fullWidth
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 0,
                      backgroundColor: "#FFFFFF",
                    },
                  }}
                />
              </Stack>
            </Box>

            {/* Save */}
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
                onClick={handleSaveMemory}
                sx={{
                  minHeight: 48,

                  borderRadius: 0,

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
      )}

      {/* Delete confirmation */}
      <Dialog
        open={memoryToDelete !== null}
        onClose={closeDeleteConfirm}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#F5F3EE",
          },
        }}
      >
        <DialogTitle>Delete memory?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this memory? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={closeDeleteConfirm}
            sx={{
              color: "#777",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteMemory}
            sx={{
              color: "#171717",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Memories;
