"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import theme from "@/config/theme.js";
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";

const AccountSettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    const userRoute = path && path.split('/')[1]; // 'client' or 'professional'

    // Based on userRoute, set your tabs
    if (userRoute === 'client' || userRoute === 'professional') {
      switch (path.replace(`/${userRoute}`, '')) {
        case "/account_settings/":
        case "/account_settings":
          setTabValue(0);
          break;
        case "/account_settings/security":
        case "/account_settings/security/phone":
          setTabValue(1);
          break;
        case "/account_settings/preferences":
          setTabValue(2);
          break;
        case "/account_settings/notifications":
          setTabValue(3);
          break;
        default:
          setTabValue(0);
          break;
      }
    }
  }, [router]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const path = window.location.pathname;
    const userRoute = path && path.split('/')[1]; // 'client' or 'professional'

    if (userRoute === 'client' || userRoute === 'professional') {
      setTabValue(newValue);
      switch (newValue) {
        case 0:
          // Profile
          router.push(`/${userRoute}/account_settings/`);
          break;
        case 1:
          // Security
          router.push(`/${userRoute}/account_settings/security`);
          break;
        case 2:
          // Preferences
          router.push(`/${userRoute}/account_settings/preferences`);
          break;
        case 3:
          // Notifications
          router.push(`/${userRoute}/account_settings/notifications`);
          break;
        default:
          break;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section className="w-full bg-[url('/images/bg_pattern_5.svg')] bg-left-top bg-no-repeat py-6 pt-10 mb-6 flex flex-col justify-center items-center">
        <Container maxWidth="lg">
          <Box className="relative flex justify-center items-center w-full border-b border-dark border-opacity-30">
            <Link
              href="/dashboard"
              className="flex gap-2 absolute left-0 font-bold"
            >
              <Image
                src={arrowRightSm}
                alt="Back to dashboard"
                className="rotate-180"
              />
              <span>
                Back <span className="hidden md:inline-flex">to dashboard</span>
              </span>
            </Link>
            <Typography gutterBottom className="text-3xl font-bold text-center">
              Settings
            </Typography>
          </Box>
          <Tabs
            variant="scrollable"
            value={tabValue}
            aria-label="settings tabs"
            className="mt-4 font-bold [&_*]:text-black"
            onChange={handleTabChange}
          >
            <Tab label="Profile" />
            <Tab label="Security" />
            <Tab label="Preferences" />
            {/* <Tab label="Plan & Billing" /> */}
            <Tab label="Notifications" />
            {/* <Tab label="Integrations" /> */}
          </Tabs>
          {children}
        </Container>
      </section>
    </ThemeProvider>
  );
};

export default AccountSettingsLayout;
