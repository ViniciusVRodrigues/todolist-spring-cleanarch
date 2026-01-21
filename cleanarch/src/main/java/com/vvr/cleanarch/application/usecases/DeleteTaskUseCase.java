package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.exceptions.TaskCannotBeDeletedException;
import com.vvr.cleanarch.domain.exceptions.TaskNotFoundException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;

public class DeleteTaskUseCase {

    private final TaskRepository taskRepository;

    public DeleteTaskUseCase(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public void execute(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.canBeDeleted()) {
            throw new TaskCannotBeDeletedException(taskId);
        }

        taskRepository.deleteById(taskId);
    }
}
