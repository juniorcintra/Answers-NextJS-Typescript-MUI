import React from "react";

import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InsertCommentIcon from "@mui/icons-material/InsertCommentOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { Box, Typography } from "@mui/material";

export default function MainTopBar() {
  return (
    <Box className="flex flex-row items-center justify-end gap-9 px-16 py-7 shadow-custom-inset">
      <NotificationsIcon
        sx={{ color: "rgba(165, 180, 203, 1)", cursor: "pointer" }}
      />
      <InsertCommentIcon
        sx={{ color: "rgba(165, 180, 203, 1)", cursor: "pointer" }}
      />
      <Box className="flex cursor-pointer flex-row items-center">
        <SearchIcon sx={{ color: "rgba(165, 180, 203, 1)" }} />
        <Typography sx={{ color: "rgba(165, 180, 203, 1)" }}>
          Procurar
        </Typography>
      </Box>
    </Box>
  );
}
