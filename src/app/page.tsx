"use client";

import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import InsertCommentIcon from "@mui/icons-material/InsertCommentOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="flex flex-col h-screen ">
      <div className=" py-7 px-16 flex flex-row items-center justify-end gap-9 shadow-custom-inset">
        <NotificationsIcon sx={{ color: "rgba(165, 180, 203, 1)" }} />
        <InsertCommentIcon sx={{ color: "rgba(165, 180, 203, 1)" }} />
        <div className="flex flex-row items-center cursor-pointer">
          <SearchIcon sx={{ color: "rgba(165, 180, 203, 1)" }} />
          <Typography sx={{ color: "rgba(165, 180, 203, 1)" }}>
            Procurar
          </Typography>
        </div>
      </div>

      <div className="flex flex-col items-start justify-start mt-11 w-11/12 max-w-5xl mx-auto gap-11">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Questões" />
            <Tab label="Respostas" />
          </Tabs>
        </Box>
      </div>
    </main>
  );
}
