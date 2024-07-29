import React from "react";
import { usePagination } from "@contexts/PaginationContext";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

interface DesktopPaginationProps {
  numberOfPages: number;
}

const DesktopPagination: React.FC<DesktopPaginationProps> = ({
  numberOfPages,
}) => {
  const { currentPage, setCurrentPage } = usePagination();
  

  const handleNumberPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPaginationItems = () => {
    if (numberOfPages <= 6) {
      return Array.from({ length: numberOfPages }, (_, index) => index + 1);
    }
    
    const pages: Array<number | string> = [];

    if (currentPage < numberOfPages) {
      // Always show the first three pages
      if (currentPage + 2 < numberOfPages) {
        for (let i = currentPage; i <= currentPage + 2; i++) {
          pages.push(i);
        }

        pages.push("...");
    
        // Always show the last three pages
        for (let i = numberOfPages - 2; i <= numberOfPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }

        pages.push("...");

        for (let i = numberOfPages - 2; i <= numberOfPages; i++) {
          pages.push(i);
        }
      }
    } else {
      for (let i = currentPage - 5; i <= currentPage - 3; i++) {
        console.log(i)
        pages.push(i);
      }

      pages.push("...");

      for (let i = numberOfPages - 2; i <= numberOfPages; i++) {
        pages.push(i);
      }
    }


    return [...new Set(pages)];
  };

  const paginationItems = getPaginationItems();

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
        justifyContent: "center"
      }}
    >
      <Button
        aria-label="Previous page"
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>

      {paginationItems.map((page) =>
      
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) === currentPage ? "solid" : "plain"}
            color="neutral"
            onClick={() => handleNumberPage(Number(page))}
          >
            {page}
          </IconButton>
        
      )}

      <Button
        aria-label="Next page"
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={
          currentPage === numberOfPages
            ? undefined
            : () => setCurrentPage(currentPage + 1)
        }
        disabled={currentPage === numberOfPages}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default DesktopPagination;
