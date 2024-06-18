import React from "react";
import { usePagination } from "@contexts/PaginationContext";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/joy/Box";

interface MobilePaginationProps {
  numberOfPages: number;
  currentPage: number
}

const MobilePagination: React.FC<MobilePaginationProps> = ({
  numberOfPages,
  currentPage
}) => {
    console.log(numberOfPages)
    console.log(currentPage)
  const { setCurrentPage } = usePagination();
//   const numberOfPagesArray = Array.from(
//     { length: numberOfPages },
//     (_, index) => index + 1
//   );

  const handleNumberPage = (direction: string) => {
    if (direction === "next" && currentPage < numberOfPages) {
        setCurrentPage(currentPage + 1);
    }

    if (direction === "prev" && currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <Box
      className="Pagination-mobile"
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        py: 2,
      }}
    >
      <IconButton
        aria-label="page précédente"
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() => handleNumberPage("prev")}
        disabled={currentPage === 1}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography level="body-sm" mx="auto">
        Page {currentPage} sur {numberOfPages}
      </Typography>
      <IconButton
        aria-label="page suivante"
        variant="outlined"
        color="neutral"
        size="sm"
        onClick={() => handleNumberPage("next")}
        disabled={currentPage === numberOfPages}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default MobilePagination;
