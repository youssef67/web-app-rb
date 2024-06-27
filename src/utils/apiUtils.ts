import axios, { AxiosResponse } from "axios";
// const { login } = useAuth();
import {
  IFormInputOrder,
  IFormInputCustomer,
  User,
  Order,
  CustomerFullData,
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

// Function to fetch orders for a daysOrdersDashboard
export const fetchDaysOrders = async (user: User): Promise<Order[] | []> => {
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

// Function to fetch all orders 
export const fetchAllOrders = async (user: User): Promise<Order[] | []> => {
  const orderList = axios
    .get(`http://localhost:3333/api/v1/order/all-orders?userId=${user?.id}`, {
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
  data: IFormInputOrder,
  currentUser: { userId: number; emailUser: string } | null,
  headers: object
) => {
  try {
    const response = await axios.post(
      `http://localhost:3333/api/v1/order/add`,
      { ...data, ...currentUser},
      { headers}
    )
    return response.data
  } catch (error) {
    console.log("Une erreur s'est produite lors de l'ajout de la commande")
    throw new Error("Une erreur s'est produite lors de l'ajout de la commande")
  }
};

export const updateOrder = async (
  data: IFormInputOrder,
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

export const fetchAllCustomers = async (user: User): Promise<CustomerFullData[] | []> => {
  const customersList = axios
    .get(`http://localhost:3333/api/v1/customer/all-customers?userId=${user?.id}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });

  return customersList;
};

export const updateCustomer = async (
  data: IFormInputCustomer,
  headers: object,
  customer: CustomerFullData | undefined
) => {
  axios
    .post(
      `http://localhost:3333/api/v1/order/update`,
      { customerId: customer?.customer.id, ...data },
      { headers }
    )
    .then((res) => {
      return res.data;
    });
};
