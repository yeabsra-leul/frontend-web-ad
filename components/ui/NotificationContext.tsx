'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

interface NotificationContextProps {
  notify: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const notify = (message: string) => {
    setMessage(message);
    Cookies.set('notification', message);
  };

  useEffect(() => {
    const message = Cookies.get('notification');
    if (message) {
      toast.success(message);
      Cookies.remove('notification');
    }
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};