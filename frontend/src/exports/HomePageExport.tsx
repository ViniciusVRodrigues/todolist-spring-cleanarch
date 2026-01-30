import React from 'react';
import { ToastProvider, AlertProvider, useToast, useAlert } from '../contexts';
import { HomePage, Toast, Alert } from '../components';

/**
 * HomePage component for Module Federation export.
 * This wrapper includes only Toast and Alert providers for local state.
 * Theme is inherited from the Host application's ThemeProvider.
 */
const HomePageContent: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const { alert, hideAlert } = useAlert();

  return (
    <>
      <HomePage />
      <Toast toasts={toasts} onRemove={removeToast} />
      <Alert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        onClose={hideAlert}
      />
    </>
  );
};

const HomePageExport: React.FC = () => {
  return (
    <ToastProvider>
      <AlertProvider>
        <HomePageContent />
      </AlertProvider>
    </ToastProvider>
  );
};

export default HomePageExport;
