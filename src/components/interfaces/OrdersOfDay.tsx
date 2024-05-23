import { useAuth } from "@hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";


const OrdersOfDay: React.FC = () => {
  const { logout } = useAuth();

  const allCookies = Cookies.get()
  console.log(allCookies)

  const handleLogout = () => {
    logout();
  };

  const handleOrder = () => {
    console.log("validation de la commande")
  }

  return (
    <>
      <div>OrderOfDay</div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleOrder}>Valider une commande</button>
    </>
  );
}

export default OrdersOfDay
