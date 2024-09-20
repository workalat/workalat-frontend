"use client"
import { ThemeProvider } from "@mui/material";

import HomePage from "./home/page";

import theme from "@/config/theme.js";
import { Navbar } from "@/components/navbar/navbar";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar mode="dark" />
      <HomePage />
    </ThemeProvider>
  );
}
