import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts';

const ToggleContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Icon = styled.span`
  font-size: 20px;
`;

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme} aria-label="Toggle theme">
      <Icon>{isDark ? '☀️' : '🌙'}</Icon>
    </ToggleContainer>
  );
};
