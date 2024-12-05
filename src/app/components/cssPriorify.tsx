"use client";

import * as React from "react";
import { StyledEngineProvider } from "@mui/material/styles";

export default function GlobalCssPriority({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
