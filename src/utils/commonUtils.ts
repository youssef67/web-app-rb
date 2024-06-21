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

export const manageFiltersValues = (
  orders: Order[],
  statusFilter: number | null,
  customerFilter: string | null,
  freeFieldFilter: string | null,
): Order[] => {
  let filteredOrders = orders;
  let statusFilterResult;
  let customerFilterResult;
  let freeFieldFilterResult;

  // If no filter is applied, return all orders
  if (
    (!statusFilter || statusFilter === 0) &&
    (!customerFilter || customerFilter === "all") &&
    !freeFieldFilter
  ) {
    return orders;
    // If a filter is applied, filter the orders accordingly
  } else {
    // Filter by status
    if (statusFilter !== null && statusFilter !== 0) {
      statusFilterResult = filteredOrders.filter((order) => order.stateId === statusFilter);

      if (statusFilterResult.length > 0) filteredOrders = statusFilterResult
    }

    // Filter by customer
    if (customerFilter !== null && customerFilter !== "all") {
      const { lastname, firstname } = splitFullName(customerFilter);

      customerFilterResult = filteredOrders.filter((order) =>
        order.customer.name
          .toLowerCase()
          .includes(lastname.toLowerCase() || firstname.toLowerCase())
      );

      if (customerFilterResult.length > 0) filteredOrders = customerFilterResult
    }

    // Filter by free field
    if (freeFieldFilter !== null) {

      freeFieldFilterResult = filteredOrders.filter((order) =>
        Object.values(order.customer).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(freeFieldFilter.toLowerCase())
        )
      );
      
      if (freeFieldFilterResult.length > 0) filteredOrders = freeFieldFilterResult
      else  filteredOrders = []

    }
  }

  return filteredOrders;
};

export const sortOrders = (orders: Order[], typeSorting: string | null): Order[] => {
    const sortedOrders = [...orders];

    // sort by selected typeSorting
    if (typeSorting === "latest") {
      sortedOrders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (typeSorting === "asc-price") {
      sortedOrders.sort((a, b) => parseFloat(a.orderPrice) - parseFloat(b.orderPrice));
    } else if (typeSorting === "desc-price") {
      sortedOrders.sort((a, b) => parseFloat(b.orderPrice) - parseFloat(a.orderPrice));
    } else if (typeSorting === "asc-time") {
      sortedOrders.sort((a, b) => Number(a.pickupTime.replace(":", ".").slice(0, -3)) - Number(b.pickupTime.replace(":", ".").slice(0, -3)));
    } else if (typeSorting === "desc-time") {
      sortedOrders.sort((a, b) => Number(b.pickupTime.replace(":", ".").slice(0, -3)) - Number(a.pickupTime.replace(":", ".").slice(0, -3)));
    }

    return sortedOrders;
  }


export const validatePickupDate = (value: Date | null) => {
  if (!value) {
    return "La date de récupération est obligatoire";
  }
  return true; 
};

export const validatePickupTime = (value: Date | null) => {
  if (!value) {
    return "L'heure de récupération est obligatoire";
  }
  return true; 
};