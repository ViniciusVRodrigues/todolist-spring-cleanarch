import axios, { AxiosError } from 'axios';
import type { Task, TaskStatus, CreateTaskRequest, UpdateTaskRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiError {
  message: string;
  status?: number;
}

const handleError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const status = error.response?.status;
    throw { message, status } as ApiError;
  }
  throw { message: 'An unexpected error occurred' } as ApiError;
};

export const taskService = {
  async listTasks(status?: TaskStatus): Promise<Task[]> {
    try {
      const params = status ? { status } : {};
      const response = await api.get<Task[]>('/tasks', { params });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async getTaskById(id: number): Promise<Task> {
    try {
      const response = await api.get<Task>(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async createTask(request: CreateTaskRequest): Promise<Task> {
    try {
      const response = await api.post<Task>('/tasks', request);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async updateTask(id: number, request: UpdateTaskRequest): Promise<Task> {
    try {
      const response = await api.put<Task>(`/tasks/${id}`, request);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async completeTask(id: number): Promise<Task> {
    try {
      const response = await api.patch<Task>(`/tasks/${id}/complete`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async deleteTask(id: number): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      return handleError(error);
    }
  },
};
