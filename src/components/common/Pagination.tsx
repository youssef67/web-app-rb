import React, { useState } from "react";
import { usePagination } from "@contexts/PaginationContext";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

interface PaginationProps {
  numberOfPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  numberOfPages,
}) => {
  const { currentPage, setCurrentPage } = usePagination();
  const numberOfPagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  const handleNumberPage = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <Box
      className="Pagination-laptopUp"
      sx={{
        pt: 2,
        gap: 1,
        [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
        display: {
          xs: "none",
          md: "flex",
        },
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>

      <Box sx={{ flex: 1 }} />
      {numberOfPagesArray.map((page) => (
        <IconButton
          key={page}
          size="sm"
          variant={Number(page) === currentPage ? "solid" : "plain"}
          color="neutral"
          onClick={() => handleNumberPage(page)}
        >
          {page}
        </IconButton>
      ))}
      <Box sx={{ flex: 1 }} />

      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={currentPage === numberOfPages ? undefined : () => setCurrentPage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default Pagination;
