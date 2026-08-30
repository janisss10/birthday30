import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import type { Mission } from "../types/birthday";
import { getMissions, unlockMission } from "../services/missions";

const MissionDetails = () => {
  const { missionId } = useParams();
  const navigate = useNavigate();

  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadMission = async () => {
      try {
        const missions = await getMissions();

        const foundMission = missions.find((item) => item.id === missionId);

        if (!foundMission) {
          setError("Mission not found.");
          return;
        }

        setMission(foundMission);
      } catch {
        setError("Unable to load mission.");
      } finally {
        setLoading(false);
      }
    };

    loadMission();
  }, [missionId]);

  const handleUnlock = async () => {
    if (!missionId || !code.trim()) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await unlockMission(missionId, code.trim());

      setSuccess("Mission completed! 🎉");
      setCode("");
      setShowCodeInput(false);

      const missions = await getMissions();

      const updatedMission = missions.find((item) => item.id === missionId);

      if (updatedMission) {
        setMission(updatedMission);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to complete mission.",
      );
    }
  };

  if (loading) {
    return (
      <Stack>
        <Typography color="text.secondary">Loading mission...</Typography>
      </Stack>
    );
  }

  if (!mission) {
    return (
      <Stack>
        <Typography color="error">{error || "Mission not found."}</Typography>

        <Button
          onClick={() => navigate("/missions")}
          sx={{ alignSelf: "flex-start" }}
        >
          Back to Missions
        </Button>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="overline">
          MISSION {String(mission.number).padStart(2, "0")}
        </Typography>

        <Typography variant="h3">{mission.title}</Typography>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Typography>{mission.description}</Typography>

            {mission.status === "completed" ? (
              <Typography color="success.main">✓ Mission completed</Typography>
            ) : (
              <>
                {!showCodeInput && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setShowCodeInput(true)}
                  >
                    I've completed this mission
                  </Button>
                )}

                {showCodeInput && (
                  <Stack spacing={2}>
                    <Typography>Enter your mission code</Typography>

                    <TextField
                      label="Mission code"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      fullWidth
                    />

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleUnlock}
                      disabled={!code.trim()}
                    >
                      Unlock Mission
                    </Button>
                  </Stack>
                )}
              </>
            )}

            {success && <Typography color="success.main">{success}</Typography>}

            {error && <Typography color="error">{error}</Typography>}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default MissionDetails;
