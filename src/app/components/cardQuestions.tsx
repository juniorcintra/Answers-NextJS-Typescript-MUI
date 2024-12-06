import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Chip } from "@mui/material";

export default function BasicCard() {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        borderWidth: 1,
        padding: "30px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <EditOutlinedIcon />
      <Box>
        <Typography variant="h6">Título do caderno de questões 1</Typography>
        <Chip label="Respondido" />
      </Box>
      <Typography variant="body2">10 questões</Typography>
      <Button
        sx={{ width: "100%", borderRadius: "36px" }}
        variant="contained"
        size="large"
        disabled={true}
      >
        Responder
      </Button>
    </Card>
  );
}
