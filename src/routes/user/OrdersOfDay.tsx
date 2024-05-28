import { useAuth } from "@hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

const OrdersOfDay: React.FC = () => {
  const { logout } = useAuth();

  const userAccess = JSON.parse(Cookies.get("userConnection"));

  console.log(userAccess.token)

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userAccess.token}`,
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3333/api/v1/auth/logout", {}, { headers })
      .then(() => {
        logout();
      })
      .catch((error) => console.log(error));
  };

  const handleValidateOrder = () => {
    axios
      .get("http://localhost:3333/api/order-validate", { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const handleSendEmail = () => {
    axios
      .get(`http://localhost:3333/api/send-email/${userAccess.id}`, { headers })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>OrderOfDay</div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleValidateOrder}>Valider une commande</button>
      <button onClick={handleSendEmail}>Envoyer un email</button>
    </>
  );
};

export default OrdersOfDay;
