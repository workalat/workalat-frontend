"use client";
import React, { useState, useEffect } from "react";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Close from "@mui/icons-material/Close";
import PinDrop from "@mui/icons-material/PinDrop";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete,
} from "@mui/material";
import { siteConfig } from "@/config/site";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import moment from "moment";
// Import postcode data
import postcodesData from "@/postcodes.json";
import regionsData from "@/postcode_region.json";

// Services list
// const SERVICES_LIST = [
//   "end of tenancy cleaning",
//   "general plumbing",
//   "house cleaning",
//   "office cleaning",
//   "gas safety check",
//   "carpet cleaning",
//   "window cleaners",
//   "phone repair",
//   "water heater installation",
//   "oven cleaning",
//   "dry cleaning",
//   "water heater maintenance",
//   "chimney cleaning",
//   "rug cleaning",
//   "warehouse cleaning",
//   "ironing"
// ];

interface JobSearchCriteria {
  keyword: string;
  services: string[];
  location: {
    custom: string;
    nationwide: boolean;
  };
  budget: {
    minBudget: number;
    maxBudget: number;
  };
  time: {
    anytime: boolean;
    lastHour: boolean;
    today: boolean;
    yesterday: boolean;
    threeDays: boolean;
    sevenDays: boolean;
    twoWeeks: boolean;
  };
}

export default function LeadsFilter({setFilterProjects, professionalId, userSkills } : any) {
  console.log("User skills",userSkills)
  const SERVICES_LIST =userSkills;
  // Main filter state
  const [filters, setFilters] : any = useState<JobSearchCriteria>({
    keyword: "",
    services: [],
    location: {
      custom: "",
      nationwide: false,
    },
    budget: {
      minBudget: 0,
      maxBudget: 999999,
    },
    time: {
      anytime: true,
      lastHour: false,
      today: false,
      yesterday: false,
      threeDays: false,
      sevenDays: false,
      twoWeeks: false,
    },
  });

  // UI States
  const [open, setOpen] : any = useState(false);
  const [showAllServices, setShowAllServices] : any = useState(false);
  const [selectedPostcode, setSelectedPostcode] : any = useState("");
  const [selectedPostcodeRegion, setSelectedPostcodeRegion] : any = useState("");
  
  // Services fetching state
  const [availableServices, setAvailableServices] : any = useState<string[]>([]);
  
  // Context hooks
  const { generateSnackbar } : any = useSnackbar();
  const { filterLead, findAllServices } : any = useUserContext();

  // Fetch services on mount
  useEffect(() => {
    async function getServices() {
      try {
        const data : any = await findAllServices();
        console.log(data);
        setAvailableServices(data?.data);
      } catch (e) {
        console.log(e);
        generateSnackbar("Failed to fetch services", "error");
      }
    }
    getServices();
  }, []);

  // Display services (7 or all based on showAllServices)
  const displayedServices = showAllServices 
    ? SERVICES_LIST 
    : SERVICES_LIST.slice(0, 7);

  // Utility function to convert to camelCase
  const toCamelCase : any = (str: string) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Handle postcode selection
  const handlePostcodeSelection : any = (event: any, newValue: any) => {
    if (newValue) {
      const postcode : any = newValue.label;
      const region : any = regionsData[postcode] || "";
      setSelectedPostcodeRegion(region);
      setSelectedPostcode(postcode);
      setFilters(prev => ({
        ...prev,
        location: { ...prev.location, custom: postcode }
      }));
    }
  };

  // Form submission handler
  const handleFilterSubmit : any = async (e : any) => {
    try {
      e.preventDefault();
      const service = filters.keyword;
      const services = (filters.services.length > 0) ? filters.services : [""];
      const min = filters.budget.minBudget;
      const max = filters.budget.maxBudget;
      const today = moment().toISOString();
      const timeStamp = filters.time.today ? moment().toISOString() :
        filters.time.yesterday ? moment().subtract(1, 'days').toISOString() :
        filters.time.lastHour ? moment().subtract(1, 'hours').toISOString() :
        filters.time.threeDays ? moment().subtract(3, 'days').toISOString() :
        filters.time.sevenDays ? moment().subtract(7, 'days').toISOString() :
        filters.time.twoWeeks ? moment().subtract(2, 'weeks').toISOString() :
        moment().subtract(2, 'years').toISOString();
      
      const location = filters.location.nationwide 
        ? ["nationwide", filters.location.custom] 
        : [filters.location.custom];

      const res = await filterLead({
        service,
        services,
        minBudget: min,
        maxBudget: max,
        todayTimeStamp: today,
        timeStamp,
        location,
        professionalId
      });
      console.log(res);
      setFilterProjects(res?.data?.data);
    } catch(e) {
      console.log(e);
      generateSnackbar("Failed to apply filters", "error");
    }
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      keyword: "",
      services: [],
      location: {
        custom: "",
        nationwide: false,
      },
      budget: {
        minBudget: 0,
        maxBudget: 999999,
      },
      time: {
        anytime: true,
        lastHour: false,
        today: false,
        yesterday: false,
        threeDays: false,
        sevenDays: false,
        twoWeeks: false,
      },
    });
    setSelectedPostcode("");
    setSelectedPostcodeRegion("");
  };


  return (
    <>
      <Button
        variant="contained"
        color="info"
        className="mt-4 sticky top-32 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <FilterListIcon className="mr-2" />
        Filters
      </Button>
      <div
        className={`overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden pointer-events-none ${
          open ? "opacity-100" : "opacity-0"
        } transition-opacity`}
      />
      <Box
        className={`py-5 lg:pr-4 px-4 border-r w-full max-w-xs overflow-auto h-svh lg:h-auto bg-white fixed lg:static lg:z-0 z-50 left-0 lg:!translate-x-0 ${
          open ? " translate-x-0" : "-translate-x-full"
        } top-0 transition-all`}
      >
        <form onSubmit={handleFilterSubmit}>
          <Box className="flex justify-between">
            <h2 className="text-2xl font-bold">Filters</h2>
            <Close
              className="block lg:hidden"
              role="button"
              onClick={() => setOpen(false)}
            />
          </Box>

          {/* Keyword Search with Autocomplete */}
          <Box className="mt-6">
            <label htmlFor="keyword" className="block font-semibold mb-1">
              Keyword search
            </label>
            <Autocomplete
              fullWidth
              id="keyword"
              options={availableServices.map((service) => ({
                label: toCamelCase(service),
                value: service.toLowerCase(),
              }))}
              value={filters.keyword ? { label: toCamelCase(filters.keyword), value: filters.keyword } : null}
              onChange={(_, newValue) => {
                setFilters((prev) => ({
                  ...prev,
                  keyword: newValue ? newValue.value : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <SearchIcon className="text-gray-300 mr-2" />,
                  }}
                  placeholder="Search services"
                />
              )}
            />
          </Box>

          {/* Services Section */}
          <Box className="mt-6">
            <p className="font-bold mb-1">Services</p>
            <Box className="flex flex-col gap-1">
              {displayedServices.length>0 ?  displayedServices.map((service) => (
                <Box key={service} className="flex items-center">
                  <Checkbox
                    id={service}
                    checked={filters.services.includes(service)}
                    onChange={(_) => {
                      const newServices = filters.services.includes(service)
                        ? filters.services.filter((s) => s !== service)
                        : [...filters.services, service];
                      setFilters((prev) => ({ ...prev, services: newServices }));
                    }}
                  />
                  <label
                    htmlFor={service}
                    className="capitalize text-black text-opacity-60 cursor-pointer"
                  >
                    {toCamelCase(service)}
                  </label>
                </Box>
              )) : <p className="text-gray-600 text-[.8rem]">No Services Added.</p>}
              {SERVICES_LIST.length > 7 && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="mt-2"
                >
                  {showAllServices ? "Show Less" : "Show More"}
                </Button>
              )}
            </Box>
          </Box>

          {/* Location Section */}
          <Box className="mt-6">
            <Box>
              <p className="font-bold mb-1">Project Location</p>
              <Autocomplete
                fullWidth
                options={postcodesData.map((postcode) => ({
                  label: postcode,
                }))}
                value={selectedPostcode ? { label: selectedPostcode } : null}
                onChange={handlePostcodeSelection}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Enter postcode"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: <PinDrop className="text-gray-300" />,
                    }}
                  />
                )}
              />
              {selectedPostcodeRegion && (
                <p className="mt-2 text-sm text-gray-600">
                  Region: {selectedPostcodeRegion}
                </p>
              )}
              <RadioGroup className="mt-4" defaultValue={"all"}>
                <FormControlLabel
                  value="nationwide"
                  control={<Radio color="secondary" />}
                  label="Nationwide"
                  checked={filters.location.nationwide}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      location: { ...prev.location, nationwide: true },
                    }))
                  }
                />
              </RadioGroup>
            </Box>
          </Box>

          {/* Budget Section */}
          <Box className="mt-6">
            <Box className="flex justify-between items-center">
              <p className="font-bold mb-1">Client Budget</p>
              <Button
                variant="text"
                color="secondary"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    budget: { minBudget: 0, maxBudget: 999999 },
                  }))
                }
              >
                Clear
              </Button>
            </Box>
            <Box>
              <label htmlFor="min_budget" className="block font-semibold mb-1">
                min
              </label>
              <TextField
                fullWidth
                type="number"
                id="min_budget"
                value={filters.budget.minBudget}
                InputProps={{
                  startAdornment: (
                    <span className="text-gray-400 font-semibold">£</span>
                  ),
                  endAdornment: (
                    <span className="font-semibold text-gray-400">GBP</span>
                  ),
                }}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    budget: {
                      ...prev.budget,
                      minBudget: Number(e.target.value),
                    },
                  }))
                }
              />
            </Box>
            <Box className="mt-3">
              <label htmlFor="max_budget" className="block font-semibold mb-1">
                max
              </label>
              <TextField
                fullWidth
                type="number"
                id="max_budget"
                value={filters.budget.maxBudget}
                InputProps={{
                  startAdornment: (
                    <span className="text-gray-400 font-semibold">£</span>
                  ),
                  endAdornment: (
                    <span className="font-semibold text-gray-400">GBP</span>
                  ),
                }}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    budget: {
                      ...prev.budget,
                      maxBudget: Number(e.target.value),
                    },
                  }))
                }
              />
            </Box>
          </Box>

          {/* Time Section */}
          <Box className="mt-6">
            <p className="font-bold mb-1">When the lead was submitted</p>
            <RadioGroup className="mt-2" defaultValue={"anytime"}>
              {[
                { value: "anytime", label: "Anytime" },
                { value: "last_hour", label: "Last Hour" },
                { value: "today", label: "Today" },
                { value: "yesterday", label: "Yesterday" },
                { value: "threeDays", label: "Less than 3 Days" },
                { value: "sevenDays", label: "Less than 7 Days" },
                { value: "twoWeeks", label: "Within the last 2 Weeks" },
              ].map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio color="secondary" />}
                  label={option.label}
                  checked={filters.time[option.value === "last_hour" ? "lastHour" : option.value]}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      time: {
                        ...Object.fromEntries(
                          Object.keys(prev.time).map((key) => [
                            key,
                            key === (option.value === "last_hour" ? "lastHour" : option.value),
                          ])
                        ),
                      },
                    }))
                  }
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Action Buttons */}
          <Box className="mt-6 flex gap-2">
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              onClick={clearFilters}
            >
              Clear
              <Close />
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Apply
              <ArrowForward />
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
