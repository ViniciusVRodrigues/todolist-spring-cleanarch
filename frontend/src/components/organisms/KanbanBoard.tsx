import React, { useMemo } from 'react';
import styled from 'styled-components';
import type { Task, TaskStatus } from '../../types';
import { TaskCard } from '../molecules';
import { Spinner, SpinnerContainer } from '../atoms';
import { getStatusColor } from '../../styles';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  gap: 16px;
  min-height: 400px;
  overflow-x: auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(280px, 1fr);
  }
`;

interface ColumnProps {
  $status: TaskStatus;
}

const Column = styled.div<ColumnProps>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 16px;
  border-top: 4px solid ${({ $status, theme }) => getStatusColor($status, theme)};
  display: flex;
  flex-direction: column;
  min-height: 300px;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ColumnTitle = styled.h3<ColumnProps>`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ $status, theme }) => getStatusColor($status, theme)};
`;

const TaskCount = styled.span<ColumnProps>`
  background-color: ${({ $status, theme }) => `${getStatusColor($status, theme)}20`};
  color: ${({ $status, theme }) => getStatusColor($status, theme)};
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
`;

const EmptyColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  text-align: center;
  padding: 20px;
`;

const DropZone = styled.div<{ $isDragOver: boolean; $status: TaskStatus }>`
  min-height: 100px;
  border: 2px dashed ${({ $isDragOver, $status, theme }) =>
    $isDragOver ? getStatusColor($status, theme) : 'transparent'};
  border-radius: 8px;
  background-color: ${({ $isDragOver, $status, theme }) =>
    $isDragOver ? `${getStatusColor($status, theme)}10` : 'transparent'};
  transition: all 0.2s ease;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DraggableCard = styled.div<{ $isDragging: boolean }>`
  cursor: grab;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  transition: opacity 0.2s ease;

  &:active {
    cursor: grabbing;
  }
`;

interface KanbanBoardProps {
  tasks: Task[];
  isLoading: boolean;
  onComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

const columns: { status: TaskStatus; label: string }[] = [
  { status: 'PENDING', label: 'Pendentes' },
  { status: 'IN_PROGRESS', label: 'Em Progresso' },
  { status: 'COMPLETED', label: 'Concluídas' },
  { status: 'CANCELLED', label: 'Canceladas' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  isLoading,
  onComplete,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [draggedTaskId, setDraggedTaskId] = React.useState<number | null>(null);
  const [dragOverStatus, setDragOverStatus] = React.useState<TaskStatus | null>(null);

  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, Task[]> = {
      PENDING: [],
      IN_PROGRESS: [],
      COMPLETED: [],
      CANCELLED: [],
    };

    tasks.forEach((task) => {
      grouped[task.status].push(task);
    });

    return grouped;
  }, [tasks]);

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', taskId.toString());
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverStatus(null);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverStatus(status);
  };

  const handleDragLeave = () => {
    setDragOverStatus(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const task = tasks.find((t) => t.id === taskId);

    if (task && task.status !== newStatus) {
      // Check if status change is allowed
      if (task.status === 'CANCELLED' || task.status === 'COMPLETED') {
        setDraggedTaskId(null);
        setDragOverStatus(null);
        return;
      }
      onStatusChange(taskId, newStatus);
    }

    setDraggedTaskId(null);
    setDragOverStatus(null);
  };

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <BoardContainer>
      {columns.map(({ status, label }) => (
        <Column key={status} $status={status}>
          <ColumnHeader>
            <ColumnTitle $status={status}>{label}</ColumnTitle>
            <TaskCount $status={status}>{tasksByStatus[status].length}</TaskCount>
          </ColumnHeader>
          <DropZone
            $isDragOver={dragOverStatus === status}
            $status={status}
            onDragOver={(e) => handleDragOver(e, status)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, status)}
          >
            {tasksByStatus[status].length === 0 ? (
              <EmptyColumn>Nenhuma tarefa</EmptyColumn>
            ) : (
              <TaskList>
                {tasksByStatus[status].map((task) => (
                  <DraggableCard
                    key={task.id}
                    draggable={task.status !== 'CANCELLED' && task.status !== 'COMPLETED'}
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                    $isDragging={draggedTaskId === task.id}
                  >
                    <TaskCard
                      task={task}
                      onComplete={onComplete}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                    />
                  </DraggableCard>
                ))}
              </TaskList>
            )}
          </DropZone>
        </Column>
      ))}
    </BoardContainer>
  );
};
