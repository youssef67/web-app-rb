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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";

import { Order } from "@interfaces/interfaces";
import MobilePagination from "@components/common/MobilePagination";
import { useQueryClient } from "@tanstack/react-query";
import RowMenuOrders from "@components/orders/RowMenuOrders";
import { formatPhoneNumber, sortOrders } from "@utils/commonUtils";

interface OrderProps {
  componentCallBy: string;
  ordersList: Order[];
  numberOfPages: number;
  currentPage: number;
  sortingValue: string;
  openUpdateModal: (orderId: number) => void;
}

const OrderList: React.FC<OrderProps> = ({
  componentCallBy,
  ordersList,
  numberOfPages,
  currentPage,
  sortingValue,
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
      {sortOrders(ordersList, sortingValue).map((order: Order) => (
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

                {componentCallBy === "daysOrders" ? (
                  <Typography level="body-xs" gutterBottom>
                    Heure de retrait :{" "}
                    {order.pickupTime.replace(":", "H").slice(0, -3)}
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div style={{ width: 240 }}>
                      <Typography level="body-xs">26/06/2024</Typography>
                      <Typography level="body-xs" gutterBottom>
                        Heure de retrait :{" "}
                        {order.pickupTime.replace(":", "H").slice(0, -3)}
                      </Typography>
                    </div>
                  </Box>
                )}

                <Typography level="body-xs" gutterBottom>
                  Montant de la commande : {order.orderPrice} €
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">
                    {order.customer.email}
                  </Typography>
                  <Typography level="body-xs">
                    {formatPhoneNumber(order.customer.phone)}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <RowMenuOrders
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
                  3: <ThumbUpIcon />,
                  4: <ThumbDownIcon />,
                  5: <CloseIcon />,
                }[order.stateId]
              }
              color={
                {
                  1: "success",
                  2: "danger",
                  3: "success",
                  4: "danger",
                  5: "warning",
                }[order.stateId] as ColorPaletteProp
              }
            >
              {{
                1: "confirmé",
                2: "non confirmé",
                3: "commande récupérée",
                4: "commande non récupérée",
                5: "commande annulée",
              }[order.stateId] || ""}
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
