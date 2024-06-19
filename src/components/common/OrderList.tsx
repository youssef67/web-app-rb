import React, { useState } from "react";

import { ColorPaletteProp } from "@mui/joy/styles";
import Tooltip from "@mui/joy/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Box from "@mui/joy/Box";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";

import { Order } from "@interfaces/interfaces";
import MobilePagination from "@components/common/MobilePagination";
import { useQueryClient } from "@tanstack/react-query";
import RowMenu from "@components/common/RowMenu";
import { formatPhoneNumber } from "@utils/commonUtils";

interface OrderProps {
  ordersList: Order[];
  numberOfPages: number;
  currentPage: number;
  openUpdateModal: (orderId: number) => void;
}

const OrderList: React.FC<OrderProps> = ({
  ordersList,
  numberOfPages,
  currentPage,
  openUpdateModal,
}) => {
  const queryClient = useQueryClient();
  const [dummyState, setDummyState] = useState(0);

  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    setDummyState(dummyState + 1);
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {ordersList.map((order: Order) => (
        <List
          key={order.id}
          size="sm"
          sx={{
            "--ListItem-paddingX": 0,
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              <ListItemDecorator>
                <Tooltip
                  title={
                    order.detailsForUser
                      ? order.detailsForUser
                      : "Aucune information"
                  }
                  variant="solid"
                  placement="right"
                >
                  <InfoIcon sx={{ fontSize: "2rem" }} />
                </Tooltip>
              </ListItemDecorator>
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {order.customer.name} {order.customer.lastname}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Heure de retrait : 10H00
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Montant de la commande : {order.orderPrice} €
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">
                    {" "}
                    {order.customer.email}
                  </Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">
                    {formatPhoneNumber(order.customer.phone)}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <RowMenu
                    idOrder={order.id}
                    onChangeMade={handleChangeMade}
                    openUpdateModal={openUpdateModal}
                  />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  1: <CheckRoundedIcon />,
                  2: <BlockIcon />,
                }[order.stateId]
              }
              color={
                {
                  1: "success",
                  2: "danger",
                }[order.stateId] as ColorPaletteProp
              }
            >
              {order.stateId === 1 ? "confirmé" : "non confirmé "}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <MobilePagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
      />
    </Box>
  );
};

export default OrderList;
