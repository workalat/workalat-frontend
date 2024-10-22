"use client";
import { useEffect, useState } from "react";
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
  MenuItem,
  Chip,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Modal,
  Autocomplete,
} from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import cancelIcon from "@/public/icons/cancel.svg";
import arrowRight from "@/public/icons/arrow_right.svg";
import { siteConfig } from "@/config/site";
import { useSnackbar } from "@/context/snackbar_context";
import axios from "axios";
import { useRouter } from "next/navigation";
import VerifyEmail from "./verify-email/page";
import postcodesData from "@/postcodes.json";
import regionsData from "@/postcode_region.json";
import { useUserContext } from "@/context/user_context";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ProfessionalSettingsPage = ({ data1, data2 }) => {
  const { findAllServices,addProfessionalDetailsP2 , addProfessionalDetailsP1} = useUserContext();
  const [personalInfo, setPersonalInfo,] = useState({
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
  let [userId, setUserId] = useState("");

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

  const [editorValue, setEditorValue] = useState<string>("");

  const handleChange = (value: string) => {
    setEditorValue(value);
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
    console.log(personName);
  };

  const names = [
    " Dry Cleaning",
    "Commercial & Office Cleaning",
    "Pressure Washing",
    "End of Tenancy Cleaning",
    "Gutter Cleaning",
    "Carpet Cleaning",
    "Car Cleaning & Valet",
    "Office Cleaning",
    "Oven Cleaning",
    "Roof Cleaning",
  ];

  let [file, setFile] = useState({});

  // loading
  const [loading2, setLoading2] = useState(true);

  // loading
  const [loading, setLoading] = useState(false);

  // loading
  const [openVerifyModel, setOpenVerifyModel] = useState(false);

  //Router
  let router = useRouter();

  let [form1, setForm1] = useState({
    professionalFullName: "",
    professionalEmail: "",
    professionalPhoneNo: "",
    professionalPictureLink: "",
  });

  let [form2, setForm2] = useState({
    oldEmail: "",
    newEmail: "",
    confirmEmail: "",
  });

  let [form3, setForm3] = useState({
    professionalCompanyName: "",
    professionalCompanyTitle: "",
    professionalServiceLocPostCodes: [],
    professionalPrimaryService: "",
    professionalBio: "",
    professionalSkills: [],
    professionalCompanywebsite: "",
    professionalAddress: "",
  });

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [primaryService, setPrimaryService] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  let [avatar, setAvatar] = useState("");
  const { generateSnackbar } = useSnackbar();
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(data2);
        setLoading2(true);

        const servicesData = await findAllServices();
        console.log(servicesData);
        setServices(servicesData.data);
        setSelectedServices(data2.professionalSkills || []);
        setPrimaryService(data2.professionalPrimaryService || "");
        // Set initial locations
        setLocations(postcodesData);
        setSelectedLocations(data2.professionalServiceLocPostCodes || []);

        setForm1({
          ...form1,
          ["professionalFullName"]: data1.professionalFullName,
          ["professionalEmail"]: data1.professionalEmail,
          ["professionalPhoneNo"]: data1.professionalPhoneNo,
          ["professionalPictureLink"]: data1.professionalPictureLink,
        });
        setAvatar(data1.professionalPictureLink);
        setUserId(data1._id);
        setForm2({
          ...form2,
          ["oldEmail"]: data1.professionalEmail,
        });
        setForm3({
          ...form3,
          ["professionalCompanyName"]: data2.professionalCompanyName,
          ["professionalCompanyTitle"]: data2.professionalCompanyTitle,
          ["professionalServiceLocPostCodes"]:
            data2.professionalServiceLocPostCodes,
          ["professionalPrimaryService"]: data2.professionalPrimaryService,
          ["professionalBio"]: data2.professionalBio,
          ["professionalSkills"]: data2.professionalSkills,
          ["professionalCompanywebsite"]: data2.professionalCompanywebsite,
          ["professionalAddress"]: data2.professionalAddress,
        });

        setLoading2(false);
      } catch (e) {}
    }
    fetchData();
  }, [data1, data2]);

  // Modified handlers for Autocomplete components
  const handleServiceChange = (event, newValue) => {
    const serviceValues = newValue.map((item) => item.value);
    setSelectedServices(serviceValues);
    setForm3((prev) => ({
      ...prev,
      professionalSkills: serviceValues,
    }));
  };

  const handlePrimaryServiceChange = (event, newValue) => {
    const serviceValue = newValue?.value || "";
    setPrimaryService(serviceValue);
    setForm3((prev) => ({
      ...prev,
      professionalPrimaryService: serviceValue,
    }));
  };

  const handleLocationChange = (event, newValue) => {
    const locationValues = newValue.map((item) => item.value);
    setSelectedLocations(locationValues);
    setForm3((prev) => ({
      ...prev,
      professionalServiceLocPostCodes: locationValues,
    }));
  };

  // Helper function to format postcodes with regions
  const formatPostcodeOptions = () => {
    return locations.map((postcode) => ({
      label: `${postcode} ${regionsData[postcode] ? `(${regionsData[postcode]})` : ""}`,
      value: postcode,
    }));
  };

  // Helper function to format service options
  const formatServiceOptions = () => {
    return services.map((service) => ({
      label: toCamelCase(service),
      value: service,
    }));
  };

  const toCamelCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  function handleChangeForm1(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm1({
      ...form1,
      [name]: value,
    });
  }

  function handleChangeForm2(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm2({
      ...form2,
      [name]: value,
    });
  }

  function handleChangeForm3(e) {
    let name = e.target.name;
    let value = e.target.value;
    setForm3({
      ...form3,
      [name]: value,
    });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleChangeImage(e) {
    e.preventDefault();
    try {
      console.log(file);
      if (!file) {
        generateSnackbar("Please Select a File First", "warning");
        return;
      } else {
        setLoading(true);
        const formDat = new FormData();
        formDat.append("profilePic", file);
        formDat.append("userId", userId);
        formDat.append("userType", "professional");

        const res = await axios.post("/changePicture", formDat, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status !== 400 || res.data?.status === "success") {
          generateSnackbar("Profile Picture Updated Successfully", "success");
          setAvatar(res.data?.picture);
          setLoading(false);
        } else {
          generateSnackbar(
            res.response?.data?.message ||
              "Some Error occurs, please try again in a few minutes",
            "error"
          );
        }
      }
    } catch (e) {
      generateSnackbar(
        "Some Error occurs, please try again in a few minutes",
        "error"
      );
    }
  }


  
  async function handleSubmitForm2(e) {
    e.preventDefault();
    try {
      let add = await addProfessionalDetailsP1({
        userId : userId,
        name : form1.professionalFullName
      })
      console.log(add)
      if(add?.status !== 400 || add?.data?.status === 'success'){
        generateSnackbar("Data Added Successfully", "success");
      }
      else{
        generateSnackbar(
          "Some Error occurs, please try again in a few minutes",
          "error"
        );
      }
    } catch (e) {
      generateSnackbar(
        "Some Error occurs, please try again in a few minutes",
        "error"
      );
    }
  }

  function handleChangeEmail(e) {
    e.preventDefault();
    if (form2.newEmail !== form2.confirmEmail) {
      generateSnackbar("Email Don't match.", "error");
    } else {
      setOpenVerifyModel(true);
    }
  }

  async function handleSubmitForm3(e) {
    e.preventDefault();
    try {
      console.log(form3);
      let add = await addProfessionalDetailsP2({
        userId : userId,
        companyName : form3.professionalCompanyName,
      companyTitle : form3.professionalCompanyTitle,
      postalCode : form3.professionalServiceLocPostCodes,
      primaryService : form3.professionalPrimaryService,
      services : form3.professionalSkills,
      bio : form3.professionalBio,
      companyWebsite : form3.professionalCompanywebsite,
      address : form3.professionalAddress
      })
      console.log(add)
      if(add?.status !== 400 || add?.data?.status === 'success'){
        generateSnackbar("Data Added Successfully", "success");
      }
      else{
        generateSnackbar(
          "Some Error occurs, please try again in a few minutes",
          "error"
        );
      }
    } catch (e) {
      generateSnackbar(
        "Some Error occurs, please try again in a few minutes",
        "error"
      );
    }
  }

  return (
    <>
      {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <>
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
                    {/* <Avatar
                alt="Profile Picture"
                src={avatar}
                sx={{ width: 100, height: 100 }}
              /> */}
                    <p className="max-w-xs font-semibold mb-[10%]">
                      Max file size is 5MB, Minimum dimension: 150x150 And
                      Suitable files are .jpg & .png
                    </p>
                  </Box>
                  <div className="w-40 h-40 border shadow-sm rounded-[100%] bg-white p-2 pb-0 -mt-14 rounded-[100%]">
                    <img
                      src={avatar}
                      alt="User icon"
                      className="w-full h-full object-fit rounded-[100%]"
                    />
                  </div>

                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button
                      variant="contained"
                      component="span" // Ensures that the button works as a label for the file input
                      className="font-bold text-lg w-full max-w-[300px] py-2"
                    >
                      Upload Photo
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden" // Hide the actual file input
                    />
                  </label>
                  <Button
                    variant="contained"
                    color="primary"
                    className="font-bold text-lg w-full max-w-[350px] py-2"
                    onClick={handleChangeImage}
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
                        className="shadow-medium capitalize"
                        name="professionalFullName"
                        value={toCamelCase(form1.professionalFullName)}
                        onChange={handleChangeForm1}
                        placeholder="Jane"
                      />
                    </FormControl>
                  </div>

                  <div className="flex flex-col gap-4 md:flex-row">
                    <FormControl fullWidth margin="normal">
                      <Typography gutterBottom variant="body1">
                        Email
                      </Typography>
                      <TextField
                        type="email"
                        className="shadow-medium"
                        placeholder="jane.doe@example.com"
                        name="professionalEmail"
                        disabled
                        onChange={handleChangeForm1}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                      <Typography gutterBottom variant="body1">
                        Phone Number
                      </Typography>
                      <TextField
                        className="shadow-medium"
                        placeholder="+1 (555) 123-4567"
                        disabled
                        name="professionalPhoneNo"
                        onChange={handleChangeForm1}
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
                    onClick={handleSubmitForm2}
                  >
                    Save changes
                    <Image src={arrowRight} alt="Save changes" />
                  </Button>
                </Box>
              </Paper>
              <Grid item xs={24} className="mt-6">
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
                        name="oldEmail"
                        disabled
                        value={form2.oldEmail}
                        placeholder="current@email.com"
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" className="mt-4">
                      <Typography gutterBottom variant="body1">
                        New Email
                      </Typography>
                      <TextField
                        className="shadow-medium"
                        placeholder="new@email.com"
                        name="newEmail"
                        value={form2.newEmail}
                        onChange={handleChangeForm2}
                      />
                    </FormControl>
                    <FormControl fullWidth margin="normal" className="mt-4">
                      <Typography gutterBottom variant="body1">
                        Confirm Email
                      </Typography>
                      <TextField
                        className="shadow-medium"
                        placeholder="new@email.com"
                        name="confirmEmail"
                        value={form2.confirmEmail}
                        onChange={handleChangeForm2}
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
                      onClick={handleChangeEmail}
                    >
                      Save changes
                      <Image src={arrowRight} alt="Save changes" />
                    </Button>
                  </Box>
                </Paper>
              </Grid>
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
                      name="professionalCompanyName"
                      value={toCamelCase(form3.professionalCompanyName)}
                      onChange={handleChangeForm3}
                      className="shadow-medium"
                      placeholder="Dry Cleaner"
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal" className="mt-4">
                    <Typography gutterBottom variant="body1">
                      Business Title
                    </Typography>
                    <TextField
                      className="shadow-medium"
                      placeholder="Dry Cleaner in Newport (NP20)"
                      name="professionalCompanyTitle"
                      value={toCamelCase(form3.professionalCompanyTitle)}
                      onChange={handleChangeForm3}
                    />
                  </FormControl>
                  <Autocomplete
                    multiple
                    value={formatPostcodeOptions().filter((option) =>
                      selectedLocations.includes(option.value)
                    )}
                    onChange={handleLocationChange}
                    options={formatPostcodeOptions()}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Locations"
                        placeholder="Select your service locations"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.value}
                          label={option.label}
                          {...getTagProps({ index })}
                          color="secondary"
                        />
                      ))
                    }
                  />
                  <Autocomplete
                    value={formatServiceOptions().find(
                      (option) => option.value === primaryService
                    )}
                    onChange={handlePrimaryServiceChange}
                    options={formatServiceOptions()}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Primary Service"
                        placeholder="Select your primary service"
                      />
                    )}
                  />
                  <FormControl>
                    <Box>
                      <Typography variant="body1">Your Bio.</Typography>
                      <ReactQuill
                        // value={editorValue}
                        // onChange={handleChange}
                        theme="snow"
                        className="bg-white rounded-lg shadow-lg overflow-hidden border-2 h-[250px] [&_*]:!font-mono [&_*]:!text-base"
                        placeholder="Start typing here"
                        value={toCamelCase(form3.professionalBio)}
                        onChange={(e) => {
                          setForm3((prev) => ({
                            ...prev,
                            ["professionalBio"]: e,
                          }));
                        }}
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
                  <Autocomplete
                    multiple
                    value={formatServiceOptions().filter((option) =>
                      selectedServices.includes(option.value)
                    )}
                    onChange={handleServiceChange}
                    options={formatServiceOptions()}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Services"
                        placeholder="Select your services"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={option.value}
                          label={option.label}
                          {...getTagProps({ index })}
                          color="secondary"
                        />
                      ))
                    }
                  />

                  <FormControl fullWidth margin="normal" className="mt-4">
                    <Typography gutterBottom variant="body1">
                      Comapny Website
                    </Typography>
                    <TextField
                      className="shadow-medium"
                      name="professionalCompanywebsite"
                      value={form3.professionalCompanywebsite}
                      onChange={handleChangeForm3}
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal" className="mt-4">
                    <Typography gutterBottom variant="body1">
                      Address
                    </Typography>
                    <TextField
                      className="shadow-medium"
                      placeholder="123 Main St, Anytown, AN 12345"
                      name="professionalAddress"
                      value={form3.professionalAddress}
                      onChange={handleChangeForm3}
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
                    onClick={handleSubmitForm3}
                  >
                    Save changes
                    <Image src={arrowRight} alt="Save changes" />
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Modal open={openVerifyModel}>
            <VerifyEmail oldEmail={form2.oldEmail} newEmail={form2.newEmail} />
          </Modal>

          <Modal open={loading}>
            <Box className="w-full h-full flex justify-center items-center">
              <Box className="p-4 bg-white rounded-md shadow-md w-full max-w-2xl pt-16 pb-20 flex flex-col justify-center items-center">
                <img
                  src="/images/loader.gif"
                  alt="Loading..."
                  className="w-60"
                />
                <h1 className="text-center font-bold text-xl ml-2">
                  Updating Profile Picture...
                </h1>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProfessionalSettingsPage;
