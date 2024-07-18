import React, { useState } from "react";

import { ColorPaletteProp } from "@mui/joy/styles";
import Chip from "@mui/joy/Chip";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListDivider from "@mui/joy/ListDivider";
import Box from "@mui/joy/Box";

import { CustomerFullData } from "@interfaces/interfaces";
import MobilePagination from "@components/common/MobilePagination";
import { useQueryClient } from "@tanstack/react-query";
import RowMenuCustomers from "@components/customers/RowMenuCustomers";
import { formatPhoneNumber } from "@utils/commonUtils";

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
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        1: <InsertEmoticonIcon />,
                        2: <MoodBadIcon />,
                        3: <SentimentNeutralIcon />,
                      }[data.notation]
                    }
                    color={
                      {
                        1: "success",
                        2: "danger",
                        3: "success",
                      }[data.notation] as ColorPaletteProp
                    }
                  >
                    {data.customer.name} {data.customer.lastname}
                  </Chip>
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
                {data.notation >= 2 ? (
                  <Typography level="body-xs">
                    No show : {data.nbOfNoShowOrder} fois
                  </Typography>
                ) : null}
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
