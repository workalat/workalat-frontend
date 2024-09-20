"use client";

import React, { useState } from "react";
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
} from "@mui/material";

import { siteConfig } from "@/config/site";

interface JobSearchCriteria {
  keyword: string;
  services: string[];
  location: {
    custom: string;
    within_30mi: boolean;
    nationwide: boolean;
    all: boolean;
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

export default function LeadsFilter({ setFilterss }: { setFilterss: (data: JobSearchCriteria) => void }) {
  const [filters, setFilters] = React.useState<JobSearchCriteria>({
    keyword: "",
    services: [],
    location: {
      custom: "",
      within_30mi: false,
      nationwide: false,
      all: true,
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

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterss(filters);
  };

  const clearFilters = () => {
    setFilterss(
      {
        keyword: "",
        services: [],
        location: {
          custom: "",
          within_30mi: false,
          nationwide: false,
          all: true,
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
      }
    )
  }

  const [open, setOpen] = useState(false);

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
        className={`overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden pointer-events-none ${open ? "opacity-100" : "opacity-0"} transition-opacity`}
      />
      <Box
        className={`py-5 lg:pr-4 px-4 border-r w-full max-w-xs overflow-auto h-svh lg:h-auto bg-white fixed lg:static lg:z-0 z-50 left-0 lg:!translate-x-0 ${open ? " translate-x-0" : "-translate-x-full"} top-0 transition-all`}
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
          <Box className="mt-6">
            <label htmlFor="keyword" className="block font-semibold mb-1">
              Keyword search
            </label>
            <TextField
              fullWidth
              type="text"
              id="keyword"
              value={filters.keyword}
              InputProps={{
                startAdornment: <SearchIcon className="text-gray-300" />,
                placeholder: "Keyword (e.g. name)",
                className: "gap-2",
              }}
              onChange={(e) => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
            />
          </Box>
          <Box className="mt-6">
            <p className="font-bold mb-1">Services</p>
            {siteConfig.services.map((service) => (
              <Box key={service.name} className="flex items-center">
                <Checkbox
                  id={service.name}
                  checked={filters.services.includes(service.name)}
                  onChange={(_) => {
                    const newServices = filters.services.includes(service.name)
                      ? filters.services.filter(s => s !== service.name)
                      : [...filters.services, service.name];

                    setFilters(prev => ({ ...prev, services: newServices }));
                  }}
                />
                <label htmlFor={service.name} className="text-black text-opacity-60 cursor-pointer">
                  {service.name} {"("}6,300{")"}
                </label>
              </Box>
            ))}
          </Box>
          <Box className="mt-6">
            <Box>
              <p className="font-bold mb-1">Project Location</p>
              <TextField
                fullWidth
                type="text"
                id="location"
                value={filters.location.custom}
                InputProps={{
                  endAdornment: <PinDrop className="text-gray-300" />,
                  placeholder: "Enter your location",
                  className: "gap-2",
                }}
                onChange={(e) => setFilters(prev => ({ ...prev, location: { ...prev.location, custom: e.target.value } }))}
              />
              <RadioGroup className="mt-4" defaultValue={"all"}>
                <FormControlLabel
                  value="all"
                  control={<Radio color="secondary" />}
                  label="All"
                  checked={filters.location.all}
                  onChange={() => setFilters(prev => ({ ...prev, location: { ...prev.location, all: true, within_30mi: false, nationwide: false } }))}
                />
                <FormControlLabel
                  value="nationwide"
                  control={<Radio color="secondary" />}
                  label="Nationwide"
                  checked={filters.location.nationwide}
                  onChange={() => setFilters(prev => ({ ...prev, location: { ...prev.location, all: false, within_30mi: false, nationwide: true } }))}
                />
                <FormControlLabel
                  value="within_30mi"
                  control={<Radio color="secondary" />}
                  label="30 Miles from Newport"
                  checked={filters.location.within_30mi}
                  onChange={() => setFilters(prev => ({ ...prev, location: { ...prev.location, all: false, within_30mi: true, nationwide: false } }))}
                />
              </RadioGroup>
            </Box>
          </Box>
          <Box className="mt-6">
            <Box className="flex justify-between items-center">
              <p className="font-bold mb-1">Client Budget</p>
              <Button variant="text" color="secondary">
                Clear
              </Button>
            </Box>
            <Box>
              <label htmlFor="min_budget" className="block font-semibold mb-1">
                min
              </label>
              <TextField
                fullWidth
                type="text"
                id="min_budget"
                defaultValue={0}
                value={filters.budget.minBudget}
                InputProps={{
                  startAdornment: (
                    <span className="text-gray-400 font-semibold">£</span>
                  ),
                  endAdornment: (
                    <span className="font-semibold text-gray-400">GBP</span>
                  ),
                  placeholder: "0",
                  className: "gap-2",
                }}
                onChange={(e) => setFilters(prev => ({ ...prev, budget: { ...prev.budget, minBudget: Number(e.target.value) } }))}
              />
            </Box>
            <Box className="mt-3">
              <label htmlFor="max_budget" className="block font-semibold mb-1">
                max
              </label>
              <TextField
                fullWidth
                type="text"
                id="max_budget"
                defaultValue={9999999}
                value={filters.budget.maxBudget}
                InputProps={{
                  startAdornment: (
                    <span className="text-gray-400 font-semibold">£</span>
                  ),
                  endAdornment: (
                    <span className="font-semibold text-gray-400">GBP</span>
                  ),
                  placeholder: "0",
                  className: "gap-2",
                }}
                onChange={(e) => setFilters(prev => ({ ...prev, budget: { ...prev.budget, maxBudget: Number(e.target.value) } }))}
              />
            </Box>
          </Box>
          <Box className="mt-6">
            <p className="font-bold mb-1">When the lead was submitted</p>
            <RadioGroup className="mt-2" defaultValue={"anytime"}>
              <FormControlLabel
                value="anytime"
                control={<Radio color="secondary" />}
                label="Anytime"
                checked={filters.time.anytime}
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: true, lastHour: false, today: false, yesterday: false, threeDays: false, sevenDays: false, twoWeeks: false } }))}
              />
              <FormControlLabel
                value="last_hour"
                control={<Radio color="secondary" />}
                label="Last Hour"
                checked={filters.time.lastHour}
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: false, lastHour: true, today: false, yesterday: false, threeDays: false, sevenDays: false, twoWeeks: false } }))}
              />
              <FormControlLabel
                value="today"
                control={<Radio color="secondary" />}
                label="Today"
                checked={filters.time.today}
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: false, lastHour: false, today: true, yesterday: false, threeDays: false, sevenDays: false, twoWeeks: false } }))}
              />
              <FormControlLabel
                value="yesterday"
                control={<Radio color="secondary" />}
                label="Yesterday"
                checked={filters.time.yesterday}
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: false, lastHour: false, today: false, yesterday: true, threeDays: false, sevenDays: false, twoWeeks: false } }))}
              />
              <FormControlLabel
                value="threeDays"
                control={<Radio color="secondary" />}
                label="Less than 3 Days"
                checked={filters.time.threeDays}
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: false, lastHour: false, today: false, yesterday: false, threeDays: true, sevenDays: false, twoWeeks: false } }))}
              />
              <FormControlLabel
                value="sevenDays"
                control={<Radio color="secondary" />}
                checked={filters.time.sevenDays}
                label="Less than 7 Days"
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: false, lastHour: false, today: false, yesterday: false, threeDays: false, sevenDays: true, twoWeeks: false } }))}
              />
              <FormControlLabel
                value="twoWeeks"
                control={<Radio color="secondary" />}
                checked={filters.time.twoWeeks}
                label="Within the last 2 Weeks"
                onChange={() => setFilters(prev => ({ ...prev, time: { ...prev.time, anytime: false, lastHour: false, today: false, yesterday: false, threeDays: false, sevenDays: false, twoWeeks: true } }))}
              />
            </RadioGroup>
          </Box>
          <Box className="mt-6 flex gap-2">
            <Button fullWidth variant="contained" color="secondary" size="large" onClick={clearFilters}>
              Clear
              <Close />
            </Button>
            <Button fullWidth type="submit" variant="contained" color="primary" size="large">
              Apply
              <ArrowForward />
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
