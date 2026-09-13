import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { memories as initialMemories } from "../data/memories";
import type { Memory } from "../types/birthday";
import { motion } from "motion/react";
import { useState } from "react";
import MemoryItem from "../components/memories/MemoryItem";
import MemoryForm from "../components/memories/MemoryForm";

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

  const openEditMemory = (memory: Memory) => {
    setEditingMemoryId(memory.id);
    setSelectedPhotos(memory.photos);
    setMemoryTime(getMemoryTime(memory.memoryTime));
    setCaption(memory.caption ?? "");
    setShowAddMemory(true);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    const newPhotoUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    );

    setSelectedPhotos((currentPhotos) => [...currentPhotos, ...newPhotoUrls]);

    event.target.value = "";
  };

  const removePhoto = (indexToRemove: number) => {
    setSelectedPhotos((currentPhotos) =>
      currentPhotos.filter((_, index) => index !== indexToRemove),
    );
  };

  const resetForm = () => {
    setSelectedPhotos([]);
    setMemoryTime("");
    setCaption("");
  };

  const closeAddMemory = () => {
    setShowAddMemory(false);
    setEditingMemoryId(null);
    resetForm();
  };

  const handleSaveMemory = () => {
    if (!memoryTime || selectedPhotos.length === 0) return;

    const today = new Date();

    const [hours, minutes] = memoryTime.split(":");

    today.setHours(Number(hours));
    today.setMinutes(Number(minutes));
    today.setSeconds(0);
    today.setMilliseconds(0);

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

    const newMemory: Memory = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      memoryTime: today.toISOString(),
      createdAt: new Date().toISOString(),
      caption: caption.trim(),
      photos: selectedPhotos,
    };

    setMemoryList((currentMemories) => [...currentMemories, newMemory]);

    closeAddMemory();
  };

  const openDeleteConfirm = (memoryId: string) => {
    setMemoryToDelete(memoryId);
  };

  const closeDeleteConfirm = () => {
    setMemoryToDelete(null);
  };

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
          <Stack spacing={5} sx={{ pt: 3 }}>
            {sortedMemories.map((memory, index) => (
              <MemoryItem
                key={memory.id}
                memory={memory}
                index={index}
                totalMemories={sortedMemories.length}
                onEdit={openEditMemory}
                onDelete={openDeleteConfirm}
              />
            ))}

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

      {/* Floating add button */}
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

      {/* Add / edit memory form */}
      <MemoryForm
        open={showAddMemory}
        editingMemoryId={editingMemoryId}
        selectedPhotos={selectedPhotos}
        memoryTime={memoryTime}
        caption={caption}
        onClose={closeAddMemory}
        onPhotoChange={handlePhotoChange}
        onRemovePhoto={removePhoto}
        onMemoryTimeChange={setMemoryTime}
        onCaptionChange={setCaption}
        onSave={handleSaveMemory}
      />

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
