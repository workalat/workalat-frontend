"use client";

import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  Box,
  LinearProgress,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  ListItemText,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

import { siteConfig } from "@/config/site";
import { useSnackbar } from "@/context/snackbar_context";

export default function Form() {
  // router
  const router = useRouter();

  // snackbar
  const { generateSnackbar } = useSnackbar();

  // form data
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    website: "",
    bio: "",
    companySize: "",
    skills: [] as string[],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (event: SelectChangeEvent<string[]>) => {
    const selectedSkills = event.target.value as string[];

    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: selectedSkills,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // form validation
    if (!formData.name) {
      return generateSnackbar("Name is required", "error");
    }
    if (!formData.companyName) {
      return generateSnackbar("Company name is required", "error");
    }
    if (!formData.bio) {
      return generateSnackbar("Bio is required", "error");
    }
    if (!formData.companySize) {
      return generateSnackbar("Company size is required", "error");
    }
    if (formData.skills.length === 0) {
      return generateSnackbar("Skills are required", "error");
    }
    
    generateSnackbar("Form submitted successfully", "success");

    return router.push("/professional/onboard/location");
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 850, margin: "auto", mb: 1 }}>
      <Box
        component={"form"}
        sx={{ color: "white", p: 4, borderRadius: 2 }}
        className="bg-main"
        onSubmit={handleSubmit}
      >
        <Typography
          gutterBottom
          className="text-2xl text-center font-semibold pt-4"
        >
          Some details about you.
        </Typography>
        <Typography gutterBottom className="text-center font-light pt-3 pb-3">
          You&apos;re just a few steps away from viewing our Dry Cleaning &
          Laundry Service.
        </Typography>
        <LinearProgress
          variant="determinate"
          value={40}
          sx={{
            my: 2,
            bgcolor: "rgba(255,255,255)",
            "& .MuiLinearProgress-bar": { bgcolor: "#FFBE00" },
            borderRadius: "100px",
          }}
        />
        <TextField
          fullWidth
          required
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          margin="normal"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&:hover fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
          }}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          required
          label="Company name"
          name="companyName"
          value={formData.companyName}
          margin="normal"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&:hover fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
          }}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label="Company website"
          name="website"
          value={formData.website}
          margin="normal"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
              "&:hover fieldset": { borderColor: "white" },
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
          }}
          onChange={handleInputChange}
        />
        <div className="flex flex-col">
          <FormControl required component="fieldset" margin="normal">
            <FormLabel
              component="legend"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Company size, employees:
            </FormLabel>
            <ToggleButtonGroup
              exclusive
              value={formData.companySize}
              sx={{ mt: 2 }}
              onChange={(event, value) =>
                setFormData({ ...formData, companySize: value })
              }
            >
              <ToggleButton
                value="2-10"
                sx={{
                  bgcolor:
                    formData.companySize === "2-10" ? "#FFBE00" : "#FFBE00", // Default background color is yellow
                  color: "black",
                  "&:hover": {
                    bgcolor: "#FFA000",
                  },
                  "&.Mui-selected": {
                    bgcolor: "secondary",
                    color: "white",
                    border: "2px solid white",
                  },
                }}
                className="mr-4 px-6"
              >
                2-10
              </ToggleButton>
              <ToggleButton
                value="11-50"
                sx={{
                  bgcolor:
                    formData.companySize === "11-50" ? "#FFBE00" : "#FFBE00", // Default background color is yellow
                  color: "black",
                  "&:hover": {
                    bgcolor: "#FFA000",
                  },
                  "&.Mui-selected": {
                    bgcolor: "secondary",
                    color: "white",
                    border: "2px solid white",
                  },
                }}
                className="mr-4 px-6"
              >
                11-50
              </ToggleButton>
              <ToggleButton
                value="51-200"
                sx={{
                  bgcolor:
                    formData.companySize === "51-200" ? "#FFBE00" : "#FFBE00", // Default background color is yellow
                  color: "black",
                  "&:hover": {
                    bgcolor: "#FFA000",
                  },
                  "&.Mui-selected": {
                    bgcolor: "secondary",
                    color: "white",
                    border: "2px solid white",
                  },
                }}
                className="mr-4 px-6"
              >
                51-200
              </ToggleButton>
              <ToggleButton
                value="200+"
                sx={{
                  bgcolor:
                    formData.companySize === "200+" ? "#FFBE00" : "#FFBE00", // Default background color is yellow
                  color: "black",
                  "&:hover": {
                    bgcolor: "#FFA000",
                  },
                  "&.Mui-selected": {
                    bgcolor: "secondary",
                    color: "white",
                    border: "2px solid white",
                  },
                }}
                className="mr-4 px-6"
              >
                200+
              </ToggleButton>
              <ToggleButton
                value="self-employed"
                sx={{
                  bgcolor:
                    formData.companySize === "self-employed"
                      ? "#FFBE00"
                      : "#FFBE00", // Default background color is yellow
                  color: "black",
                  "&:hover": {
                    bgcolor: "#FFA000",
                  },
                  "&.Mui-selected": {
                    bgcolor: "secondary",
                    color: "white",
                    border: "2px solid white",
                  },
                }}
                className="mr-4 px-4"
              >
                Self-employed
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
        </div>
        <Box>
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label="Your bio"
            name="bio"
            value={formData.bio}
            margin="normal"
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                "&:hover fieldset": { borderColor: "white" },
              },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
            }}
            onChange={handleInputChange}
          />
          <FormControl fullWidth required>
            <FormLabel
              component="legend"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              Skills
            </FormLabel>
            <Select
              multiple
              value={formData.skills}
              sx={{
                width: "100%",
                "& .MuiSvgIcon-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.50)",
                },
                "& .MuiSelect-select": {
                  backgroundColor: "transparent",
                  color: "white",
                },
                "& .MuiSelect-popper": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                },
              }}
              renderValue={(selected) => selected.join(", ")}
              onChange={handleSkillChange}
            >
              {siteConfig.skillOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox
                    checked={formData.skills.indexOf(option.value) > -1}
                  />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography
          variant="caption"
          sx={{ mt: 5, display: "block", textAlign: "center", color: "gray" }}
        >
          By continuing, you confirm your agreement to our {""}
          <Link
            href="/terms-and-conditions"
            className="font-semibold underline hover:text-secondary"
          >
            Terms & Conditions
          </Link>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#FFBE00",
              color: "black",
              "&:hover": { bgcolor: "#FFA000" },
            }}
            className="px-6 py-3"
            type="submit"
          >
            Continue <ArrowForward className="w-5 -mt-0.5 ml-2" />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
