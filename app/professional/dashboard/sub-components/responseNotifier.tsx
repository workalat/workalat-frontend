import { Box, Typography, Divider, Button } from "@mui/material";

const ResponsesNotifier = () => {
  return (
    <Box className="w-full max-w-xs flex flex-col gap-2 p-6 bg-[#F9F2F2] rounded-lg">
      <Box className="flex justify-between items-center gap-2">
        <Typography className="text-lg font-bold">Responses</Typography>
        <Button color='secondary'>
          View
        </Button>
      </Box>
      <Divider sx={{ fontWeight: "bold", color: "gray.400" }} />
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginTop: 2,
        }}
      >
        You haven’t responded to any leads yet.
      </Typography>
    </Box>
  );
};

export default ResponsesNotifier;
