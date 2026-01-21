package com.vvr.cleanarch.infrastructure.persistence;

import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.domain.repositories.TaskRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class TaskRepositoryImpl implements TaskRepository {

    private final JpaTaskRepository jpaTaskRepository;
    private final TaskMapper taskMapper;

    public TaskRepositoryImpl(JpaTaskRepository jpaTaskRepository, TaskMapper taskMapper) {
        this.jpaTaskRepository = jpaTaskRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    public Task save(Task task) {
        TaskEntity entity = taskMapper.toEntity(task);
        TaskEntity savedEntity = jpaTaskRepository.save(entity);
        return taskMapper.toDomain(savedEntity);
    }

    @Override
    public Optional<Task> findById(Long id) {
        return jpaTaskRepository.findById(id)
                .map(taskMapper::toDomain);
    }

    @Override
    public List<Task> findAll() {
        return jpaTaskRepository.findAll().stream()
                .map(taskMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Task> findByStatus(TaskStatus status) {
        return jpaTaskRepository.findByStatus(status).stream()
                .map(taskMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaTaskRepository.deleteById(id);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaTaskRepository.existsById(id);
    }
}
