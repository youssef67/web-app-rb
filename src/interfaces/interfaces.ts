export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterFormInputs {
  email: string;
  compagny_name: string;
  siret_number: string;
  password: string;
  confirm_password: string;
}

export interface ResetPasswordFormInputs {
  newPassword: string
  confirmPassword: string
}

export interface Order {
  id: number;
  orderPrice: string;
  pickupDate: string;
  pickupTime: string;
  createdAt: string;
  updatedAt: string;
  detailsForCustomer: string;
  detailsForUser: string;
  userId: number;
  stateId: number;
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
  pickupDate: Date | null;
  pickupTime: Date | null
  detailsForCustomer: string;
  detailsForUser: string;
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
