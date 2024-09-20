"use client"
import { useState } from "react";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Paper,
  Box,
  FormControl,
  FormGroup,
  Grid,
} from "@mui/material";
import Image from "next/image";

import cancelIcon from "@/public/icons/cancel.svg";
import arrowRight from "@/public/icons/arrow_right.svg";

const SettingsPage = () => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });
  const [jobInfo, setJobInfo] = useState({
    jobTitle: "",
    languageKnown: "",
    skillSet: "",
    aboutYou: "",
    whyWorkWithMe: "",
  });
  const [newEmail, setNewEmail] = useState("");

  const handlePersonalInfoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleJobInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobInfo({ ...jobInfo, [event.target.name]: event.target.value });
  };

  const handleNewEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  return (
    <Grid container spacing={3} className="mt-1">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ px: 6, py: 4, height: "100%" }} className="rounded-xl border border-dark border-opacity-30 shadow-none">
          <Typography gutterBottom className="text-xl font-semibold mb-6 border-b border-dark border-opacity-30 pb-4">
            Personal Information
          </Typography>
          <Box mb={3} className="flex flex-col gap-2">
            <Box className="flex items-center gap-4 mb-1">
              <Avatar
                alt="Profile Picture"
                src="/images/profile.png"
                sx={{ width: 100, height: 100 }}
              />
              <p className="max-w-xs font-semibold">
                Max file size is 5MB, Minimum dimension: 150x150 And Suitable
                files are .jpg & .png
              </p>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              className="font-bold text-lg w-full max-w-[350px] py-2"
            >
              Upload Photo
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="!bg-main !bg-opacity-40 text-main font-bold text-lg w-full max-w-[350px] py-2"
            >
              Take Photo
            </Button>
          </Box>
          <FormGroup>
            <div className="flex flex-col gap-4 md:flex-row">
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom variant="body1">First Name</Typography>
                <TextField
                  name="firstName"
                  value={personalInfo.firstName}
                  className="shadow-medium"
                  placeholder="Jane"
                  onChange={handlePersonalInfoChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom variant="body1">Last Name</Typography>
                <TextField
                  name="lastName"
                  className="shadow-medium"
                  value={personalInfo.lastName}
                  placeholder="Doe"
                  onChange={handlePersonalInfoChange}
                />
              </FormControl>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom variant="body1">Email</Typography>
                <TextField
                  name="email"
                  type="email"
                  value={personalInfo.email}
                  className="shadow-medium"
                  placeholder="jane.doe@example.com"
                  onChange={handlePersonalInfoChange}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom variant="body1">Phone Number</Typography>
                <TextField
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  className="shadow-medium"
                  placeholder="+1 (555) 123-4567"
                  onChange={handlePersonalInfoChange}
                />
              </FormControl>
            </div>
           
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">Date of Birth</Typography>
              <TextField
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={personalInfo.dateOfBirth}
                className="shadow-medium"
                onChange={handlePersonalInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">Address</Typography>
              <TextField
                name="address"
                value={personalInfo.address}
                className="shadow-medium"
                placeholder="123 Main St, Anytown, AN 12345"
                onChange={handlePersonalInfoChange}
              />
            </FormControl>
          </FormGroup>
          <Box mt={2} className="flex gap-2">
            <Button
              variant="contained"
              color="secondary"
              className="gap-2 py-3 px-6"
            >
              Cancel
              <Image src={cancelIcon} alt="Cancel" />
            </Button>
            <Button variant="contained" color="primary" className="gap-2 py-3 px-6">
              Save changes
              <Image src={arrowRight} alt="Save changes" />
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ px: 6, py: 4 }} className="rounded-xl border border-dark border-opacity-30 shadow-none">
          <Typography gutterBottom className="text-xl font-semibold mb-4 border-b border-dark border-opacity-30 pb-4">
            Change Email
          </Typography>
          <FormGroup>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1" >Current Email</Typography>
              <TextField
                className="shadow-medium"
                value={personalInfo.email}
                placeholder="current@email.com"
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1" >New Email</Typography>
              <TextField
                value={newEmail}
                className="shadow-medium"
                placeholder="new@email.com"
                onChange={handleNewEmailChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1" >Confirm Email</Typography>
              <TextField
                className="shadow-medium"
                placeholder="new@email.com"
              />
            </FormControl>
          </FormGroup>
          <Box mt={2} className="flex gap-2">
            <Button
              variant="contained"
              color="secondary"
              className="gap-2 py-3 px-6"
            >
              Cancel
              <Image src={cancelIcon} alt="Cancel" />
            </Button>
            <Button variant="contained" color="primary" className="gap-2 py-3 px-6">
              Save changes
              <Image src={arrowRight} alt="Save changes" />
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ px: 6, py: 4 }} className="rounded-xl border border-dark border-opacity-30 shadow-none">
          <Typography gutterBottom className="text-xl font-semibold mb-4 border-b border-dark border-opacity-30 pb-4">
            Professional Information
          </Typography>
          <FormGroup>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">Job Title</Typography>
              <TextField
                name="jobTitle"
                value={jobInfo.jobTitle}
                className="shadow-medium"
                placeholder="Software Developer"
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">Languages Known</Typography>
              <TextField
                name="languageKnown"
                value={jobInfo.languageKnown}
                className="shadow-medium"
                placeholder="English, Spanish, French"
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1" >Skill Set</Typography>
              <TextField
                name="skillSet"
                value={jobInfo.skillSet}
                className="shadow-medium"
                placeholder="React, Node.js, Python"
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">About You</Typography>
              <TextField
                multiline
                name="aboutYou"
                rows={4}
                value={jobInfo.aboutYou}
                className="shadow-medium"
                placeholder="Brief description about yourself..."
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">Why Work with Me</Typography>
              <TextField
                multiline
                name="whyWorkWithMe"
                rows={4}
                value={jobInfo.whyWorkWithMe}
                className="shadow-medium"
                placeholder="Explain why someone should work with you..."
                onChange={handleJobInfoChange}
              />
            </FormControl>
          </FormGroup>
          <Box mt={2} className="flex gap-2">
            <Button
              variant="contained"
              color="secondary"
              className="gap-2 py-3 px-6"
            >
              Cancel
              <Image src={cancelIcon} alt="Cancel" />
            </Button>
            <Button variant="contained" color="primary" className="gap-2 py-3 px-6">
              Save changes
              <Image src={arrowRight} alt="Save changes" />
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
