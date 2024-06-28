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

import { CustomerFullData } from "@interfaces/interfaces";
import MobilePagination from "@components/common/MobilePagination";
import { useQueryClient } from "@tanstack/react-query";
import RowMenuCustomers from "@components/customers/RowMenuCustomers";
import { formatPhoneNumber, sortOrders } from "@utils/commonUtils";

interface OrderProps {
  customersList: CustomerFullData[];
  numberOfPages: number;
  currentPage: number;
  sortingValue: string;
  openUpdateModal: (customerId: number) => void;
}

const OrderList: React.FC<OrderProps> = ({
  customersList,
  numberOfPages,
  currentPage,
  openUpdateModal,
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
      {customersList.map((data: CustomerFullData) => (
        <List
          key={data.customer.id}
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
                  {data.customer.name} {data.customer.lastname}
                </Typography>
                <Typography level="body-xs">{data.customer.email}</Typography>
                <Typography level="body-xs">
                  {formatPhoneNumber(data.customer.phone)}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Dernière commande effectué le {data.lastOrderDate}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  Montant total {data.totalOrderAmount} € ({data.ordersCount}{" "}
                  commandes)
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
                    customerId={data.customer.id}
                    onChangeMade={handleChangeMade}
                    openUpdateModal={openUpdateModal}
                  />
                </Box>
              </div>
            </ListItemContent>
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
