import React from "react";
import { Button } from "@mui/joy";

interface RowMenuProps {
  customerId: number;
  onChangeMade: () => void;
  openUpdateModal: (customerId: number) => void | null;
}

const RowMenuCustomers: React.FC<RowMenuProps> = ({
  customerId,
  openUpdateModal,
}) => {
  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        size="lg"
        sx={{ minWidth: 100 }}
        onClick={() => openUpdateModal(customerId)}
      >
        Modifier
      </Button>
    </>
  );
};

export default RowMenuCustomers;
