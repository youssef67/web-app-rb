import { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import Cookies from "js-cookie";


interface AuthContextType {
  user: any;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage<any>("user", null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data.email);

    const contentCookies = {
      id: data.id,
      email: data.email,
      token: data.token.token
    }

    const expirationDays = 90;
    const secureCookies = import.meta.env.VITE_SECURE_COOKIES === "true";

    Cookies.set("userConnection", JSON.stringify(contentCookies), {
      secure: secureCookies,
      sameSite: "strict",
      expires: expirationDays,
    });
    
    navigate("/orders-of-day");
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('userConnection');
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be use within an AuthProvider");
  }
  return context;
};
