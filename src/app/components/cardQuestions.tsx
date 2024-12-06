import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Chip } from "@mui/material";
import { Book } from "../types";

interface BasicCardProps {
  book: Book;
}

export default function BasicCard({ book }: BasicCardProps) {
  const handleGetStatus = () => {
    if (book.questions.find((question) => question.answer === "")) {
      return true;
    }
    return false;
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        borderWidth: 1,
        padding: "30px",
        gap: "15px",
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
      }}
    >
      <EditOutlinedIcon />
      <Box sx={{ gap: "5px", display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{book.title}</Typography>
        <Chip
          label={!handleGetStatus() ? "Respondido" : "Não respondido"}
          color={!handleGetStatus() ? "success" : "warning"}
          sx={{
            width: "min-content",
            backgroundColor: !handleGetStatus()
              ? "rgba(225, 245, 213, 1)"
              : "rgba(255, 248, 228, 1)",
            color: !handleGetStatus()
              ? "rgba(33, 150, 83, 1)"
              : "rgba(233, 154, 0, 1)",
          }}
        />
      </Box>
      <Typography variant="body2">{book.questions.length} questões</Typography>
      <Button
        sx={{ width: "100%", borderRadius: "36px" }}
        variant="contained"
        size="large"
        disabled={!handleGetStatus()}
      >
        Responder
      </Button>
    </Card>
  );
}
