import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Mission 30 backend is running!",
  });
});

app.post("/api/auth/login", (req, res) => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({
      message: "PIN is required",
    });
  }

  if (pin !== process.env.PIN) {
    return res.status(401).json({
      message: "Incorrect PIN",
    });
  }

  return res.json({
    message: "Login successful",
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
