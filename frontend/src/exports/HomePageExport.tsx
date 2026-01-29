import React from 'react';
import { ThemeProvider, ToastProvider, AlertProvider, useToast, useAlert } from '../contexts';
import { GlobalStyles } from '../styles';
import { HomePage, Toast, Alert } from '../components';

/**
 * Self-sufficient HomePage component for Module Federation export.
 * This wrapper includes all necessary providers (Theme, Toast, Alert)
 * so it can be used independently in a Host application.
 */
const HomePageContent: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const { alert, hideAlert } = useAlert();

  return (
    <>
      <GlobalStyles />
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
    <ThemeProvider>
      <ToastProvider>
        <AlertProvider>
          <HomePageContent />
        </AlertProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default HomePageExport;
