import React, { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  message: string;
  variant: "default" | "error" | "success" | "warning" | "info";
}

interface NotificationContextType {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used with a NotificationProvider");
  }

  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [notification, setNotification] = useState<Notification | null>(null)

    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}
