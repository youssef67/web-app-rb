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
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import Checkbox from "@mui/joy/Checkbox";

import { Order } from "@interfaces/interfaces";
import MobilePagination from "@components/common/MobilePagination";
import { useQueryClient } from "@tanstack/react-query";
import RowMenuOrders from "@components/orders/RowMenuOrders";
import { formatPhoneNumber, sortOrders } from "@utils/commonUtils";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface OrderProps {
  componentCallBy: string;
  ordersList: Order[];
  numberOfPages: number;
  currentPage: number;
  sortingValue: string;
  openUpdateModal: (orderId: number) => void;
  setSelected?: (value: any) => void;
  selected?: number[];
}

const OrderList: React.FC<OrderProps> = ({
  componentCallBy,
  ordersList,
  numberOfPages,
  currentPage,
  sortingValue,
  openUpdateModal,
  setSelected,
  selected,
}) => {
  const queryClient = useQueryClient();
  const [dummyState, setDummyState] = useState(0);

  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    setDummyState(dummyState + 1);
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {selected && setSelected && (
        <>
          <Checkbox
            size="sm"
            label="Tout sélectionner"
            indeterminate={
              selected.length > 0 && selected.length !== ordersList.length
            }
            checked={selected.length === ordersList.length}
            onChange={(event) => {
              setSelected(
                event.target.checked ? ordersList.map((row) => row.id) : []
              );
            }}
            color={
              selected.length > 0 || selected.length === ordersList.length
                ? "primary"
                : undefined
            }
            sx={{ verticalAlign: "text-bottom", marginBottom: 2 }}
          />
          <ListDivider />
        </>
      )}

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
            color="warning"
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              {selected && setSelected && (
                <Checkbox
                  size="sm"
                  checked={selected.includes(order.id)}
                  color={selected.includes(order.id) ? "primary" : undefined}
                  onChange={(event) => {
                    setSelected((ids: any[]) =>
                      event.target.checked
                        ? ids.concat(order.id)
                        : ids.filter((itemId) => itemId !== order.id)
                    );
                  }}
                  slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                  sx={{ verticalAlign: "text-bottom" }}
                />
              )}
              <div>
                <Chip
                  variant="soft"
                  size="sm"
                  startDecorator={
                    {
                      1: <InsertEmoticonIcon />,
                      2: <SentimentNeutralIcon />,
                      3: <MoodBadIcon />,
                    }[order.customer.notations?.[0]?.notation ?? 0]
                  }
                  color={
                    {
                      1: "success",
                      2: "warning",
                      3: "danger",
                    }[order.customer.notations?.[0]?.notation ?? 0] as ColorPaletteProp
                  }
                >
                  <Typography fontWeight={600} gutterBottom>
                    {order.customer.name} {order.customer.lastname}
                  </Typography>
                </Chip>
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
                    <InfoIcon sx={{ fontSize: "1.3rem" }} />
                  </Tooltip>
                </ListItemDecorator>
                {componentCallBy === "daysOrders" ? (
                  <Typography level="body-xs" gutterBottom>
                    Heure de retrait :{" "}
                    {order.pickupTime.replace(":", "H").slice(0, -3)}
                  </Typography>
                ) : (
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div style={{ width: 240 }}>
                      <Typography level="body-xs">
                        {format(new Date(order.pickupDate), "dd/MM/yyyy", {
                          locale: fr,
                        })}
                      </Typography>
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
