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
import axios from "axios";

import { GoogleOAuthProvider } from '@react-oauth/google';
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <NextUIProvider navigate={router.push}>
      <GoogleOAuthProvider clientId="352243422391-07gkviln5jmfp9v8qscsgbu002v9os37.apps.googleusercontent.com">
      <NextThemesProvider {...themeProps}>
        <SnackbarProvider>
          <UserProvider>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </UserProvider>
        </SnackbarProvider>
      </NextThemesProvider>
      </GoogleOAuthProvider>
    </NextUIProvider>
  );
}
