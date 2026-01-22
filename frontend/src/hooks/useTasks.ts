import { useState, useCallback, useEffect } from 'react';
import type { Task, TaskStatus, CreateTaskRequest, UpdateTaskRequest } from '../types';
import { taskService } from '../services';
import type { ApiError } from '../services';
import { useToast, useAlert } from '../contexts';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { showAlert } = useAlert();

  const handleError = useCallback(
    (error: ApiError, defaultMessage: string) => {
      const message = error.message || defaultMessage;
      showAlert('Erro', message);
    },
    [showAlert]
  );

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.listTasks();
      setTasks(data);
    } catch (error) {
      handleError(error as ApiError, 'Erro ao carregar tarefas');
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const createTask = useCallback(
    async (request: CreateTaskRequest): Promise<boolean> => {
      try {
        await taskService.createTask(request);
        showToast('Tarefa criada com sucesso!');
        await fetchTasks();
        return true;
      } catch (error) {
        handleError(error as ApiError, 'Erro ao criar tarefa');
        return false;
      }
    },
    [fetchTasks, showToast, handleError]
  );

  const updateTask = useCallback(
    async (id: number, request: UpdateTaskRequest): Promise<boolean> => {
      try {
        await taskService.updateTask(id, request);
        showToast('Tarefa atualizada com sucesso!');
        await fetchTasks();
        return true;
      } catch (error) {
        handleError(error as ApiError, 'Erro ao atualizar tarefa');
        return false;
      }
    },
    [fetchTasks, showToast, handleError]
  );

  const completeTask = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await taskService.completeTask(id);
        showToast('Tarefa concluída com sucesso!');
        await fetchTasks();
        return true;
      } catch (error) {
        handleError(error as ApiError, 'Erro ao concluir tarefa');
        return false;
      }
    },
    [fetchTasks, showToast, handleError]
  );

  const updateTaskStatus = useCallback(
    async (id: number, status: TaskStatus): Promise<boolean> => {
      try {
        await taskService.updateTaskStatus(id, status);
        showToast('Status atualizado com sucesso!');
        await fetchTasks();
        return true;
      } catch (error) {
        handleError(error as ApiError, 'Erro ao atualizar status');
        return false;
      }
    },
    [fetchTasks, showToast, handleError]
  );

  const deleteTask = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await taskService.deleteTask(id);
        showToast('Tarefa excluída com sucesso!');
        await fetchTasks();
        return true;
      } catch (error) {
        handleError(error as ApiError, 'Erro ao excluir tarefa');
        return false;
      }
    },
    [fetchTasks, showToast, handleError]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    createTask,
    updateTask,
    completeTask,
    updateTaskStatus,
    deleteTask,
    refreshTasks: fetchTasks,
  };
};
