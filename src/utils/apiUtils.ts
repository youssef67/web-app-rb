import axios from "axios";
import { IFormInput, User } from "@interfaces/interfaces";

export const fetchOrders = async (user: User | null) => {
  const orderList = axios
    .get(`http://localhost:3333/api/v1/order/day-orders?userId=${user?.id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });

  return orderList;
};

export const addOrder = async (data: IFormInput, currentUser: { userId: number; emailUser: string; } |  null, headers: object) => {
  axios
      .post(
        "http://localhost:3333/api/v1/order/add",
        { ...data, ...currentUser },
        { headers }
      )
      .then((res) => {
        return res.data
      })
};
