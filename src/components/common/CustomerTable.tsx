import React, { useState } from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Tooltip from "@mui/joy/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ClearIcon from "@mui/icons-material/Clear";
import ModalClose from "@mui/joy/ModalClose";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Typography from "@mui/joy/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import Checkbox from "@mui/joy/Checkbox";
import Box from "@mui/joy/Box";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";

import { useQueryClient } from "@tanstack/react-query";
import DesktopPagination from "@components/common/DesktopPagination";
import CustomCircularProgress from "@components/common/CustomCircularProgress";
import { CustomerFullData } from "@interfaces/interfaces";
import { formatPhoneNumber, sortOrders } from "@utils/commonUtils";
import RowMenuCustomers from "@components/common/RowMenuCustomers";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface OrderProps {
  customersList: CustomerFullData[];
  uniqueCustomers: string[];
  customerFilter: (value: any) => void;
  freeFieldFilter: (value: any) => void;
  getSortingValue: (value: any) => void;
  numberOfPages: number;
  openUpdateModal: (customerId: number) => void;
}

const OrderTable: React.FC<OrderProps> = ({
  customersList,
  uniqueCustomers,
  customerFilter,
  freeFieldFilter,
  numberOfPages,
  getSortingValue,
  openUpdateModal
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [customerFilterValue, setCustomerFilterValue] = useState<string | null>(
    null
  );
  const [freeFieldFilterValue, setFreeFieldFilterValue] = useState<string>("");
  const queryClient = useQueryClient();
  const [dummyState, setDummyState] = useState(0);
  const [selectedSortValue, setSelectedSortValue] = useState("latest");
  const customersCount = customersList?.length;

  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["customers"] });
    setDummyState(dummyState + 1);
  };

  // Filtering functions
  const handleFilterCustomerChange = (e: any, value: string | null) => {
    setCustomerFilterValue(value);
    customerFilter(value);
  };

  const handleFreeFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFreeFieldFilterValue(e.target.value);
    freeFieldFilter(e.target.value);
  };

  // Clear filter functions
  const handleClearInput = () => {
    setFreeFieldFilterValue("");
    freeFieldFilter("");
  };

  const handleClearAllfilters = () => {
    customerFilter(null);
    freeFieldFilter(null);

    setCustomerFilterValue(null);
    setFreeFieldFilterValue("");
  };

  const getValueSort = (event, sortValue: string) => {
    getSortingValue(sortValue);
    setSelectedSortValue(sortValue);
  };

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>Client</FormLabel>
        <Select
          size="sm"
          placeholder="Filter par client"
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 240,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
          onChange={handleFilterCustomerChange}
          endDecorator={
            <Chip size="sm" color="success" variant="soft">
              {uniqueCustomers.length}
            </Chip>
          }
          value={customerFilterValue && customerFilterValue}
        >
          <Option value="all">Tous</Option>
          {uniqueCustomers.map((customer) => (
            <Option key={customer} value={customer}>
              {customer}
            </Option>
          ))}
        </Select>
      </FormControl>
    </>
  );

  if (customersCount === 0) {
    <CustomCircularProgress />;
  }

  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Rechercher"
          value={freeFieldFilterValue}
          onChange={handleFreeFilterChange}
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          endDecorator={
            freeFieldFilterValue && (
              <IconButton size="sm" variant="plain" onClick={handleClearInput}>
                <ClearIcon />
              </IconButton>
            )
          }
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={handleClearAllfilters}
        >
          <RefreshIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="center">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filtres
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Envoyer
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Recherche</FormLabel>
          <Input
            size="sm"
            placeholder="Rechercher"
            value={freeFieldFilterValue}
            startDecorator={<SearchIcon />}
            onChange={handleFreeFilterChange}
            endDecorator={
              freeFieldFilterValue && (
                <IconButton
                  size="sm"
                  variant="plain"
                  onClick={handleClearInput}
                >
                  <ClearIcon />
                </IconButton>
              )
            }
          />
        </FormControl>
        {renderFilters()}
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={handleClearAllfilters}
          sx={{ ml: 1, alignSelf: "flex-end" }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>
      <>
        <Select
          placeholder=""
          onChange={getValueSort}
          value={selectedSortValue}
          size="sm"
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 240,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
        >
          <Option value="latest">Derniers clients</Option>
          <Option value="asc-cart">Commandes : ordre croissant</Option>
          <Option value="desc-cart">Commande : ordre decroissant</Option>
          <Option value="asc-alpha">Ordre alphabetique : A à Z</Option>
          <Option value="desc-alpha">Ordre alphabetique : Z à A</Option>
        </Select>
      </>

      <Sheet
        className="CustomerTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 140, textAlign: "center", padding: "12px 6px" }}
              >
                Client
              </th>
              <th
                style={{ width: 230, textAlign: "center", padding: "12px 6px" }}
              >
                Téléphone/email
              </th>
              <th
                style={{
                  width: 170,
                  textAlign: "center",
                  padding: "12px 6px",
                  whiteSpace: "nowrap",
                }}
              >
                Dernière commande
              </th>
              <th
                style={{ width: 200, textAlign: "center", padding: "12px 6px" }}
              >
                Commandes
              </th>
              <th style={{ width: 100, padding: "12px 6px" }}></th>
            </tr>
          </thead>
          <tbody>
            {/* {sortOrders(ordersList, selectedSortValue).map((row: Order) => ( */}
            {customersList.map((data: CustomerFullData) => (
              <tr key={data.customer.id}>
                <td style={{ textAlign: "center", width: 140 }}>
                  <Typography level="body-xs">
                    {data.customer.name} {data.customer.lastname}
                  </Typography>
                </td>
                <td style={{ textAlign: "center", width: 230 }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div style={{ textAlign: "center", width: 230 }}>
                      <Typography level="body-xs">
                        {formatPhoneNumber(data.customer.phone)}
                      </Typography>
                      <Typography level="body-xs" sx={{ width: "100%" }}>
                        {data.customer.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td style={{ textAlign: "center", width: 170 }}>
                  <Typography level="body-xs">{data.lastOrderDate}</Typography>
                </td>
                <td style={{ textAlign: "center", width: 200 }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div style={{ textAlign: "center", width: 200 }}>
                      <Typography level="body-xs">
                        Nombre de commande : {data.ordersCount} fois
                      </Typography>
                      <Typography level="body-xs" sx={{ width: "100%" }}>
                        Montant total : {data.totalOrderAmount} €
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <RowMenuCustomers
                      customerId={data.customer.id}
                      onChangeMade={handleChangeMade}
                      openUpdateModal={openUpdateModal}
                    />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <DesktopPagination numberOfPages={numberOfPages} />
    </>
  );
};

export default OrderTable;
