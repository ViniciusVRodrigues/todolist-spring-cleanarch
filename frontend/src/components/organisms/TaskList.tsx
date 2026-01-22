import React from 'react';
import styled from 'styled-components';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from '../molecules';
import { Spinner, SpinnerContainer } from '../atoms';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
`;

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, status: TaskStatus) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onComplete,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>📝</EmptyIcon>
        <EmptyTitle>Nenhuma tarefa encontrada</EmptyTitle>
        <EmptyDescription>
          Crie uma nova tarefa para começar a organizar suas atividades.
        </EmptyDescription>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ListContainer>
  );
};
