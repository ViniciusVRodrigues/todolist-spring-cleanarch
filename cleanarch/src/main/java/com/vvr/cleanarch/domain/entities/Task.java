package com.vvr.cleanarch.domain.entities;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class Task {

    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Task() {
    }

    public Task(Long id, String title, String description, TaskStatus status,
                LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Business rule: Task can only be completed if status is PENDING or IN_PROGRESS
    public boolean canBeCompleted() {
        return this.status == TaskStatus.PENDING || this.status == TaskStatus.IN_PROGRESS;
    }

    // Business rule: Task is considered overdue if PENDING for more than 7 days
    public boolean isOverdue() {
        if (this.status != TaskStatus.PENDING || this.createdAt == null) {
            return false;
        }
        long daysSinceCreation = ChronoUnit.DAYS.between(this.createdAt, LocalDateTime.now());
        return daysSinceCreation > 7;
    }

    // Business rule: Once CANCELLED, task cannot change status
    public boolean canChangeStatus() {
        return this.status != TaskStatus.CANCELLED;
    }

    // Business rule: Completed tasks cannot be deleted
    public boolean canBeDeleted() {
        return this.status != TaskStatus.COMPLETED;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
