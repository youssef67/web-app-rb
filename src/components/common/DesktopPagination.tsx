import React from "react";
import { usePagination } from "@contexts/PaginationContext";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
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
    getPaginationItems();
  };

  const getPaginationItems = () => {
    const pagination: Array<number | string> = [];

    if (numberOfPages <= 6) {
      return Array.from({ length: numberOfPages }, (_, index) => index + 1);
    }

    if (currentPage >= numberOfPages - 3) {
      for (let i = numberOfPages - 3; i <= numberOfPages; i++) {
        pagination.push(i);
      }
    } else {
      for (let i = currentPage; i <= currentPage + 3; i++) {
        pagination.push(i);
      }
    }

    return pagination;
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
        justifyContent: "center",
      }}
    >
      <Button
        aria-label="Previous page"
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={() => handleNumberPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>

      <Button onClick={() => handleNumberPage(1)}>
        <FirstPageIcon />
      </Button>

      {paginationItems.map((page) => (
        <IconButton
          key={page}
          size="sm"
          variant={Number(page) === currentPage ? "solid" : "plain"}
          color="neutral"
          onClick={() => handleNumberPage(Number(page))}
        >
          {page}
        </IconButton>
      ))}

      <Button onClick={() => handleNumberPage(numberOfPages)}>
        <LastPageIcon />
      </Button>
      <Button
        aria-label="Next page"
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={
          currentPage === numberOfPages
            ? undefined
            : () => handleNumberPage(currentPage + 1)
        }
        disabled={currentPage === numberOfPages}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default DesktopPagination;
