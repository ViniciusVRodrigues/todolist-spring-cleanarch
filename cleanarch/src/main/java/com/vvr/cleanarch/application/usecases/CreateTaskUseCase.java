package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.application.dto.CreateTaskRequest;
import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.exceptions.InvalidTaskException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;

import java.time.LocalDateTime;

public class CreateTaskUseCase {

    private final TaskRepository taskRepository;

    public CreateTaskUseCase(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(CreateTaskRequest request) {
        // Validate title is not empty
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new InvalidTaskException("Title is mandatory and cannot be empty");
        }

        Task task = new Task();
        task.setTitle(request.getTitle().trim());
        task.setDescription(request.getDescription());
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }
}
