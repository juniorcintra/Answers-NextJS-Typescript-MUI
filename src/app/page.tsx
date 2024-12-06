"use client";

import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import MainTopBar from "./components/mainTopBar";
import BasicCard from "./components/cardQuestions";
import { useGlobalStore } from "./store/slices";

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { books } = useGlobalStore();

  return (
    <Box className="flex h-screen flex-col">
      <MainTopBar />

      <Box className="mx-auto mt-11 flex w-11/12 max-w-6xl flex-col items-start justify-start gap-11">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Questões" />
          <Tab label="Respostas" />
        </Tabs>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "33px",
            flexWrap: "wrap",
          }}
        >
          {books.map((book) => {
            return <BasicCard key={book.id} book={book} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}
