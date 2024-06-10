import axios from "axios";

interface User {
  email: string;
  id: number;
  token: string;
}

export const fetchOrders = async (user: User | null) => {
  const orderList = axios
    .get(`http://localhost:3333/api/v1/order/day-orders?userId=${user?.id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })

    return orderList
};
