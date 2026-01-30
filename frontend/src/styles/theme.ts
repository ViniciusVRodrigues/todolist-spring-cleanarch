export interface Theme {
  name: 'light' | 'dark';
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    background: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    error: string;
    warning: string;
    pending: string;
    inProgress: string;
    completed: string;
    cancelled: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

import type { TaskStatus } from '../types';

export const getStatusColor = (status: TaskStatus, theme: Theme): string => {
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

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#FF6B35',
    primaryHover: '#E55A25',
    primaryLight: '#FFF0EB',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceHover: '#F0F1F2',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    pending: '#3B82F6',
    inProgress: '#F59E0B',
    completed: '#10B981',
    cancelled: '#6B7280',
  },
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
};


