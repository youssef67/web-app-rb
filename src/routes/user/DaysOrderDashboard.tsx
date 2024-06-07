import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationContext";
import { useSnackbar } from "notistack";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import Sidebar from "@components/common/Sidebar";
import OrderTable from "@components/common/OrderTable";
import OrderList from "@components/common/OrderList";
import Header from "@components/common/Header";

import { Order } from '@interfaces/interfaces'



const DaysOrderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ listOfOrders, setListOfOrders ] = useState<Order[] | []>([])
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
      setNotification(null);
    }
  }, [notification, enqueueSnackbar, setNotification]);

  useEffect(() => {
    const fetchOrders = async () => {
      axios
        .get(
          `http://localhost:3333/api/v1/order/day-orders?userId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setListOfOrders(res.data)
        })
        .catch((error) => console.log(error));
    };

    fetchOrders();
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar currentDashboard = "dayOrders" />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="small" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Accueil
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Mes commandes
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Commandes du jour
            </Typography>
            <Button
              color="primary"
              startDecorator={<AddRoundedIcon />}
              size="sm"
              onClick={() => navigate("/add-order")}
            >
              Ajouter une commande
            </Button>
          </Box>
          <OrderTable ordersList={listOfOrders}/>
          <OrderList ordersList={listOfOrders}/>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default DaysOrderDashboard;
