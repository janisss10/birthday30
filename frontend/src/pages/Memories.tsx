import { Card, CardContent, Stack, Typography } from "@mui/material";
import { memories } from "../data/memories";

const Memories = () => {
  const sortedMemories = [...memories].sort(
    (a, b) =>
      new Date(a.memoryTime).getTime() - new Date(b.memoryTime).getTime(),
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="overline">BIRTHDAY30</Typography>

        <Typography variant="h3">Memory Lane</Typography>

        <Typography color="text.secondary">
          A collection of moments from our day.
        </Typography>
      </Stack>

      <Stack spacing={4}>
        {sortedMemories.map((memory) => (
          <Stack key={memory.id} spacing={1.5}>
            <Typography variant="caption" color="text.secondary">
              {new Date(memory.memoryTime).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </Typography>

            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      overflowX: "auto",
                    }}
                  >
                    {memory.photos.map((photo, index) => (
                      <img
                        key={`${memory.id}-${index}`}
                        src={photo}
                        alt=""
                        style={{
                          width: "100%",
                          maxWidth: "280px",
                          height: "320px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ))}
                  </Stack>

                  {memory.caption && <Typography>{memory.caption}</Typography>}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Memories;
