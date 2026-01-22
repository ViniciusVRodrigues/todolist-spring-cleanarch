import React from 'react';
import styled from 'styled-components';
import type { TaskStatus } from '../../types';

const SelectWrapper = styled.div`
  position: relative;
`;

interface StyledSelectProps {
  $status: TaskStatus;
}

const getStatusColor = (status: TaskStatus, theme: { colors: { pending: string; inProgress: string; completed: string; cancelled: string } }) => {
  switch (status) {
    case 'PENDING':
      return theme.colors.pending;
    case 'IN_PROGRESS':
      return theme.colors.inProgress;
    case 'COMPLETED':
      return theme.colors.completed;
    case 'CANCELLED':
      return theme.colors.cancelled;
    default:
      return theme.colors.pending;
  }
};

const StyledSelect = styled.select<StyledSelectProps>`
  appearance: none;
  background-color: ${({ $status, theme }) => `${getStatusColor($status, theme)}20`};
  color: ${({ $status, theme }) => getStatusColor($status, theme)};
  border: 1px solid ${({ $status, theme }) => `${getStatusColor($status, theme)}40`};
  border-radius: 20px;
  padding: 4px 28px 4px 10px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ $status, theme }) => getStatusColor($status, theme)};
  }

  &:focus {
    outline: none;
    border-color: ${({ $status, theme }) => getStatusColor($status, theme)};
    box-shadow: 0 0 0 2px ${({ $status, theme }) => `${getStatusColor($status, theme)}30`};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SelectArrow = styled.span<StyledSelectProps>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ $status, theme }) => getStatusColor($status, theme)};
  font-size: 10px;
`;

interface StatusSelectProps {
  status: TaskStatus;
  onChange: (status: TaskStatus) => void;
  disabled?: boolean;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pendente' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'COMPLETED', label: 'Concluído' },
  { value: 'CANCELLED', label: 'Cancelado' },
];

export const StatusSelect: React.FC<StatusSelectProps> = ({
  status,
  onChange,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as TaskStatus);
  };

  // Disabled statuses that cannot be changed from
  const isFinalStatus = status === 'CANCELLED' || status === 'COMPLETED';

  return (
    <SelectWrapper>
      <StyledSelect
        value={status}
        onChange={handleChange}
        $status={status}
        disabled={disabled || isFinalStatus}
      >
        {statusOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </StyledSelect>
      <SelectArrow $status={status}>▼</SelectArrow>
    </SelectWrapper>
  );
};
