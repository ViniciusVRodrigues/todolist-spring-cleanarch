import type { Task, TaskStatus, CreateTaskRequest, UpdateTaskRequest } from '../types';

const STORAGE_KEY = 'todolist_tasks';
const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: 'Estudar Clean Architecture',
    description: 'Revisar conceitos de Clean Architecture no Spring Boot',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: null,
  },
  {
    id: 2,
    title: 'Implementar testes unitários',
    description: 'Criar testes para os casos de uso',
    status: 'IN_PROGRESS',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: 3,
    title: 'Documentar API REST',
    description: 'Adicionar documentação Swagger para todos os endpoints',
    status: 'COMPLETED',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

export interface ApiError {
  message: string;
  status?: number;
}

class MockTaskService {
  private getNextId(): number {
    const tasks = this.getTasks();
    return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  }

  private getTasks(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with default tasks if nothing is stored
      this.saveTasks(INITIAL_TASKS);
      return INITIAL_TASKS;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return INITIAL_TASKS;
    }
  }

  private saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private findTaskById(id: number): Task | undefined {
    return this.getTasks().find((task) => task.id === id);
  }

  private delay(ms: number = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async listTasks(status?: TaskStatus): Promise<Task[]> {
    await this.delay();
    const tasks = this.getTasks();
    if (status) {
      return tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    await this.delay();
    const task = this.findTaskById(id);
    if (!task) {
      throw {
        message: `Task with id ${id} not found`,
        status: 404,
      } as ApiError;
    }
    return task;
  }

  async createTask(request: CreateTaskRequest): Promise<Task> {
    await this.delay();
    
    if (!request.title || request.title.trim() === '') {
      throw {
        message: 'Title is mandatory and cannot be empty',
        status: 400,
      } as ApiError;
    }

    const newTask: Task = {
      id: this.getNextId(),
      title: request.title,
      description: request.description || null,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    const tasks = this.getTasks();
    tasks.push(newTask);
    this.saveTasks(tasks);

    return newTask;
  }

  async updateTask(id: number, request: UpdateTaskRequest): Promise<Task> {
    await this.delay();

    if (!request.title || request.title.trim() === '') {
      throw {
        message: 'Title is mandatory and cannot be empty',
        status: 400,
      } as ApiError;
    }

    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw {
        message: `Task with id ${id} not found`,
        status: 404,
      } as ApiError;
    }

    const task = tasks[taskIndex];

    // Check if task is cancelled (immutable)
    if (task.status === 'CANCELLED') {
      throw {
        message: 'Cannot update a cancelled task',
        status: 422,
      } as ApiError;
    }

    const updatedTask: Task = {
      ...task,
      title: request.title,
      description: request.description || null,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    this.saveTasks(tasks);

    return updatedTask;
  }

  async completeTask(id: number): Promise<Task> {
    await this.delay();

    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw {
        message: `Task with id ${id} not found`,
        status: 404,
      } as ApiError;
    }

    const task = tasks[taskIndex];

    // Check if task is cancelled (immutable)
    if (task.status === 'CANCELLED') {
      throw {
        message: 'Cannot complete a cancelled task',
        status: 422,
      } as ApiError;
    }

    const updatedTask: Task = {
      ...task,
      status: 'COMPLETED',
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    this.saveTasks(tasks);

    return updatedTask;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    await this.delay();

    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw {
        message: `Task with id ${id} not found`,
        status: 404,
      } as ApiError;
    }

    const task = tasks[taskIndex];

    // Check if task is cancelled (immutable)
    if (task.status === 'CANCELLED') {
      throw {
        message: 'Cannot change status of a cancelled task',
        status: 422,
      } as ApiError;
    }

    const updatedTask: Task = {
      ...task,
      status,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    this.saveTasks(tasks);

    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    await this.delay();

    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw {
        message: `Task with id ${id} not found`,
        status: 404,
      } as ApiError;
    }

    const task = tasks[taskIndex];

    // Cannot delete completed tasks
    if (task.status === 'COMPLETED') {
      throw {
        message: 'Cannot delete a completed task',
        status: 422,
      } as ApiError;
    }

    tasks.splice(taskIndex, 1);
    this.saveTasks(tasks);
  }
}

export const mockTaskService = new MockTaskService();
