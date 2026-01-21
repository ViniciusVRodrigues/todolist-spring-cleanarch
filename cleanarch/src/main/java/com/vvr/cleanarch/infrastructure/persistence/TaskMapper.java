package com.vvr.cleanarch.infrastructure.persistence;

import com.vvr.cleanarch.domain.entities.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public Task toDomain(TaskEntity entity) {
        if (entity == null) {
            return null;
        }
        return new Task(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getStatus(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }

    public TaskEntity toEntity(Task task) {
        if (task == null) {
            return null;
        }
        return new TaskEntity(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
