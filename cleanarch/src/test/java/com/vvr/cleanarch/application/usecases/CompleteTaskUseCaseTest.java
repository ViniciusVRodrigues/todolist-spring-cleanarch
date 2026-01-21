package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.exceptions.InvalidTaskException;
import com.vvr.cleanarch.domain.exceptions.TaskNotFoundException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompleteTaskUseCaseTest {

    @Mock
    private TaskRepository taskRepository;

    private CompleteTaskUseCase completeTaskUseCase;

    @BeforeEach
    void setUp() {
        completeTaskUseCase = new CompleteTaskUseCase(taskRepository);
    }

    @Test
    void execute_withPendingTask_completesTask() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.PENDING, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = completeTaskUseCase.execute(1L);

        assertEquals(TaskStatus.COMPLETED, result.getStatus());
        assertNotNull(result.getUpdatedAt());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void execute_withInProgressTask_completesTask() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.IN_PROGRESS, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = completeTaskUseCase.execute(1L);

        assertEquals(TaskStatus.COMPLETED, result.getStatus());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void execute_withAlreadyCompletedTask_throwsInvalidTaskException() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.COMPLETED, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertThrows(InvalidTaskException.class, () -> completeTaskUseCase.execute(1L));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void execute_withCancelledTask_throwsInvalidTaskException() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.CANCELLED, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertThrows(InvalidTaskException.class, () -> completeTaskUseCase.execute(1L));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void execute_withNonExistentTask_throwsTaskNotFoundException() {
        when(taskRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> completeTaskUseCase.execute(999L));
        verify(taskRepository, never()).save(any(Task.class));
    }
}
