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
import CustomerTable from "@components/customers/CustomerTable";
import CustomCircularProgress from "@components/common/CustomCircularProgress";
import CustomMessage from "@components/common/CustomMessage";
import CustomModalAddOrder from "@components/orders/CustomModalAddOrder";
import CustomerList from "@components/customers/CustomerList";
import Header from "@components/common/Header";
import CustomModalUpdateCustomer from "@components/customers/CustomModalUpdateCustomer";
import { manageCustomersFiltersValues, getUniqueCustomers } from "@utils/commonUtils";
import { CustomerFullData } from "@interfaces/interfaces";

import { fetchAllCustomers } from "@utils/apiUtils";

const CustomerDashboard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdateCustomerModal, setOpenUpdateCustomerModal] =
    useState<boolean>(false);
    useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerFullData | undefined>(undefined);

  // filters State
  const [customerFilter, setCustomerFilter] = useState<string | null>(null);
  const [freeFieldFilter, setFreeFieldFilter] = useState<string | null>(null);
  const [selectedSortValue, setSelectedSortValue] = useState("latest");
  const [uniqueCustomers, setUniqueCustomers] = useState<string[]>([])
  // Pagination state
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const customersPerPage = 10;
  const [customersForCurrentPage, setCustomersForCurrentPage] = useState<CustomerFullData[]>([]);
  // Hook state
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();
  const { currentPage } = usePagination();

   // to update orders list after adding or updating a new order
   const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["customers"] });
  };

  // to open modal for update order
  const handleUpdateCustomer = (customerId: number) => {
    const customer = customersList?.find((data) => data.customer.id === customerId);
    setSelectedCustomer(customer);
    setOpenUpdateCustomerModal(true);
  };

  const handleFilters = useCallback(
    (customers: CustomerFullData[]) => {
      const filteredCustomers = manageCustomersFiltersValues(
        customers,
        customerFilter,
        freeFieldFilter
      );

      // If no results for the filters, display a original orders list
      if (filteredCustomers.length === 0) {
        return customers;
      } else {
        return filteredCustomers;
      }
    },
    [customerFilter, freeFieldFilter]
  );

  const {
    data: customersList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchAllCustomers(user),
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
    if (customersList) {
      setNumberOfPages(Math.ceil(customersList.length / customersPerPage));
      setUniqueCustomers(getUniqueCustomers(customersList))
    }

    const start = (currentPage - 1) * customersPerPage;

    const end = start + customersPerPage;
    const customers = customersList?.slice(start, end);

    if (customers) setCustomersForCurrentPage(customers);

  }, [currentPage, customersList]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Header />
        <Sidebar currentDashboard="customers" />
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
                Mes clients
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
              Listes des clients
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
              onChangeMade={() => {}}
            />
            <CustomModalUpdateCustomer
              open={openUpdateCustomerModal}
              setOpen={setOpenUpdateCustomerModal}
              onChangeMade={handleChangeMade}
              customerToUpdate={selectedCustomer}
            />
          </Box>

          {isLoading && <CustomCircularProgress />}
          {error && <CustomMessage message={error.message} />}

          {customersList && customersList.length === 0 && (
            <CustomMessage
              message={"Pas encore de clients enregistrés"}
            />
          )}

          {!isLoading && !error && customersList && customersList.length > 0 && (
            <>
              <CustomerTable
                customersList={customersForCurrentPage}
                customerFilter={setCustomerFilter}
                freeFieldFilter={setFreeFieldFilter}
                numberOfPages={numberOfPages}
                openUpdateModal={handleUpdateCustomer}
                getSortingValue={setSelectedSortValue}
                uniqueCustomers={uniqueCustomers}
              />
              <CustomerList
                customersList={customersForCurrentPage}
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                openUpdateModal={handleUpdateCustomer}
                sortingValue={selectedSortValue}
              />
            </>
          )}
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default CustomerDashboard;
