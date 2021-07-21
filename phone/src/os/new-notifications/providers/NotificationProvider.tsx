import React, { createContext } from 'react';
import { SnackbarProvider } from 'notistack';

const NotiCtx = createContext(null);

export const NotificationProvider: React.FC = ({ children }) => {
  return (
    <SnackbarProvider domRoot="phone-screen-node">
      <NotiCtx.Provider value={{}}>{children}</NotiCtx.Provider>
    </SnackbarProvider>
  );
};
