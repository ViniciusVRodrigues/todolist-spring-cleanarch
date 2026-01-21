package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.exceptions.TaskNotFoundException;
import com.vvr.cleanarch.domain.repositories.TaskRepository;

public class GetTaskByIdUseCase {

    private final TaskRepository taskRepository;

    public GetTaskByIdUseCase(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));
    }
}
