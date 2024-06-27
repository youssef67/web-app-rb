import { Customer, CustomerFullData, Order } from "@interfaces/interfaces";

export const currentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatPhoneNumber = (phoneNumber: string): string | null => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length !== 10) {
    return null
  }

  const formattedNumber = cleaned.match(/.{1,2}/g)?.join(".") ?? "";

  return formattedNumber;
};

export const getFullName = (customer: Customer): string =>
  `${customer.name} ${customer.lastname}`;

export const getUniqueCustomers = (data: Order[] | CustomerFullData[]) => {
  const seen: Record<string, boolean> = {};
  const customersList: string[] = [];

  data.filter((data: Order | CustomerFullData) => {
    const key = `${data.customer.name} ${data.customer.lastname}`;
    if (!seen[key]) {
      seen[key] = true;
      customersList.push(key)
      return true;
    } else {
      return false;
    }
  });

  return customersList.sort((a, b) => a.localeCompare(b))
};

export const splitFullName = (fullName: string) => {
  const [lastname, firstname] = fullName.split(" ");
  return { lastname, firstname };
};

export const manageOrdersFiltersValues = (
  orders: Order[],
  statusFilter: number | null,
  dateFilter: number | null,
  customerFilter: string | null,
  freeFieldFilter: string | null
): Order[] => {
  let filteredOrders = orders;
  let statusFilterResult;
  let dateFilterResult;
  let customerFilterResult;
  let freeFieldFilterResult;

  // If no filter is applied, return all orders
  if (
    (!statusFilter || statusFilter === 0) &&
    (!customerFilter || customerFilter === "all") &&
    (!dateFilter || dateFilter === 0) &&
    !freeFieldFilter
  ) {
    return orders;
    // If a filter is applied, filter the orders accordingly
  } else {
    // Filter by status
    if (statusFilter !== null && statusFilter !== 0) {
      statusFilterResult = filteredOrders.filter(
        (order) => order.stateId === statusFilter
      );

      if (statusFilterResult.length > 0) filteredOrders = statusFilterResult;
    }

    // Filter by date
    if (dateFilter !== null && dateFilter !== 0) {
      const currentDate = new Date();
      const futureDate = new Date();
      // If dateFilter is 1, filter for next 7 days
      if (dateFilter === 1) {
        futureDate.setDate(currentDate.getDate() + 7);
        dateFilterResult = filteredOrders.filter((order) => {
          const orderDate = new Date(order.pickupDate);
          return orderDate >= currentDate && orderDate <= futureDate;
        });
        if (dateFilterResult.length > 0) filteredOrders = dateFilterResult;
      }
      // If dateFilter is 1, filter for next 15 days
      else if (dateFilter === 2) {
        futureDate.setDate(currentDate.getDate() + 15);
        dateFilterResult = filteredOrders.filter(
          (order) =>{
            const orderDate = new Date(order.pickupDate);
            return orderDate >= currentDate && orderDate <= futureDate;
          } 
        );
        if (dateFilterResult.length > 0) filteredOrders = dateFilterResult;
      }
      // If dateFilter is 1, filter for next 7 days
      else if (dateFilter === 3) {
        futureDate.setDate(currentDate.getDate() + 30);
        dateFilterResult = filteredOrders.filter(
          (order) => {
            const orderDate = new Date(order.pickupDate);
            return orderDate >= currentDate && orderDate <= futureDate;
          } 
        );
        if (dateFilterResult.length > 0) filteredOrders = dateFilterResult;
      }
    }

    // Filter by customer
    if (customerFilter !== null && customerFilter !== "all") {
      const { lastname, firstname } = splitFullName(customerFilter);

      customerFilterResult = filteredOrders.filter((order) =>
        order.customer.name
          .toLowerCase()
          .includes(lastname.toLowerCase() || firstname.toLowerCase())
      );

      if (customerFilterResult.length > 0)
        filteredOrders = customerFilterResult;
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

      if (freeFieldFilterResult.length > 0)
        filteredOrders = freeFieldFilterResult;
      else filteredOrders = [];
    }
  }

  return filteredOrders;
};

export const manageCustomersFiltersValues = (
  customers: CustomerFullData[],
  customerFilter: string | null,
  freeFieldFilter: string | null
): CustomerFullData[] => {
  let filteredCustomers = customers;
  let customerFilterResult;
  let freeFieldFilterResult;

  // If no filter is applied, return all orders
  if (
    (!customerFilter || customerFilter === "all") &&
    !freeFieldFilter
  ) {
    return filteredCustomers;
    // If a filter is applied, filter the orders accordingly
  } else {
   
    // Filter by customer
    if (customerFilter !== null && customerFilter !== "all") {
      const { lastname, firstname } = splitFullName(customerFilter);

      customerFilterResult = filteredCustomers.filter((customer) =>
        customer.name
          .toLowerCase()
          .includes(lastname.toLowerCase() || firstname.toLowerCase())
      );

      if (customerFilterResult.length > 0)
        filteredCustomers = customerFilterResult;
    }

    // Filter by free field
    if (freeFieldFilter !== null) {
      freeFieldFilterResult = filteredCustomers.filter((customer) =>
        Object.values(customer).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(freeFieldFilter.toLowerCase())
        )
      );

      if (freeFieldFilterResult.length > 0)
        filteredCustomers = freeFieldFilterResult;
      else filteredCustomers = [];
    }
  }

  return filteredCustomers;
};

export const sortOrders = (
  orders: Order[],
  typeSorting: string | null
): Order[] => {
  const sortedOrders = [...orders];

  // sort by selected typeSorting
  if (typeSorting === "latest") {
    sortedOrders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } else if (typeSorting === "asc-price") {
    sortedOrders.sort(
      (a, b) => parseFloat(a.orderPrice) - parseFloat(b.orderPrice)
    );
  } else if (typeSorting === "desc-price") {
    sortedOrders.sort(
      (a, b) => parseFloat(b.orderPrice) - parseFloat(a.orderPrice)
    );
  } else if (typeSorting === "asc-time") {
    sortedOrders.sort(
      (a, b) =>
        Number(a.pickupTime.replace(":", ".").slice(0, -3)) -
        Number(b.pickupTime.replace(":", ".").slice(0, -3))
    );
  } else if (typeSorting === "desc-time") {
    sortedOrders.sort(
      (a, b) =>
        Number(b.pickupTime.replace(":", ".").slice(0, -3)) -
        Number(a.pickupTime.replace(":", ".").slice(0, -3))
    );
  }

  return sortedOrders;
};

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

export const validatePasswords = (
  password: string,
  confirmationPassword: string
) => {
  if (password !== confirmationPassword) {
    return false;
  }

  return true;
};
