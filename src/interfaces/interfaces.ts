export interface Order {
  id: number;
  orderPrice: string;
  pickupDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  status: 'confirmed' | 'pending'
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

export type AscOrDesc = "asc" | "desc";

