import styled, { css } from 'styled-components';
import type { TaskStatus } from '../../types';

interface BadgeProps {
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

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $status, theme }) => {
    const color = getStatusColor($status, theme);
    return css`
      background-color: ${color}20;
      color: ${color};
    `;
  }}
`;

export const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case 'PENDING':
      return 'Pendente';
    case 'IN_PROGRESS':
      return 'Em Progresso';
    case 'COMPLETED':
      return 'Concluído';
    case 'CANCELLED':
      return 'Cancelado';
    default:
      return status;
  }
};
