import React from "react";

import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import IconButton from "@mui/joy/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateOrder } from "@utils/apiUtils";
import { useHeader } from "@hooks/useHeader";
import { useNotification } from "@contexts/NotificationContext";
import { Button } from "@mui/joy";

interface RowMenuProps {
  customerId: number;
  onChangeMade: () => void;
  openUpdateModal: (customerId: number) => void | null;
}

const RowMenu: React.FC<RowMenuProps> = ({
  customerId,
  onChangeMade,
  openUpdateModal,
}) => {
  const headers = useHeader();
  const { setNotification } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (action: string) => fetchUpdateOrder(customerId, headers, action),
    onSuccess: () => {
      onChangeMade();
      setNotification({
        message: "Action effectué",
        variant: "success",
      });
    },
    onError: () => {
      setNotification({
        message: "Une erreur est survenue",
        variant: "error",
      });
    },
  });

  // const validateOrderPickup = () => {
  //   mutation.mutate("recovered");
  //   queryClient.invalidateQueries({ queryKey: ["orders"] });
  // };

  // const cancelOrder = () => {
  //   mutation.mutate("canceled");
  //   queryClient.invalidateQueries({ queryKey: ["orders"] });
  // };

  return (
    <>
     <Button 
              variant="outlined"
              color="neutral"
              size="sm" sx={{ minWidth: 100 }}
              // startDecorator={<Add />}
              onClick={() => openUpdateModal(customerId)}
            >
              Modifier
            </Button>
      {/* <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem onClick={() => openUpdateModal(customerId)}>Modifier</MenuItem>
        </Menu>
      </Dropdown> */}
    </>
  );
};

export default RowMenu;
