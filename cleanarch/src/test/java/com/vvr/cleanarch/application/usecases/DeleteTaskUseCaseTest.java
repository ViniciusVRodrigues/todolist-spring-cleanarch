package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.exceptions.TaskCannotBeDeletedException;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeleteTaskUseCaseTest {

    @Mock
    private TaskRepository taskRepository;

    private DeleteTaskUseCase deleteTaskUseCase;

    @BeforeEach
    void setUp() {
        deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
    }

    @Test
    void execute_withPendingTask_deletesTask() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.PENDING, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertDoesNotThrow(() -> deleteTaskUseCase.execute(1L));
        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void execute_withCompletedTask_throwsTaskCannotBeDeletedException() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.COMPLETED, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertThrows(TaskCannotBeDeletedException.class, () -> deleteTaskUseCase.execute(1L));
        verify(taskRepository, never()).deleteById(anyLong());
    }

    @Test
    void execute_withNonExistentTask_throwsTaskNotFoundException() {
        when(taskRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(TaskNotFoundException.class, () -> deleteTaskUseCase.execute(999L));
        verify(taskRepository, never()).deleteById(anyLong());
    }

    @Test
    void execute_withInProgressTask_deletesTask() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.IN_PROGRESS, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertDoesNotThrow(() -> deleteTaskUseCase.execute(1L));
        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void execute_withCancelledTask_deletesTask() {
        Task task = new Task(1L, "Title", "Description", TaskStatus.CANCELLED, LocalDateTime.now(), null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        assertDoesNotThrow(() -> deleteTaskUseCase.execute(1L));
        verify(taskRepository, times(1)).deleteById(1L);
    }
}
