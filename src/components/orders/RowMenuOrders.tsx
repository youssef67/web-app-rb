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

interface RowMenuProps {
  idOrder: number;
  onChangeMade: () => void;
  openUpdateModal: (orderId: number) => void | null;
}

const RowMenuOrders: React.FC<RowMenuProps> = ({
  idOrder,
  onChangeMade,
  openUpdateModal,
}) => {
  const headers = useHeader();
  const { setNotification } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (action: string) => fetchUpdateOrder(idOrder, headers, action),
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

  const updateOrder = (action: string) => {
    mutation.mutate(action);
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  return (
    <>
      <Dropdown>
        <MenuButton
        sx={{ paddingLeft: 4, paddingRight: 4, border: "1px solid #2F4558"  }}
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "soft", color: "neutral", size: "sm" },
          }}
        >
          Actions
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 150 }} variant="soft">
          <MenuItem onClick={() => updateOrder("recovered")}>Valider</MenuItem>
          <MenuItem onClick={() => openUpdateModal(idOrder)}>Modifier</MenuItem>
          <MenuItem onClick={() => updateOrder("canceled")}>Annuler</MenuItem>
          <MenuItem onClick={() => updateOrder("noShow")}>No show</MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};

export default RowMenuOrders;
