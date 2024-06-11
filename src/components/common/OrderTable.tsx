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
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import Box from "@mui/joy/Box";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { Order, AscOrDesc } from "@interfaces/interfaces";
import { getComparator, stableSort } from "@utils/orderTableUtils";

interface OrderProps {
  ordersList: Order[];
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Valider</MenuItem>
        <MenuItem>Annuler</MenuItem>
      </Menu>
    </Dropdown>
  );
}

const OrderTable: React.FC<OrderProps> = ({ ordersList }) => {
  const [order] = useState<AscOrDesc>("desc");
  const [open, setOpen] = useState(false);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Statut</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrer par statut"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Commande validé</Option>
          <Option value="pending">Commande non validé</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Client</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="Tous">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
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
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
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
        {renderFilters()}
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
                Date
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
                    <Typography level="body-xs">{row.pickupDate}</Typography>
                  </td>
                  <td style={{ textAlign: "center", width: 140 }}>
                    <Typography level="body-xs">{row.orderPrice}</Typography>
                  </td>
                  <td style={{ textAlign: "center", width: 130 }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          confirmed: <CheckRoundedIcon />,
                          pending: <BlockIcon />,
                        }[row.status]
                      }
                      color={
                        {
                          confirmed: "success",
                          pending: "danger",
                        }[row.status] as ColorPaletteProp
                      }
                    >
                      {row.status}
                    </Chip>
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <div style={{ textAlign: "center", width: 240 }}>
                        <Typography level="body-xs">
                          {row.customer.name}
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
                        {row.customer.phone}
                      </Typography>
                    </Box>
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <RowMenu />
                    </Box>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Précédent
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Suivant
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default OrderTable;
