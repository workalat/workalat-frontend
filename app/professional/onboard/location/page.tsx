"use client";

import ArrowForward from "@mui/icons-material/ArrowForward";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LocationPage() {
  // router
  const router = useRouter();

  // loading
  const [loading, setLoading] = useState(false);

  // form data
  const [distance, setDistance] = useState("");
  const [postCode, setPostCode] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDistance([event.target.value as string]);
  };

  // handle submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simulate form submission
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setLoading(false);

    // redirect to next page
    router.push("/professional/onboard/more");
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange2 = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const names = ["Nationwise", "Cardiff", "Newport, NP20"];

  return (
    <>
      <Box className="w-full h-full flex justify-center items-center">
        <Box className="text-center w-full max-w-5xl p-6">
          <h1 className="font-bold text-2xl lg:text-3xl">
            Where would you like to see leads from?
          </h1>
          <p className="lg:text-xl text-black text-opacity-70">
            Tell us the area you cover so we can show you leads for your
            location
          </p>
          <form
            className="p-4 py-8 md:p-8 xl:p-16 border shadow-md rounded-md bg-white w-full mt-6"
            onSubmit={handleSubmit}
          >
            <Box className="flex gap-4 items-center">
              <FormControl fullWidth>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  placeholder="Location"
                  multiple
                  value={personName}
                  onChange={handleChange2}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Services"
                      color="primary"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          color="secondary"
                          onDelete={() => {
                            setPersonName((prev) =>
                              prev.filter((name) => name !== value)
                            );
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <p className="font-semibold">from</p>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                  { label: "123456" },
                ]}
                className="[&_*]:pl-0 [&_input]:pl-3 [&_input]:text-base w-full"
                onChange={(
                  event: React.SyntheticEvent,
                  newValue?: {label: string} | null
                ) => {
                  if (newValue) {
                    setPostCode(newValue.label);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Post Code"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <PinDropIcon />
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <Box className="flex justify-between items-center mt-6">
              <p className="text-black text-opacity-60 text-left text-sm md:text-base">
                You can change your location at any time
              </p>
              <Button type="submit" variant="contained" size="large">
                Next
                <ArrowForward className="w-5 ml-2" />
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Modal open={loading}>
        <Box className="w-full h-full flex justify-center items-center">
          <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
            <img src="/images/loader.gif" alt="Loading..." className="w-60" />
            <h1 className="text-center font-bold text-xl ml-2">
              Creating account...
            </h1>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
