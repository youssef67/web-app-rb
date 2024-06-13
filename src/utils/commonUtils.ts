import { Customer, Order } from "@interfaces/interfaces";

export const currentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length !== 10) {
    throw new Error(
      "Le numéro de téléphone doit contenir exactement 10 chiffres."
    );
  }

  const formattedNumber = cleaned.match(/.{1,2}/g)?.join(".") ?? "";

  return formattedNumber;
};

export const getFullName = (customer: Customer): string =>
  `${customer.name} ${customer.lastname}`;

export const getUniqueCustomers = (ordersList: Order[]) => {
  const seen: Record<string, boolean> = {};
  
  return ordersList.filter((order: Order) => {
    const key = `${order.customer.name}-${order.customer.lastname}`;
    if (!seen[key]) {
      seen[key] = true;
      return true;
    } else {
      return false;
    }
  });
};

export const splitFullName = (fullName: string) => {
  const [lastname, firstname] = fullName.split(" ");
  return { lastname, firstname };
};
