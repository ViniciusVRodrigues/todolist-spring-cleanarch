package com.vvr.cleanarch.application.usecases;

import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.repositories.TaskRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ListTasksUseCase {

    private final TaskRepository taskRepository;

    public ListTasksUseCase(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> execute(TaskStatus status) {
        List<Task> tasks;

        if (status != null) {
            tasks = taskRepository.findByStatus(status);
        } else {
            tasks = taskRepository.findAll();
        }

        // Return ordered by createdAt descending
        return tasks.stream()
                .sorted(Comparator.comparing(Task::getCreatedAt, 
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }
}
