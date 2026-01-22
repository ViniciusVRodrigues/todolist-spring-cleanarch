package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.application.dto.UpdateStatusRequest;
import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.exceptions.InvalidTaskException;
import com.vvr.cleanarch.domain.exceptions.TaskNotFoundException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;

import java.time.LocalDateTime;

public class UpdateStatusUseCase {

    private final TaskRepository taskRepository;

    public UpdateStatusUseCase(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(Long taskId, UpdateStatusRequest request) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.canChangeStatus()) {
            throw new InvalidTaskException("Cancelled tasks cannot change status");
        }

        // Additional rule: Completed tasks cannot change to other statuses
        if (task.getStatus() == TaskStatus.COMPLETED) {
            throw new InvalidTaskException("Completed tasks cannot change status");
        }

        task.setStatus(request.getStatus());
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }
}
