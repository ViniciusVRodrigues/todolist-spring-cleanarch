import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`;
