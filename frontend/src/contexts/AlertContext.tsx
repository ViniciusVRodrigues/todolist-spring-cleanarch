import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
}

interface AlertContextType {
  alert: AlertState;
  showAlert: (title: string, message: string, onClose?: () => void) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: '',
    message: '',
  });
  const onCloseRef = useRef<(() => void) | undefined>(undefined);

  const showAlert = useCallback((title: string, message: string, onClose?: () => void) => {
    onCloseRef.current = onClose;
    setAlert({
      isOpen: true,
      title,
      message,
    });
  }, []);

  const hideAlert = useCallback(() => {
    if (onCloseRef.current) {
      onCloseRef.current();
      onCloseRef.current = undefined;
    }
    setAlert({
      isOpen: false,
      title: '',
      message: '',
    });
  }, []);

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
