import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useNotification } from "@contexts/NotificationContext";
import { usePagination } from "@contexts/PaginationContext";

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
import OrderTable from "@components/orders/OrderTable";
import CustomCircularProgress from "@components/common/CustomCircularProgress";
import CustomMessage from "@components/common/CustomMessage";
import OrderList from "@components/orders/OrderList";
import Header from "@components/common/Header";
import CustomModalAddOrder from "@components/orders/CustomModalAddOrder";
import CustomModalUpdateOrder from "@components/orders/CustomModalUpdateOrder";
import { manageOrdersFiltersValues, getUniqueCustomers } from "@utils/commonUtils";
import { Order } from "@interfaces/interfaces";

import { fetchOrdersHistory } from "@utils/apiUtils";

const HistoryDashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateOrderModal, setOpenUpdateOrderModal] =
    useState<boolean>(false);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  // filters State
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [dateFilter, setDateFilter] = useState<number | null>(null);
  const [customerFilter, setCustomerFilter] = useState<string | null>(null);
  const [freeFieldFilter, setFreeFieldFilter] = useState<string | null>(null);
  const [selectedSortValue, setSelectedSortValue] = useState("latest");
  const [uniqueCustomers, setUniqueCustomers] = useState<string[]>([])
  // Pagination state
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const ordersPerPage = 10;
  const [ordersForCurrentPage, setOrdersForCurrentPage] = useState<Order[]>([]);
  // Hook state
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();
  const { currentPage, setCurrentPage } = usePagination();

  // to update orders list after adding or updating a new order
  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  // to open modal for update order
  const handleUpdateOrder = (orderId: number) => {
    const order = ordersList?.find((order) => order.id === orderId);
    setOrder(order);
    setOpenUpdateOrderModal(true);
  };

  const handleFilters = useCallback(
    (orders: Order[]) => {
      const filteredOrders = manageOrdersFiltersValues(
        orders,
        statusFilter,
        dateFilter,
        customerFilter,
        freeFieldFilter
      );

      // If no results for the filters, display a original orders list
      if (filteredOrders.length === 0) {
        return orders;
      } else {
        return filteredOrders;
      }
    },
    [statusFilter, dateFilter, customerFilter, freeFieldFilter]
  );

  const {
    data: ordersList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrdersHistory(user),
    select: (data) => handleFilters(data),
  });

  // Necessary to manage notifications
  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
      setNotification(null);
    }
  }, [notification, enqueueSnackbar, setNotification]);

  useEffect(() => {
    if (ordersList) {
      setNumberOfPages(Math.ceil(ordersList.length / ordersPerPage));
      setUniqueCustomers(getUniqueCustomers(ordersList))
    }

    let start = (currentPage - 1) * ordersPerPage;

    // this code is to manage the pagination when filter gave us less than the previous list orders
    if (ordersList) {
      if (start >= ordersList.length) {
        setCurrentPage(1)
        start = 0
      }
    }
    const end = start + ordersPerPage;
    const orders = ordersList?.slice(start, end);

    if (orders) setOrdersForCurrentPage(orders);

  }, [currentPage, ordersList, setCurrentPage]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Header />
        <Sidebar currentDashboard="history" />
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
            height: "100vh",
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
                Historique
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
              Historique des commandes
            </Typography>
            <Button
              variant="solid"
              color="primary"
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
            <CustomModalUpdateOrder
              open={openUpdateOrderModal}
              setOpen={setOpenUpdateOrderModal}
              onChangeMade={handleChangeMade}
              orderToUpdate={order}
            />
          </Box>

          {isLoading && <CustomCircularProgress />}
          {error && <CustomMessage message={error.message} />}

          {ordersList && ordersList.length === 0 && (
            <CustomMessage
              message={"Pas de commandes enregistrées"}
            />
          )}

          {!isLoading && !error && ordersList && ordersList.length > 0 && (
            <>
              <OrderTable
                componentCallBy="historyOrders"
                ordersList={ordersForCurrentPage}
                statusFilter={setStatusFilter}
                customerFilter={setCustomerFilter}
                dateFilter={setDateFilter}
                freeFieldFilter={setFreeFieldFilter}
                numberOfPages={numberOfPages}
                openUpdateModal={handleUpdateOrder}
                getSortingValue={setSelectedSortValue}
                uniqueCustomers={uniqueCustomers}
              />
              <OrderList
                componentCallBy="historyOrders"
                ordersList={ordersForCurrentPage}
                openUpdateModal={handleUpdateOrder}
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                sortingValue={selectedSortValue}
              />
            </>
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default HistoryDashboard;
