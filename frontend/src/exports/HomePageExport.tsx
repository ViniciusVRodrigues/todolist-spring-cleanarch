import React from 'react';
import styled from 'styled-components';
import { ThemeProvider, ToastProvider, AlertProvider, useToast, useAlert } from '../contexts';
import { GlobalStyles } from '../styles';
import { HomePage, Toast, Alert } from '../components';

/**
 * Container that ensures the light theme is applied to this component
 * even when loaded via Module Federation in a Host with different styles.
 */
const ThemeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
`;

/**
 * Self-sufficient HomePage component for Module Federation export.
 * This wrapper includes all necessary providers (Theme, Toast, Alert)
 * so it can be used independently in a Host application.
 */
const HomePageContent: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const { alert, hideAlert } = useAlert();

  return (
    <ThemeContainer>
      <GlobalStyles />
      <HomePage />
      <Toast toasts={toasts} onRemove={removeToast} />
      <Alert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        onClose={hideAlert}
      />
    </ThemeContainer>
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
