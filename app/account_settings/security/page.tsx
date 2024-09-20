"use client";
import { useState } from "react";
import Image from "next/image";
import { Box, Button, Grid, Switch, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import ChangePasswordModal from "./change_password";

import arrowRight from "@/public/icons/arrow_right.svg";

const SecuritySettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <ChangePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 h-full bg-white md:bg-transparent">
            <Typography
              gutterBottom  
              className="text-xl font-semibold border-b border-dark border-opacity-30 pb-2"
            >
              Password
            </Typography>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Box className="flex justify-between items-center border-b border-dark border-opacity-30 pb-2">
              <Typography gutterBottom className="text-xl font-semibold">
                Two Factor Authentication
              </Typography>
              <Switch />
            </Box>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
            >
              Enable
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Typography
              gutterBottom
              className="text-xl font-semibold border-b border-dark border-opacity-30 pb-2"
            >
              Phone Verification
            </Typography>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
              onClick={() => router.push("security/phone")}
            >
              Verify
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="rounded-xl border border-dark border-opacity-30 px-6 py-4 pb-6 space-y-4 bg-white md:bg-transparent">
            <Typography
              gutterBottom
              className="text-xl font-semibold border-b border-dark border-opacity-30 pb-2"
            >
              KYC
            </Typography>
            <Typography>Last Changed 20 Jan 2024, 09:00 AM</Typography>
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6 font-semibold"
            >
              Enable
              <Image alt="Change password" src={arrowRight} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SecuritySettings;
