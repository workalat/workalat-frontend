"use client";
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
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

import cancelIcon from "@/public/icons/cancel.svg";
import arrowRight from "@/public/icons/arrow_right.svg";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ProfessionalSettingsPage = () => {
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

  const [editorValue, setEditorValue] = useState<string>('');

    const handleChange = (value: string) => {
        setEditorValue(value);
    };

  return (
    <Grid container spacing={3} className="mt-1">
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{ px: 6, py: 4 }}
          className="rounded-xl border border-dark border-opacity-30 shadow-none"
        >
          <Typography
            gutterBottom
            className="text-xl font-semibold mb-6 border-b border-dark border-opacity-30 pb-4"
          >
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
              color="primary"
              className="font-bold text-lg w-full max-w-[350px] py-2"
            >
              Save
            </Button>
          </Box>
          <FormGroup>
            <div className="flex flex-col gap-4 md:flex-row">
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom variant="body1">
                  Full Name
                </Typography>
                <TextField
                  name="Full Name"
                  value={personalInfo.firstName}
                  className="shadow-medium"
                  placeholder="Jane"
                  onChange={handlePersonalInfoChange}
                />
              </FormControl>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <FormControl fullWidth margin="normal">
                <Typography gutterBottom variant="body1">
                  Email
                </Typography>
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
                <Typography gutterBottom variant="body1">
                  Phone Number
                </Typography>
                <TextField
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  className="shadow-medium"
                  placeholder="+1 (555) 123-4567"
                  onChange={handlePersonalInfoChange}
                />
              </FormControl>
            </div>

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
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6"
            >
              Save changes
              <Image src={arrowRight} alt="Save changes" />
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{ px: 6, py: 4 }}
          className="rounded-xl border border-dark border-opacity-30 shadow-none"
        >
          <Typography
            gutterBottom
            className="text-xl font-semibold mb-4 border-b border-dark border-opacity-30 pb-4"
          >
            Business Information
          </Typography>
          <FormGroup>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Business Name
              </Typography>
              <TextField
                name="jobTitle"
                value={jobInfo.jobTitle}
                className="shadow-medium"
                placeholder="Dry Cleaner"
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Business Title
              </Typography>
              <TextField
                name="languageKnown"
                value={jobInfo.languageKnown}
                className="shadow-medium"
                placeholder="Dry Cleaner in Newport (NP20)"
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Location
              </Typography>
              <TextField
                name="skillSet"
                // value={jobInfo.skillSet}
                className="shadow-medium"
                placeholder="NP20FD Newport, United Kingdom"
                // onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Skill
              </Typography>
              <TextField
                name="skillSet"
                value={jobInfo.skillSet}
                className="shadow-medium"
                placeholder="Professional Dry Cleaner"
                onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl>
              <Box>
                <Typography variant="body1">
                  Your Bio.
                </Typography>
                <ReactQuill
                  // value={editorValue}
                  // onChange={handleChange}
                  theme="snow"
                  className="bg-white rounded-lg shadow-lg overflow-hidden border-2 h-[250px] [&_*]:!font-mono [&_*]:!text-base"
                  placeholder="Start typing here"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"], // Bold, italic, underline, strike-through
                      [{ list: "ordered" }, { list: "bullet" }], // Ordered list, bullet list
                      [{ align: [] }], // Text align
                      ["blockquote", "code-block"], // Blockquote, code block
                      ["link"], // Link insertion
                      ["clean"], // Clear formatting
                    ],
                  }}
                  formats={[
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "list",
                    "bullet",
                    "align",
                    "blockquote",
                    "code-block",
                    "link",
                  ]}
                />
              </Box>
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Services
              </Typography>
              <TextField
                name="skillSet"
                // value={jobInfo.skillSet}
                className="shadow-medium"
                placeholder="Professional Dry Cleaner"
                // onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Comapny Website
              </Typography>
              <TextField
                name="skillSet"
                // value={jobInfo.skillSet}
                className="shadow-medium"
                placeholder="https://example.com"
                // onChange={handleJobInfoChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Address
              </Typography>
              <TextField
                name="skillSet"
                // value={jobInfo.skillSet}
                className="shadow-medium"
                placeholder="123 Main St, Anytown, AN 12345"
                // onChange={handleJobInfoChange}
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
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6"
            >
              Save changes
              <Image src={arrowRight} alt="Save changes" />
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{ px: 6, py: 4 }}
          className="rounded-xl border border-dark border-opacity-30 shadow-none"
        >
          <Typography
            gutterBottom
            className="text-xl font-semibold mb-4 border-b border-dark border-opacity-30 pb-4"
          >
            Change Email
          </Typography>
          <FormGroup>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Current Email
              </Typography>
              <TextField
                className="shadow-medium"
                value={personalInfo.email}
                placeholder="current@email.com"
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                New Email
              </Typography>
              <TextField
                value={newEmail}
                className="shadow-medium"
                placeholder="new@email.com"
                onChange={handleNewEmailChange}
              />
            </FormControl>
            <FormControl fullWidth margin="normal" className="mt-4">
              <Typography gutterBottom variant="body1">
                Confirm Email
              </Typography>
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
            <Button
              variant="contained"
              color="primary"
              className="gap-2 py-3 px-6"
            >
              Save changes
              <Image src={arrowRight} alt="Save changes" />
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfessionalSettingsPage;
