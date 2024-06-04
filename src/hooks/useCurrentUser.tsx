import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useCurrentUser = (): { userId: number; emailUser: string } | null => {
  const [user, setUser] = useState<{ userId: number; emailUser: string } | null>(null);
  const userConnection = JSON.parse(Cookies.get("userConnection"));

  useEffect(() => {
    setUser({
      userId: userConnection.id,
      emailUser: userConnection.email,
    });
  }, []);

  return user;
};
