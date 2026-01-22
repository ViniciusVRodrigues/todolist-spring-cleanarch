import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button } from '../atoms';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  animation: ${fadeIn} 0.2s ease;
`;

const AlertBox = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: ${({ theme }) => theme.shadows.large};
  animation: ${scaleIn} 0.2s ease;
`;

const AlertIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.error}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 28px;
`;

const AlertTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 8px;
`;

const AlertMessage = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <AlertBox onClick={(e) => e.stopPropagation()}>
        <AlertIcon>⚠️</AlertIcon>
        <AlertTitle>{title}</AlertTitle>
        <AlertMessage>{message}</AlertMessage>
        <ButtonContainer>
          <Button $variant="primary" onClick={onClose}>
            Entendido
          </Button>
        </ButtonContainer>
      </AlertBox>
    </Overlay>
  );
};
