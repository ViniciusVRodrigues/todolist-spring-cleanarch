package com.vvr.cleanarch.config;

import com.vvr.cleanarch.application.usecases.CompleteTaskUseCase;
import com.vvr.cleanarch.application.usecases.CreateTaskUseCase;
import com.vvr.cleanarch.application.usecases.DeleteTaskUseCase;
import com.vvr.cleanarch.application.usecases.GetTaskByIdUseCase;
import com.vvr.cleanarch.application.usecases.ListTasksUseCase;
import com.vvr.cleanarch.application.usecases.UpdateTaskUseCase;
import com.vvr.cleanarch.domain.repositories.TaskRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {

    @Bean
    public CreateTaskUseCase createTaskUseCase(TaskRepository taskRepository) {
        return new CreateTaskUseCase(taskRepository);
    }

    @Bean
    public UpdateTaskUseCase updateTaskUseCase(TaskRepository taskRepository) {
        return new UpdateTaskUseCase(taskRepository);
    }

    @Bean
    public CompleteTaskUseCase completeTaskUseCase(TaskRepository taskRepository) {
        return new CompleteTaskUseCase(taskRepository);
    }

    @Bean
    public ListTasksUseCase listTasksUseCase(TaskRepository taskRepository) {
        return new ListTasksUseCase(taskRepository);
    }

    @Bean
    public DeleteTaskUseCase deleteTaskUseCase(TaskRepository taskRepository) {
        return new DeleteTaskUseCase(taskRepository);
    }

    @Bean
    public GetTaskByIdUseCase getTaskByIdUseCase(TaskRepository taskRepository) {
        return new GetTaskByIdUseCase(taskRepository);
    }
}
