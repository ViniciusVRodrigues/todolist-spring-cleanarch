import React from 'react';
import styled from 'styled-components';
import type { TaskStatus } from '../../types';
import { Button } from '../atoms';

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

interface FilterButtonProps {
  $active: boolean;
}

const FilterButton = styled(Button)<FilterButtonProps>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.text)};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};

  &:hover:not(:disabled) {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primaryHover : theme.colors.surfaceHover};
  }
`;

interface StatusFilterProps {
  currentStatus: TaskStatus | null;
  onStatusChange: (status: TaskStatus | null) => void;
}

const statusOptions: { value: TaskStatus | null; label: string }[] = [
  { value: null, label: 'Todos' },
  { value: 'PENDING', label: 'Pendentes' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'COMPLETED', label: 'Concluídos' },
  { value: 'CANCELLED', label: 'Cancelados' },
];

export const StatusFilter: React.FC<StatusFilterProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <FilterContainer>
      {statusOptions.map(({ value, label }) => (
        <FilterButton
          key={label}
          $size="small"
          $active={currentStatus === value}
          onClick={() => onStatusChange(value)}
        >
          {label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};
