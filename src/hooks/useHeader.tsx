import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useHeader = () => {
  const [header, setHeader] = useState({});
  const userConnection = JSON.parse(Cookies.get("userConnection"));

  useEffect(() => {
    setHeader({
      "Content-type": "application/json",
      Authorization: `Bearer ${userConnection.token}`,
    });
  }, []);

  return header;
};
