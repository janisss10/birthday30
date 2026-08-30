import { useState } from "react";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <Stack spacing={3}>
      <Typography variant="h3">BIRTHDAY 30</Typography>

      <Typography>A birthday adventure awaits.</Typography>

      <TextField
        label="Enter your PIN"
        type="password"
        value={pin}
        onChange={(event) => setPin(event.target.value)}
        fullWidth
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            maxLength: 6,
          },
        }}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button variant="contained" size="large" onClick={handleLogin} fullWidth>
        UNLOCK
      </Button>
    </Stack>
  );
};

export default Login;
