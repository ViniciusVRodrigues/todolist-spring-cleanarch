package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.application.dto.UpdateTaskRequest;
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
class UpdateTaskUseCaseTest {

    @Mock
    private TaskRepository taskRepository;

    private UpdateTaskUseCase updateTaskUseCase;

    @BeforeEach
    void setUp() {
        updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    }

    @Test
    void execute_withPendingTask_updatesTask() {
        Task task = new Task(1L, "Old Title", "Old Description", TaskStatus.PENDING, LocalDateTime.now(), null);
        UpdateTaskRequest request = new UpdateTaskRequest("New Title", "New Description");
        
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = updateTaskUseCase.execute(1L, request);

        assertEquals("New Title", result.getTitle());
        assertEquals("New Description", result.getDescription());
        assertNotNull(result.getUpdatedAt());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void execute_withInProgressTask_updatesTask() {
        Task task = new Task(1L, "Old Title", "Old Description", TaskStatus.IN_PROGRESS, LocalDateTime.now(), null);
        UpdateTaskRequest request = new UpdateTaskRequest("New Title", "New Description");
        
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = updateTaskUseCase.execute(1L, request);

        assertEquals("New Title", result.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void execute_withCompletedTask_updatesTask() {
        Task task = new Task(1L, "Old Title", "Old Description", TaskStatus.COMPLETED, LocalDateTime.now(), null);
        UpdateTaskRequest request = new UpdateTaskRequest("New Title", "New Description");
        
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = updateTaskUseCase.execute(1L, request);

        assertEquals("New Title", result.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void execute_withCancelledTask_throwsInvalidTaskException() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.CANCELLED, LocalDateTime.now(), null);
        UpdateTaskRequest request = new UpdateTaskRequest("New Title", "New Description");
        
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertThrows(InvalidTaskException.class, () -> updateTaskUseCase.execute(1L, request));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void execute_withNonExistentTask_throwsTaskNotFoundException() {
        UpdateTaskRequest request = new UpdateTaskRequest("New Title", "New Description");
        when(taskRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> updateTaskUseCase.execute(999L, request));
        verify(taskRepository, never()).save(any(Task.class));
    }
}
