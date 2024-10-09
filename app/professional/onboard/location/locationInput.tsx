import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Locations() {
  const locations = [
    { name: 'New York City', country: 'USA' },
    { name: 'London', country: 'UK' },
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Sydney', country: 'Australia' },
    { name: 'Paris', country: 'France' },
    { name: 'Mumbai', country: 'India' },
    { name: 'Buenos Aires', country: 'Argentina' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Moscow', country: 'Russia' },
    { name: 'Beijing', country: 'China' },
  ];

  return (
    <>
      <Autocomplete
        multiple
        id="location-autocomplete"
        options={locations}
        getOptionLabel={(option) => option.name}
        defaultValue={[locations[0]]}
        renderInput={(params) => (
          <TextField {...params} label="Select Locations" placeholder="Enter locations" />
        )}
        ChipProps={{
          variant: "filled",
          color: "secondary",
        }}
      />
    </>
  );
}