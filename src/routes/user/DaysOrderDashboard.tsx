import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useNotification } from "@contexts/NotificationContext";
import { useSnackbar } from "notistack";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Add from "@mui/icons-material/Add";
import Box from "@mui/joy/Box";

import Sidebar from "@components/common/Sidebar";
import OrderTable from "@components/common/OrderTable";
import OrderList from "@components/common/OrderList";
import Header from "@components/common/Header";
import CustomModalAddOrder from "@components/orders/CustomModalAddOrder";
import { currentDate, splitFullName } from "@utils/commonUtils";
import { Order } from "@interfaces/interfaces";

import { fetchOrders } from "@utils/apiUtils";

const DaysOrderDashboard: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();
  const [dummyState, setDummyState] = useState(0); // État inutile pour forcer le re-render

  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    setDummyState(dummyState + 1);
  };

  const handleFilters = useCallback(
    (orders: Order[]) => {
      let filteredOrders = orders;
      if (
        (!statusFilter || statusFilter === 0) &&
        (!customerFilter || customerFilter === "all")
      ) {
        return orders;
      } else {
        if (statusFilter !== null && statusFilter !== 0) {
          console.log("else status");
          filteredOrders = orders.filter(
            (order) => order.stateId === statusFilter
          );
        }

        if (customerFilter !== null && customerFilter !== "all") {
          const { lastname, firstname } = splitFullName(customerFilter);

          filteredOrders = filteredOrders.filter((order) =>
            order.customer.name
              .toLowerCase()
              .includes(lastname.toLowerCase() || firstname.toLowerCase())
          );
        }
      }

      if (filteredOrders.length === 0) {
        setNotification({
          message: "Aucun résultat pour ces filtres.",
          variant: "error",
        });

        return orders;
      } else {
        return filteredOrders;
      }
    },
    [statusFilter, customerFilter]
  );

  const {
    data: ordersList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(user),
    select: handleFilters,
  });

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
      setNotification(null);
    }
  }, [notification, enqueueSnackbar, setNotification]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        {/* <Sidebar currentDashboard="dayOrders" /> */}
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
              Commandes du {currentDate()}
            </Typography>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<Add />}
              onClick={() => setOpen(true)}
            >
              Ajouter une commande
            </Button>
            <CustomModalAddOrder
              open={open}
              setOpen={setOpen}
              onChangeMade={handleChangeMade}
            />
          </Box>
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error.message}</div>}
          {!isLoading && !error && ordersList && (
            <>
              <OrderTable
                ordersList={ordersList}
                statusFilter={setStatusFilter}
                customerFilter={setCustomerFilter}
              />
              <OrderList ordersList={ordersList} />
            </>
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default DaysOrderDashboard;
