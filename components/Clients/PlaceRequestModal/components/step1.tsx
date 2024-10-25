// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Autocomplete,
//   Button,
//   FormControl,
//   TextField,
// } from "@mui/material";
// import Image from "next/image";
// import arrowRightIcon from "@/public/icons/arrow_right.svg";
// import { useUserContext } from "@/context/user_context";
// import { useSnackbar } from "@/context/snackbar_context";
// // Import postcode and region data
// import postcodesData from "@/postcodes.json";
// import Cookies from 'js-cookie';
// import regionsData from "@/postcode_region.json";
// import VerifyUser from "@/app/middleware/VerifyUser";

// interface Step1Props {
//   handleNext: () => void;
//   updateFormData: (data: any) => void;
// }

// const Step1 = ({ handleNext, updateFormData }: Step1Props) => {
//   const [formData, setFormData] = React.useState({
//     service: "",
//     location: "",
//   });

//   // USE CONTEXT
//   const { projectData, setProjectData, findAllServices, findServiceCategory } = useUserContext();
//   let [service, setService] = useState([]);
//   const { generateSnackbar } = useSnackbar();
  
//   // Store the service selected by the user (lowercase for backend)
//   const [selectedService, setSelectedService] = useState<string>(projectData.serviceNeeded || ""); // Set default value from projectData
//   const [selectedPostcode, setSelectedPostcode] = useState<string>(projectData.postCodeRegion || ""); // Set default value from projectData

//   const [postCode, setPostCode] = useState<string>(projectData.serviceLocationPostal || "");
//   const [filteredPostcodes, setFilteredPostcodes] = useState(postcodesData); // For filtering postcodes

//   useEffect(() => {
//     async function getServices() {
//       // console.log("Ajao 1")
//       try {
//         const data = await findAllServices();
//         // console.log(data);
//         setService(data.data);
//       } catch (e) {
//         // console.log(e);
//         generateSnackbar("Some Error Occur, please Try Again.", "error");
//       }
//     }
//     getServices();
//   }, []);

//   // Function to handle postcode selection
//   const handlePostcodeSelection = (event, newValue) => {
//     // console.log(newValue);
//     if (newValue) {
//       const postcode = newValue.label;
//       const region = regionsData[postcode] || ""; // Get region name
       
//       // Set the selected postcode (display postcode + region in the input)
//       setSelectedPostcode(`${postcode} , ${region}`);
//       setPostCode(newValue.label);
//     }
//   };

//   async function handleSubmit(e) {
//     try {
//       e.preventDefault();
//       // console.log("Hello")
     
//         let cat = await findServiceCategory({ serviceName: selectedService });
        
//       setProjectData({
//         ...projectData,
//         serviceCategory: cat.data?.category,
//         serviceNeeded: selectedService,
//         serviceLocationPostal: postCode,
//         postCodeRegion: selectedPostcode,
//       });
//       handleNext();

//     } catch (e) {
//       generateSnackbar("Some Error Occur, please Try Again.", "error");
//       console.log(e);
//     }
//   }

//   return (
//     <>
//       <h1 className="text-2xl sm:text-3xl font-bold text-center">Place your request</h1>
//       <form
//         className="flex flex-col items-center gap-6 w-full px-4 sm:px-10"
//         onSubmit={handleSubmit}
//       >
//         <FormControl className="w-full">
//           <label htmlFor="service" className="text-sm sm:text-lg font-bold mb-2">
//             Services needed
//           </label>
//           <Autocomplete
//             disablePortal
//             disabled
//             id="combo-box-demo"
//             className="w-full outline-none border-none"
//             options={service.map((serviceName: string) => ({
//               label: serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toLowerCase(),
//               value: serviceName,
//             }))}
//             value={selectedService ? { label: selectedService.charAt(0).toUpperCase() + selectedService.slice(1).toLowerCase(), value: selectedService } : null} // Set the value correctly
//             isOptionEqualToValue={(option, value) => option.value === value.value} // Custom equality test
//             onChange={(event, newValue) => {
//               if (newValue) {
//                 setSelectedService(newValue.value); // Save the lowercase value for backend
//               }
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="What service are you looking for?"
//                 className="capitalize"
//               />
//             )}
//           />
//         </FormControl>
//         <FormControl className="w-full">
//           <label htmlFor="location" className="text-sm sm:text-lg font-bold mb-2">
//             Location of service
//           </label>
//           <Autocomplete
//             disablePortal
//             disabled
//             value={selectedPostcode ? { label: selectedPostcode } : null} // Set the value correctly
//             id="combo-box-demo"
//             options={filteredPostcodes.map((postcode) => ({ label: postcode }))}
//             className="[&_input]:pl-3 [&_input]:text-base w-full [&>*>*]:border-b-4 [&>*>*]:border-b-secondary [&>*>*]:rounded-b-sm"
//             onChange={handlePostcodeSelection}  // When a postcode is selected
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="Search Postcode"
//                 InputProps={{
//                   ...params.InputProps,
//                 }}
//               />
//             )}
//           />
//         </FormControl>
//         <Button
//           variant="contained"
//           className="h-[50px] w-[140px] rounded-sm flex gap-2 mt-4"
//           type="submit"
//         >
//           <span className="font-bold">Continue</span>
//           <Image src={arrowRightIcon} alt="Arrow right" />
//         </Button>
//       </form>
//     </>
//   );
// };

// export default Step1;





// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Autocomplete,
//   Button,
//   FormControl,
//   TextField,
// } from "@mui/material";
// import Image from "next/image";
// import arrowRightIcon from "@/public/icons/arrow_right.svg";
// import { useUserContext } from "@/context/user_context";
// import { useSnackbar } from "@/context/snackbar_context";
// // Import postcode and region data
// import postcodesData from "@/postcodes.json";
// import regionsData from "@/postcode_region.json";

// interface Step1Props {
//   handleNext: () => void;
//   updateFormData: (data: any) => void;
// }

// const Step1 = ({ handleNext, updateFormData }: Step1Props) => {
//   // USE CONTEXT
//   const { projectData, setProjectData, findAllServices, findServiceCategory } = useUserContext();
//   const { generateSnackbar } = useSnackbar();
  
//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState<string>(projectData.serviceNeeded || "");
//   const [selectedPostcode, setSelectedPostcode] = useState<string>(projectData.serviceLocationPostal || "");
//   const [selectedPostcodeWithRegion, setSelectedPostcodeWithRegion] = useState<string>(projectData.postCodeRegion || "");

//   useEffect(() => {
//     async function getServices() {
//       try {
//         const data = await findAllServices();
//         setServices(data.data);
//       } catch (e) {
//         generateSnackbar("Some Error Occurred, please Try Again.", "error");
//       }
//     }
//     getServices();
//   }, []);

//   useEffect(() => {
//     if (selectedPostcode) {
//       const region = regionsData[selectedPostcode] || "";
//       setSelectedPostcodeWithRegion(`${selectedPostcode} , ${region}`);
//     }
//   }, [selectedPostcode]);

//   const handleServiceSelection = (event, newValue) => {
//     if (newValue) {
//       setSelectedService(newValue.value);
//     }
//   };

//   const handlePostcodeSelection = (event, newValue) => {
//     if (newValue) {
//       setSelectedPostcode(newValue.label);
//     }
//   };

//   const toCamelCase = (str: string) => {
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };

//   async function handleSubmit(e) {
//     try {
//       e.preventDefault();
//       if (!selectedService || !selectedPostcode) {
//         generateSnackbar("Please fill in all fields", "error");
//         return;
//       }

//       let cat = await findServiceCategory({ serviceName: selectedService });
      
//       setProjectData({
//         ...projectData,
//         serviceCategory: cat.data?.category,
//         serviceNeeded: selectedService,
//         serviceLocationPostal: selectedPostcode,
//         postCodeRegion: selectedPostcodeWithRegion,
//       });
//       handleNext();
//     } catch (e) {
//       generateSnackbar("Some Error Occurred, please Try Again.", "error");
//       console.log(e);
//     }
//   }

//   return (
//     <>
//       <h1 className="text-2xl sm:text-3xl font-bold text-center">Place your request</h1>
//       <form
//         className="flex flex-col items-center gap-6 w-full px-4 sm:px-10"
//         onSubmit={handleSubmit}
//       >
//         <FormControl className="w-full">
//           <label htmlFor="service" className="text-sm sm:text-lg font-bold mb-2">
//             Services needed
//           </label>
//           <Autocomplete
//             disablePortal
//             id="combo-box-demo"
//             className="w-full outline-none border-none"
//             options={services.map((serviceName: string) => ({
//               label: toCamelCase(serviceName),
//               value: serviceName,
//             }))}
//             value={selectedService ? { label: toCamelCase(selectedService), value: selectedService } : null}
//             isOptionEqualToValue={(option, value) => option.value === value.value}
//             onChange={handleServiceSelection}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="What service are you looking for?"
//                 className="capitalize"
//               />
//             )}
//           />
//         </FormControl>
//         <FormControl className="w-full">
//           <label htmlFor="location" className="text-sm sm:text-lg font-bold mb-2">
//             Location of service
//           </label>
//           <Autocomplete
//             disablePortal
//             id="postcode-autocomplete"
//             options={postcodesData.map((postcode) => ({ label: postcode }))}
//             value={selectedPostcode ? { label: selectedPostcode } : null}
//             className="[&_input]:pl-3 [&_input]:text-base w-full [&>*>*]:border-b-4 [&>*>*]:border-b-secondary [&>*>*]:rounded-b-sm"
//             onChange={handlePostcodeSelection}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="Search Postcode"
//                 InputProps={{
//                   ...params.InputProps,
//                 }}
//               />
//             )}
//           />
//           {selectedPostcodeWithRegion && (
//             <p className="text-sm mt-1 text-gray-600">{selectedPostcodeWithRegion}</p>
//           )}
//         </FormControl>
//         <Button
//           variant="contained"
//           className="h-[50px] w-[140px] rounded-sm flex gap-2 mt-4"
//           type="submit"
//         >
//           <span className="font-bold">Continue</span>
//           <Image src={arrowRightIcon} alt="Arrow right" />
//         </Button>
//       </form>
//     </>
//   );
// };

// export default Step1;




"use client";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import Image from "next/image";
import arrowRightIcon from "@/public/icons/arrow_right.svg";
import { useUserContext } from "@/context/user_context";
import { useSnackbar } from "@/context/snackbar_context";
// Import postcode and region data
import postcodesData from "@/postcodes.json";
import regionsData from "@/postcode_region.json";


const Step1 = ({ handleNext, updateFormData }:  any ) => {
  // USE CONTEXT
  const { projectData, setProjectData, findAllServices, findServiceCategory } : any  = useUserContext();
  const { generateSnackbar } : any  = useSnackbar();
  
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState<string>(projectData.serviceNeeded || "");
  const [selectedPostcode, setSelectedPostcode] = useState<string>(projectData.serviceLocationPostal || "");
  const [selectedPostcodeWithRegion, setSelectedPostcodeWithRegion] = useState<string>(projectData.postCodeRegion || "");

  useEffect(() => {
    async function getServices() {
      try {
        const data = await findAllServices();
        setServices(data.data);
      } catch (e) {
        generateSnackbar("Some Error Occurred, please Try Again.", "error");
      }
    }
    getServices();
  }, []);

  useEffect(() => {
    if (selectedPostcode) {
      const region = regionsData[selectedPostcode] || "";
      setSelectedPostcodeWithRegion(`${selectedPostcode} , ${region}`);
    }
  }, [selectedPostcode]);

  const handleServiceSelection = (event, newValue) => {
    if (newValue) {
      setSelectedService(newValue.value);
    }
  };

  const handlePostcodeSelection = (event, newValue) => {
    if (newValue) {
      const postcode = newValue.label;
      const region = regionsData[postcode] || "";
      setSelectedPostcode(postcode);
      setSelectedPostcodeWithRegion(`${postcode} , ${region}`);
    }
  };

  const toCamelCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!selectedService || !selectedPostcode) {
        generateSnackbar("Please fill in all fields", "error");
        return;
      }

      let cat : any  = await findServiceCategory({ serviceName: selectedService });
      
      setProjectData({
        ...projectData,
        serviceCategory: cat.data?.category,
        serviceNeeded: selectedService,
        serviceLocationPostal: selectedPostcode,
        postCodeRegion: selectedPostcodeWithRegion,
      });
      handleNext();
    } catch (e) {
      generateSnackbar("Some Error Occurred, please Try Again.", "error");
      console.log(e);
    }
  }

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Place your request</h1>
      <form
        className="flex flex-col items-center gap-6 w-full px-4 sm:px-10"
        onSubmit={handleSubmit}
      >
        <FormControl className="w-full">
          <label htmlFor="service" className="text-sm sm:text-lg font-bold mb-2">
            Services needed
          </label>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="w-full outline-none border-none"
            options={services.map((serviceName: string) => ({
              label: toCamelCase(serviceName),
              value: serviceName,
            }))}
            value={selectedService ? { label: toCamelCase(selectedService), value: selectedService } : null}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={handleServiceSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="What service are you looking for?"
                className="capitalize"
              />
            )}
          />
        </FormControl>
        <FormControl className="w-full">
          <label htmlFor="location" className="text-sm sm:text-lg font-bold mb-2">
            Location of service
          </label>
          <Autocomplete
            disablePortal
            id="postcode-autocomplete"
            options={postcodesData.map((postcode) => ({ label: postcode }))}
            value={selectedPostcodeWithRegion ? { label: selectedPostcodeWithRegion } : null}
            className="[&_input]:pl-3 [&_input]:text-base w-full [&>*>*]:border-b-4 [&>*>*]:border-b-secondary [&>*>*]:rounded-b-sm"
            onChange={handlePostcodeSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search Postcode"
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
        </FormControl>
        <Button
          variant="contained"
          className="h-[50px] w-[140px] rounded-sm flex gap-2 mt-4"
          type="submit"
        >
          <span className="font-bold">Continue</span>
          <Image src={arrowRightIcon} alt="Arrow right" />
        </Button>
      </form>
    </>
  );
};

export default Step1;