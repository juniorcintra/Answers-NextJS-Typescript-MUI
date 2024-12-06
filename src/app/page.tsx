"use client";

import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import MainTopBar from "./components/mainTopBar";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className="flex h-screen flex-col">
      <MainTopBar />

      <div className="mx-auto mt-11 flex w-11/12 max-w-5xl flex-col items-start justify-start gap-11">
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
