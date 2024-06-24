import React from "react";
import Box from "@mui/joy/Box";
import Typography from '@mui/joy/Typography';

const CustomMessage: React.FC<{message: string}> = ({message}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
       <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
        {message}
      </Typography>
    </Box>
  );
}

export default CustomMessage
