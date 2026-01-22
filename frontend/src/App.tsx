import React from 'react';
import { ThemeProvider, ToastProvider, AlertProvider, useToast, useAlert } from './contexts';
import { GlobalStyles } from './styles';
import { HomePage, Toast, Alert } from './components';

const AppContent: React.FC = () => {
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

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AlertProvider>
          <AppContent />
        </AlertProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
