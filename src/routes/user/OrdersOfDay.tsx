import { useAuth } from "@hooks/useAuth";
import { useHeader } from "@hooks/useHeader";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";

import CreateOrderForm from "@components/orders/CreateOrderForm";

const OrdersOfDay: React.FC = () => {
  const { logout } = useAuth();
  const theme = useTheme();
  const headers = useHeader();

  const handleLogout = () => {
    axios
      .post("http://localhost:3333/api/v1/auth/logout", {}, { headers })
      .then(() => {
        logout();
      })
      .catch((error) => console.log(error));
  };

  // const handleValidateOrder = () => {
  //   axios
  //     .get("http://localhost:3333/api/order-validate", { headers })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const handleSendEmail = () => {
  //   axios
  //     .get(`http://localhost:3333/api/send-email/${userAccess.id}`, { headers })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div
      style={{
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Container>
        <Grid>
          <CreateOrderForm/>
        </Grid>
        <button onClick={handleLogout}>Logout</button>
        {/* <button onClick={handleValidateOrder}>Valider une commande</button>
    <button onClick={handleSendEmail}>Envoyer un email</button>  */}
      </Container>
    </div>
  );
};

export default OrdersOfDay;
