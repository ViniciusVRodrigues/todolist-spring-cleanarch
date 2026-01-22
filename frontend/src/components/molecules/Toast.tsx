import React from 'react';
import styled, { keyframes } from 'styled-components';
import type { ToastMessage } from '../../contexts';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled.div<{ type: 'success' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background-color: ${({ type, theme }) =>
    type === 'success' ? theme.colors.success : theme.colors.primary};
  color: white;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.large};
  animation: ${slideIn} 0.3s ease;
  min-width: 250px;
  max-width: 400px;

  &.exiting {
    animation: ${slideOut} 0.3s ease forwards;
  }
`;

const ToastIcon = styled.span`
  font-size: 18px;
`;

const ToastText = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.8;
  padding: 0;
  line-height: 1;

  &:hover {
    opacity: 1;
  }
`;

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} type={toast.type}>
          <ToastIcon>{toast.type === 'success' ? '✓' : 'ℹ'}</ToastIcon>
          <ToastText>{toast.message}</ToastText>
          <CloseButton onClick={() => onRemove(toast.id)}>×</CloseButton>
        </ToastItem>
      ))}
    </ToastContainer>
  );
};
