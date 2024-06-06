import React from "react";
import { useAuth } from "@hooks/useAuth";
import { useHeader } from "@hooks/useHeader";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateOrderForm from "@components/orders/CreateOrderForm";

const OrdersOfDay: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <div
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid>
          <CreateOrderForm />
        </Grid>
        <button onClick={() => navigate("/orders-of-day")}>Annuler</button>
      </Container>
    </div>
  );
};

export default OrdersOfDay;
