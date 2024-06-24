import axios, { AxiosResponse } from "axios";
// const { login } = useAuth();
import {
  IFormInput,
  User,
  Order,
  LoginFormInputs,
  RegisterFormInputs,
  ResetPasswordFormInputs,
} from "@interfaces/interfaces";

export const loginApiCallResult = async (
  data: LoginFormInputs
): Promise<AxiosResponse<any, any>> => {
  const loginResponse = axios
    .post("http://localhost:3333/api/v1/auth/login", data)
    .then((res) => {
      return res;
    });

  return loginResponse;
};

export const registerApiCallResult = async (
  data: RegisterFormInputs
): Promise<AxiosResponse<any, any>> => {
  const registerResponse = axios
    .post("http://localhost:3333/api/v1/auth/register", data)
    .then((res) => {
      return res;
    });

  return registerResponse;
};

export const passwordForgottenApiCallResult = async (data: {
  email: string;
}): Promise<AxiosResponse<any, any>> => {
  const passwordForgottenApiCallResult = axios
    .post("http://localhost:3333/api/v1/user/forgot-password", data)
    .then((res) => {
      if (res) {
        return res;
      } else {
        throw new Error("absence de token");
      }
    });

  return passwordForgottenApiCallResult;
};

export const resetPasswordApiCallResult = async (
  data: ResetPasswordFormInputs,
  token: string | null
): Promise<AxiosResponse<any, any>> => {
  const resetPasswordApiCallResult = axios.post(
    `http://localhost:3333/api/v1/user/reset-password?token=${token}`,
    {
      newPassword: data.newPassword,
    }
  );

  return resetPasswordApiCallResult;
};

export const activateUserApiCallResult = async (email: string | null, token: string | null): Promise<AxiosResponse<any, any>> => {
  const activateUserApiCallResult = axios
  .post("http://localhost:3333/api/v1/user/activate", {
    token: token,
    email: email,
  })
  
  return activateUserApiCallResult;
}

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
  headers: object
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
