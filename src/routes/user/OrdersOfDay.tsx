import React, { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { useHeader } from "@hooks/useHeader";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@contexts/NotificationContext";
import { useSnackbar } from "notistack";

const OrdersOfDay: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { notification, setNotification } = useNotification();
  const theme = useTheme();
  const headers = useHeader();

  console.log("OrdersOfDay : ", user.token)

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
      setNotification(null);
    }
  }, [notification, enqueueSnackbar, setNotification]);

  useEffect(() => {
    console.log()
    const fetchOrders = async () => {
      axios.get(`http://localhost:3333/api/v1/order/day-orders?userId=${user.id}`, { headers : {
         Authorization: `Bearer ${user.token}`,
         "Content-Type": "application/json",
      } }).then((res) => {
        console.log(res.data)
      }).catch((error) => console.log(error))
    }

    fetchOrders()
  }, [])

  const handleLogout = () => {
    console.log(headers)
    axios
      .post("http://localhost:3333/api/v1/auth/logout", {}, { headers })
      .then(() => {
        logout();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid>
          <button onClick={() => navigate("/add-order")}>
            Ajouter une commande
          </button>
          <button onClick={handleLogout}>Logout</button>
        </Grid>
      </Container>
    </div>
  );
};

export default OrdersOfDay;
