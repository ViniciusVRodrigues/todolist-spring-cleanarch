package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.application.dto.UpdateTaskRequest;
import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.exceptions.InvalidTaskException;
import com.vvr.cleanarch.domain.exceptions.TaskNotFoundException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;

import java.time.LocalDateTime;

public class UpdateTaskUseCase {

    private final TaskRepository taskRepository;

    public UpdateTaskUseCase(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(Long taskId, UpdateTaskRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.canChangeStatus()) {
            throw new InvalidTaskException("Cancelled tasks cannot be updated");
        }

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }
}
