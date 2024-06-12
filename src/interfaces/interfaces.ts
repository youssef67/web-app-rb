export interface Order {
  id: number;
  orderPrice: string;
  pickupDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  stateId: number
  customerId: number;
  customer: Customer;
}

export interface Customer {
  createdAt: string;
  email: string;
  id: number;
  lastname: string;
  name: string;
  phone: string;
  updatedAt: string;
}

export interface IFormInput {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  amount: number;
  pickupDate: string;
}

export interface ModalAddOrderProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface User {
  email: string;
  id: number;
  token: string;
}

export type AscOrDesc = "asc" | "desc";

