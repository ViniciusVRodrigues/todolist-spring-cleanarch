package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.application.dto.CreateTaskRequest;
import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.exceptions.InvalidTaskException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateTaskUseCaseTest {

    @Mock
    private TaskRepository taskRepository;

    private CreateTaskUseCase createTaskUseCase;

    @BeforeEach
    void setUp() {
        createTaskUseCase = new CreateTaskUseCase(taskRepository);
    }

    @Test
    void execute_withValidRequest_createsTask() {
        CreateTaskRequest request = new CreateTaskRequest("Test Title", "Test Description");
        
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task task = invocation.getArgument(0);
            task.setId(1L);
            return task;
        });

        Task result = createTaskUseCase.execute(request);

        assertNotNull(result);
        assertEquals("Test Title", result.getTitle());
        assertEquals("Test Description", result.getDescription());
        assertEquals(TaskStatus.PENDING, result.getStatus());
        assertNotNull(result.getCreatedAt());
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void execute_withNullTitle_throwsInvalidTaskException() {
        CreateTaskRequest request = new CreateTaskRequest(null, "Description");

        assertThrows(InvalidTaskException.class, () -> createTaskUseCase.execute(request));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void execute_withEmptyTitle_throwsInvalidTaskException() {
        CreateTaskRequest request = new CreateTaskRequest("", "Description");

        assertThrows(InvalidTaskException.class, () -> createTaskUseCase.execute(request));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void execute_withBlankTitle_throwsInvalidTaskException() {
        CreateTaskRequest request = new CreateTaskRequest("   ", "Description");

        assertThrows(InvalidTaskException.class, () -> createTaskUseCase.execute(request));
        verify(taskRepository, never()).save(any(Task.class));
    }

    @Test
    void execute_withNullDescription_createsTask() {
        CreateTaskRequest request = new CreateTaskRequest("Title", null);
        
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task task = invocation.getArgument(0);
            task.setId(1L);
            return task;
        });

        Task result = createTaskUseCase.execute(request);

        assertNotNull(result);
        assertEquals("Title", result.getTitle());
        assertNull(result.getDescription());
        verify(taskRepository, times(1)).save(any(Task.class));
    }
}
