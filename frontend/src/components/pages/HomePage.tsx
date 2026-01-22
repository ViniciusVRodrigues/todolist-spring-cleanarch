import React, { useState } from 'react';
import styled from 'styled-components';
import type { Task } from '../../types';
import { MainLayout } from '../templates';
import { TaskList } from '../organisms';
import { Modal, TaskForm, StatusFilter } from '../molecules';
import { Button } from '../atoms';
import { useTasks } from '../../hooks';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const FilterSection = styled.div`
  margin-bottom: 24px;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
  display: block;
`;

export const HomePage: React.FC = () => {
  const {
    tasks,
    isLoading,
    statusFilter,
    setStatusFilter,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
  } = useTasks();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (title: string, description: string) => {
    setIsSubmitting(true);
    const success = await createTask({ title, description: description || undefined });
    setIsSubmitting(false);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleEditTask = async (title: string, description: string) => {
    if (!editingTask) return;
    setIsSubmitting(true);
    const success = await updateTask(editingTask.id, {
      title,
      description: description || undefined,
    });
    setIsSubmitting(false);
    if (success) {
      setIsEditModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  return (
    <MainLayout>
      <PageHeader>
        <PageTitle>Minhas Tarefas</PageTitle>
        <Button onClick={() => setIsCreateModalOpen(true)}>+ Nova Tarefa</Button>
      </PageHeader>

      <FilterSection>
        <FilterLabel>Filtrar por status:</FilterLabel>
        <StatusFilter currentStatus={statusFilter} onStatusChange={setStatusFilter} />
      </FilterSection>

      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onComplete={completeTask}
        onEdit={handleOpenEdit}
        onDelete={deleteTask}
      />

      <Modal
        isOpen={isCreateModalOpen}
        title="Nova Tarefa"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          submitLabel="Criar Tarefa"
          isLoading={isSubmitting}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} title="Editar Tarefa" onClose={handleCloseEdit}>
        {editingTask && (
          <TaskForm
            initialTitle={editingTask.title}
            initialDescription={editingTask.description || ''}
            onSubmit={handleEditTask}
            onCancel={handleCloseEdit}
            submitLabel="Salvar Alterações"
            isLoading={isSubmitting}
          />
        )}
      </Modal>
    </MainLayout>
  );
};
