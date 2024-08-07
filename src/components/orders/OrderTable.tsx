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
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";

import { useQueryClient } from "@tanstack/react-query";
import DesktopPagination from "@components/common/DesktopPagination";
import CustomCircularProgress from "@components/common/CustomCircularProgress";
import ActionsButtonGroup from "@components/common/ActionsButtonGroup";
import { Order } from "@interfaces/interfaces";
import { formatPhoneNumber, sortOrders } from "@utils/commonUtils";
import RowMenuOrders from "@components/orders/RowMenuOrders";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface OrderProps {
  componentCallBy: string;
  ordersList: Order[];
  uniqueCustomers: string[];
  statusFilter: (value: any) => void;
  customerFilter: (value: any) => void;
  dateFilter: (value: any) => void;
  freeFieldFilter: (value: any) => void;
  getSortingValue: (value: any) => void;
  numberOfPages: number;
  openUpdateModal: (orderId: number) => void;
  setSelected?: (value: any) => void;
  selected?: number[];
  handleActionsButton?: (value: string) => void;
}

const OrderTable: React.FC<OrderProps> = ({
  componentCallBy,
  ordersList,
  uniqueCustomers,
  statusFilter,
  customerFilter,
  dateFilter,
  freeFieldFilter,
  numberOfPages,
  openUpdateModal,
  getSortingValue,
  setSelected,
  selected,
  handleActionsButton,
}) => {
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState<number[]>([]);
  const [customerFilterValue, setCustomerFilterValue] = useState<string | null>(
    null
  );
  const [statusFilterValue, setStatusFilterValue] = useState<number | null>(
    null
  );
  const [dateFilterValue, setDateFilterValue] = useState<number | null>(null);
  const [freeFieldFilterValue, setFreeFieldFilterValue] = useState<string>("");
  const queryClient = useQueryClient();
  const [dummyState, setDummyState] = useState(0);
  const [selectedSortValue, setSelectedSortValue] = useState("latest");
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

  const handleFilterDateChange = (e: any, value: number | null) => {
    setDateFilterValue(value);
    dateFilter(value);
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
    dateFilter(0);
    customerFilter(null);
    freeFieldFilter(null);

    setStatusFilterValue(null);
    setDateFilterValue(null);
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
        <FormLabel sx={{ fontSize: "1.1rem" }}>Statut</FormLabel>
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
          <Option value={0} sx={{ fontSize: "1.1rem" }}>
            Tous
          </Option>
          <Option value={1} sx={{ fontSize: "1.1rem" }}>
            Commande confirmée
          </Option>
          <Option value={2} sx={{ fontSize: "1.1rem" }}>
            Commande non confirmée
          </Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel sx={{ fontSize: "1.1rem" }}>Client</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrer par client"
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
      {componentCallBy === "allOrders" ? (
        <FormControl size="sm">
          <FormLabel sx={{ fontSize: "1.1rem" }}>Date</FormLabel>
          <Select
            size="sm"
            placeholder="Filtrer par date"
            slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
            onChange={handleFilterDateChange}
            value={dateFilterValue}
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
            <Option value={0} sx={{ fontSize: "1rem" }}>
              Tous
            </Option>
            <Option value={1} sx={{ fontSize: "1rem" }}>
              7 prochains jours
            </Option>
            <Option value={2} sx={{ fontSize: "1rem" }}>
              15 prochains jours
            </Option>
            <Option value={3} sx={{ fontSize: "1rem" }}>
              30 prochains jours
            </Option>
          </Select>
        </FormControl>
      ) : null}
    </>
  );

  if (orderCount === 0) {
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
          sx={{ flexGrow: 1, fontSize: "1.1rem" }}
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
            <Typography id="filter-modal" level="h2" sx={{ fontSize: "1rem" }}>
              Filtres
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button
                color="primary"
                onClick={() => setOpen(false)}
                sx={{ fontSize: "1rem" }}
              >
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
          <FormLabel sx={{ fontSize: "1rem" }}>Recherche</FormLabel>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 2,
        }}
      >
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
          <Option value="latest" sx={{ fontSize: "1rem" }}>
            Derniers arrivées
          </Option>
          <Option value="asc-price" sx={{ fontSize: "1rem" }}>
            Prix : ordre croissant
          </Option>
          <Option value="desc-price" sx={{ fontSize: "1rem" }}>
            Prix : ordre decroissant
          </Option>
          <Option value="asc-time" sx={{ fontSize: "1rem" }}>
            Heure : plus tot
          </Option>
          <Option value="desc-time" sx={{ fontSize: "1rem" }}>
            Heure : plus tard
          </Option>
        </Select>
        {handleActionsButton && (
          <ActionsButtonGroup
            handleAction={handleActionsButton}
            selected={selected}
          />
        )}
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
              {selected && setSelected && (
                <th
                  style={{
                    width: 48,
                    textAlign: "center",
                    padding: "12px 6px",
                  }}
                >
                  <Checkbox
                    size="sm"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length !== ordersList.length
                    }
                    checked={selected.length === ordersList.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked
                          ? ordersList.map((row) => row.id)
                          : []
                      );
                    }}
                    color={
                      selected.length > 0 ||
                      selected.length === ordersList.length
                        ? "primary"
                        : undefined
                    }
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </th>
              )}

              <th
                style={{
                  width: 140,
                  textAlign: "center",
                  padding: "12px 6px",
                  fontSize: "1rem",
                }}
              >
                {componentCallBy === "daysOrders"
                  ? "Heure de retrait"
                  : "Date/Heure"}
              </th>
              <th
                style={{
                  width: 140,
                  textAlign: "center",
                  padding: "12px 6px",
                  fontSize: "1rem",
                }}
              >
                Montant
              </th>
              <th
                style={{
                  width: 170,
                  textAlign: "center",
                  padding: "12px 6px",
                  fontSize: "1rem",
                }}
              >
                Statut
              </th>
              <th
                style={{
                  width: 240,
                  textAlign: "center",
                  padding: "12px 6px",
                  fontSize: "1rem",
                }}
              >
                Client
              </th>
              <th
                style={{
                  width: 200,
                  textAlign: "center",
                  padding: "12px 6px",
                  fontSize: "1rem",
                }}
              >
                Numéro de téléphone
              </th>
              {componentCallBy !== "historyOrders" ? (
                <th
                  style={{ width: 120, padding: "12px 6px", fontSize: "1rem" }}
                ></th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {sortOrders(ordersList, selectedSortValue).map((row: Order) => (
              <tr key={row.id}>
                {selected && setSelected && (
                  <td
                    style={{ textAlign: "center", width: 48, fontSize: "1rem" }}
                  >
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row.id)}
                      color={selected.includes(row.id) ? "primary" : undefined}
                      onChange={(event) => {
                        setSelected((ids: any[]) =>
                          event.target.checked
                            ? ids.concat(row.id)
                            : ids.filter((itemId: number) => itemId !== row.id)
                        );
                      }}
                      slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                      sx={{ verticalAlign: "text-bottom" }}
                    />
                  </td>
                )}

                <td style={{ textAlign: "center", width: 140 }}>
                  {componentCallBy === "daysOrders" ? (
                    <Typography level="body-xs" sx={{ fontSize: "1rem" }}>
                      {row.pickupTime.replace(":", "H").slice(0, -3)}
                    </Typography>
                  ) : (
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <div style={{ textAlign: "center", width: 240 }}>
                        <Typography level="body-xs" sx={{ fontSize: "1rem" }}>
                          {format(new Date(row.pickupDate), "dd/MM/yyyy", {
                            locale: fr,
                          })}
                        </Typography>
                        <Typography level="body-xs" sx={{ fontSize: "1rem" }}>
                          {row.pickupTime.replace(":", "H").slice(0, -3)}
                        </Typography>
                      </div>
                    </Box>
                  )}
                </td>
                <td style={{ textAlign: "center", width: 140 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      level="body-xs"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                      }}
                    >
                      <Tooltip
                        title={
                          row.detailsForUser
                            ? row.detailsForUser
                            : "Aucune information"
                        }
                        variant="solid"
                        placement="right"
                      >
                        <InfoIcon sx={{ fontSize: "1.2rem", marginRight: 1 }} />
                      </Tooltip>
                      {row.orderPrice} €
                    </Typography>
                  </Box>
                </td>
                <td style={{ textAlign: "center", width: 170 }}>
                  <Chip
                    variant="soft"
                    size="sm"
                    sx={{ fontSize: "1rem" }}
                    startDecorator={
                      {
                        1: <CheckRoundedIcon />,
                        2: <BlockIcon />,
                        3: <ThumbUpIcon />,
                        4: <ThumbDownIcon />,
                        5: <CloseIcon />,
                      }[row.stateId]
                    }
                    color={
                      {
                        1: "success",
                        2: "danger",
                        3: "success",
                        4: "danger",
                        5: "warning",
                      }[row.stateId] as ColorPaletteProp
                    }
                  >
                    {{
                      1: "confirmé",
                      2: "non confirmé",
                      3: "commande récupérée",
                      4: "commande non récupérée",
                      5: "commande annulée",
                    }[row.stateId] || ""}
                  </Chip>
                </td>
                <td>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                          {
                            1: <InsertEmoticonIcon />,
                            2: <SentimentNeutralIcon />,
                            3: <MoodBadIcon />,
                          }[row.customer.notations?.[0]?.notation ?? 0]
                        }
                        color={
                          {
                            1: "success",
                            2: "warning",
                            3: "danger",
                          }[
                            row.customer.notations?.[0]?.notation ?? 0
                          ] as ColorPaletteProp
                        }
                      >
                        <Typography level="body-xs" sx={{ fontSize: "1rem" }}>
                          {row.customer.name} {row.customer.lastname}
                        </Typography>
                      </Chip>
                      <Typography level="body-xs" sx={{ fontSize: "1rem" }}>
                        {row.customer.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Typography
                      level="body-xs"
                      style={{
                        textAlign: "center",
                        width: 240,
                        fontSize: "1rem",
                      }}
                    >
                      {formatPhoneNumber(row.customer.phone) ??
                        "Pas de numéro disponible"}
                    </Typography>
                  </Box>
                </td>
                {componentCallBy !== "historyOrders" ? (
                  <td>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        width: 108,
                      }}
                    >
                      <RowMenuOrders
                        idOrder={row.id}
                        onChangeMade={handleChangeMade}
                        openUpdateModal={openUpdateModal}
                      />
                    </Box>
                  </td>
                ) : null}
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
