import * as React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { useHeader } from "@hooks/useHeader";

import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import Box from "@mui/joy/Box";

import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";

import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "@utils/sideBarUtils";
import { useQueryClient } from "@tanstack/react-query";
import { usePagination } from "@contexts/PaginationContext";

interface SidebarProps {
  currentDashboard: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentDashboard }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout, user } = useAuth();
  const headers = useHeader();
  const { setCurrentPage } = usePagination();

  const handleLogout = () => {
    axios
      .post("http://localhost:3333/api/v1/auth/logout", {}, { headers })
      .then(() => {
        logout();
      })
      .catch((error) => console.log(error));
  };

  const handleNavigateToDaysOrders = async () => {
    await new Promise<void>((resolve) => {
      queryClient.removeQueries({ queryKey: ["orders"], exact: true });
      resolve();
    });
    setCurrentPage(1);
    navigate("/orders-of-day");
  };

  const handleNavigateToAllOrders = async () => {
    await new Promise<void>((resolve) => {
      queryClient.removeQueries({ queryKey: ["orders"], exact: true });
      resolve();
    });
    setCurrentPage(1);
    navigate("/all-orders");
  };

  const handleNavigateToCustomers = async () => {
    setCurrentPage(1);
    navigate("/customers");
  };

  const handleNavigateToHistory = async () => {
    await new Promise<void>((resolve) => {
      queryClient.removeQueries({ queryKey: ["orders"], exact: true });
      resolve();
    });
    setCurrentPage(1);
    navigate("/history");
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Rabbit butcher</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={currentDashboard === "dayOrders"}
              onClick={handleNavigateToDaysOrders}
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{fontSize: "1.2rem"}}>Aujourd'hui</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={currentDashboard === "allOrders"}
              onClick={handleNavigateToAllOrders}
            >
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{fontSize: "1.2rem"}}>Mes commandes</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={currentDashboard === "customers"}
              onClick={handleNavigateToCustomers}
            >
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{fontSize: "1.2rem"}}>Clients</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={currentDashboard === "history"}
              onClick={handleNavigateToHistory}
            >
              <HistoryRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm" sx={{fontSize: "1.2rem"}}>Historique</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="outlined" size="sm">
          <PersonRoundedIcon />
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="body-xs">{user.email}</Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={handleLogout}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
