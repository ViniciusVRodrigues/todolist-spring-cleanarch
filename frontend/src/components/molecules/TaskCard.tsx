import React from 'react';
import styled from 'styled-components';
import type { Task, TaskStatus } from '../../types';
import { Button } from '../atoms';
import { StatusSelect } from './StatusSelect';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
    border-color: ${({ theme }) => theme.colors.primary}40;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  min-width: 120px;
  word-break: break-word;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin-bottom: 16px;
  word-break: break-word;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const DateText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, status: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isCompleted = task.status === 'COMPLETED';
  const isCancelled = task.status === 'CANCELLED';

  const handleStatusChange = (newStatus: TaskStatus) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  return (
    <Card>
      <Header>
        <Title>{task.title}</Title>
        <StatusSelect
          status={task.status}
          onChange={handleStatusChange}
          disabled={!onStatusChange}
        />
      </Header>
      {task.description && <Description>{task.description}</Description>}
      <Footer>
        <DateText>Criado em: {formatDate(task.createdAt)}</DateText>
        <Actions>
          {!isCompleted && !isCancelled && (
            <Button $size="small" $variant="primary" onClick={() => onComplete(task.id)}>
              Concluir
            </Button>
          )}
          {!isCancelled && (
            <Button $size="small" $variant="secondary" onClick={() => onEdit(task)}>
              Editar
            </Button>
          )}
          {!isCompleted && (
            <Button $size="small" $variant="danger" onClick={() => onDelete(task.id)}>
              Excluir
            </Button>
          )}
        </Actions>
      </Footer>
    </Card>
  );
};
