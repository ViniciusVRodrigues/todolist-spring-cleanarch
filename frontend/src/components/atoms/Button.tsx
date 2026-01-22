import styled, { css } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;

  ${({ $size = 'medium' }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: 6px 12px;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 14px 24px;
          font-size: 18px;
        `;
      default:
        return css`
          padding: 10px 18px;
          font-size: 16px;
        `;
    }
  }}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.surfaceHover};
          }
        `;
      case 'danger':
        return css`
          background-color: ${theme.colors.error};
          color: white;

          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: ${theme.colors.text};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.surface};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryHover};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
