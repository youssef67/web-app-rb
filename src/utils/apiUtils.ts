import axios from "axios";
import { IFormInput, User, Order } from "@interfaces/interfaces";

export const fetchOrders = async (user: User): Promise<Order[] | []> => {
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

export const addOrder = async (
  data: IFormInput,
  currentUser: { userId: number; emailUser: string } | null,
  headers: object,
) => {
  axios
    .post(
      `http://localhost:3333/api/v1/order/add`,
      { ...data, ...currentUser },
      { headers }
    )
    .then((res) => {
      return res.data;
    });
};

export const updateOrder = async (
  data: IFormInput,
  headers: object,
  order: Order | undefined
) => {
  axios
    .post(
      `http://localhost:3333/api/v1/order/update`,
      { orderId: order?.id, ...data },
      { headers }
    )
    .then((res) => {
      return res.data;
    });
};

export const fetchUpdateOrder = async (
  orderId: number,
  headers: object,
  action: string
): Promise<void> => {
  axios
    .post(
      `http://localhost:3333/api/v1/order/${action}`,
      { orderId: orderId },
      { headers }
    )
    .then((res) => {
      return res.data;
    });
};


