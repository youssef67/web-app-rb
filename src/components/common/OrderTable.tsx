import React, { useState } from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
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
import Box from "@mui/joy/Box";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";

import { useQueryClient } from "@tanstack/react-query";
import DesktopPagination from "@components/common/DesktopPagination";
import { Order, AscOrDesc } from "@interfaces/interfaces";
import { getComparator, stableSort } from "@utils/orderTableUtils";
import {
  formatPhoneNumber,
  getFullName,
  getUniqueCustomers,
} from "@utils/commonUtils";
import RowMenu from "@components/common/RowMenu";

interface OrderProps {
  ordersList: Order[];
  statusFilter: (value: any) => void;
  customerFilter: (value: any) => void;
  freeFieldFilter: (value: any) => void;
  numberOfPages: number
}

const OrderTable: React.FC<OrderProps> = ({
  ordersList,
  statusFilter,
  customerFilter,
  freeFieldFilter,
  numberOfPages
}) => {
  const [order] = useState<AscOrDesc>("desc");
  const [open, setOpen] = useState(false);
  const [customerFilterValue, setCustomerFilterValue] = useState<string | null>(null);
  const [statusFilterValue, setStatusFilterValue] = useState<number | null>(null);
  const [freeFieldFilterValue, setFreeFieldFilterValue] = useState<string>("");
  const queryClient = useQueryClient();
  const [dummyState, setDummyState] = useState(0);
  const orderCount = ordersList?.length;

  const handleChangeMade = async () => {
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    setDummyState(dummyState + 1);
  };

  // Filtering functions
  const handleFilterStatusChange = (e: any, value: number | null) => {
    setStatusFilterValue(value);
    statusFilter(value);
  };

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
    statusFilter(0);
    customerFilter(null);
    freeFieldFilter(null);

    setStatusFilterValue(null);
    setCustomerFilterValue(null);
    setFreeFieldFilterValue("");
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Statut</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrer par statut"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          onChange={handleFilterStatusChange}
          value={statusFilterValue}
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
          <Option value={0}>Tous</Option>
          <Option value={1}>Commande confirmée</Option>
          <Option value={2}>Commande non confirmée</Option>
        </Select>
      </FormControl>
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
              {getUniqueCustomers(ordersList).length}
            </Chip>
          }
          value={customerFilterValue && customerFilterValue}
        >
          <Option value="all">Tous</Option>
          {getUniqueCustomers(ordersList).map((order) => (
            <Option key={order.id} value={getFullName(order.customer)}>
              {getFullName(order.customer)}
            </Option>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );

  if (orderCount === 0) {
    return <div>Il n'y a pas de commande prévue pour aujourd'hui</div>;
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
          <FormLabel>Recherche sur l'ensemble des champs</FormLabel>
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
      <Sheet
        className="OrderTableContainer"
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
                Heure de retrait
              </th>
              <th
                style={{ width: 140, textAlign: "center", padding: "12px 6px" }}
              >
                Montant
              </th>
              <th
                style={{ width: 130, textAlign: "center", padding: "12px 6px" }}
              >
                Statut
              </th>
              <th
                style={{ width: 240, textAlign: "center", padding: "12px 6px" }}
              >
                client
              </th>
              <th
                style={{ width: 200, textAlign: "center", padding: "12px 6px" }}
              >
                numéro de téléphone
              </th>
              <th style={{ width: 50, padding: "12px 6px" }}></th>
            </tr>
          </thead>
          <tbody>
            {stableSort(ordersList, getComparator(order, "id")).map(
              (row: Order) => (
                <tr key={row.id}>
                  <td style={{ textAlign: "center", width: 140 }}>
                    <Typography level="body-xs">10H00</Typography>
                  </td>
                  <td style={{ textAlign: "center", width: 140 }}>
                    <Typography level="body-xs">{row.orderPrice} €</Typography>
                  </td>
                  <td style={{ textAlign: "center", width: 130 }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          1: <CheckRoundedIcon />,
                          2: <BlockIcon />,
                        }[row.stateId]
                      }
                      color={
                        {
                          1: "success",
                          2: "danger",
                        }[row.stateId] as ColorPaletteProp
                      }
                    >
                      {row.stateId === 1 ? "confirmé" : "non confirmé "}
                    </Chip>
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <div style={{ textAlign: "center", width: 240 }}>
                        <Typography level="body-xs">
                          {row.customer.name} {row.customer.lastname}
                        </Typography>
                        <Typography level="body-xs">
                          {row.customer.email}
                        </Typography>
                      </div>
                    </Box>
                  </td>
                  <td style={{ textAlign: "center", width: 120 }}>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Typography
                        level="body-xs"
                        style={{ textAlign: "center", width: 240 }}
                      >
                        {formatPhoneNumber(row.customer.phone)}
                      </Typography>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <RowMenu
                        idOrder={row.id}
                        onChangeMade={handleChangeMade}
                      />
                    </Box>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Sheet>
      <DesktopPagination numberOfPages={numberOfPages}/>
    </>
  );
};

export default OrderTable;
