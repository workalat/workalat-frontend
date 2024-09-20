"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@mui/material";
import { ThemeProviderProps } from "next-themes/dist/types";

import theme from "@/config/theme";
import { SnackbarProvider } from "@/context/snackbar_context";
import { UserProvider } from "@/context/user_context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <SnackbarProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </UserProvider>
        </SnackbarProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
