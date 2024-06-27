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

import { CustomerWithPivotData } from "@interfaces/interfaces";
import MobilePagination from "@components/common/MobilePagination";
import { useQueryClient } from "@tanstack/react-query";
import RowMenuCustomers from "@components/common/RowMenuCustomers";
import { formatPhoneNumber, sortOrders } from "@utils/commonUtils";

interface OrderProps {
  customersList: CustomerWithPivotData[];
  numberOfPages: number;
  currentPage: number;
  sortingValue: string;
}

const OrderList: React.FC<OrderProps> = ({
  customersList,
  numberOfPages,
  currentPage,
  sortingValue,
}) => {
  const queryClient = useQueryClient();
  const [dummyState, setDummyState] = useState(0);

  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    setDummyState(dummyState + 1);
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {/* {sortOrders(ordersList, sortingValue).map((order: Order) => ( */}
      {customersList.map((customer: Customer) => (
        <List
          key={customer.id}
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
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {customer.name} {customer.lastname}
                </Typography>
                <Typography level="body-xs"> {customer.email}</Typography>
                <Typography level="body-xs">&bull;</Typography>
                <Typography level="body-xs">
                  {formatPhoneNumber(customer.phone)}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Dernière commande effectué le 26/06/2024
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Montant total 120 € (5 commandes)
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  1 commande non respectée
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                ></Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <RowMenuCustomers
                    idOrder={customer.id}
                    onChangeMade={handleChangeMade}
                    openUpdateModal={() => {}}
                  />
                </Box>
              </div>
            </ListItemContent>
            {/* <Chip
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
            </Chip> */}
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
