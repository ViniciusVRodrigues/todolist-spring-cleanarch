package com.vvr.cleanarch.domain.entities;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class TaskTest {

    @Test
    void canBeCompleted_whenStatusIsPending_returnsTrue() {
        Task task = new Task();
        task.setStatus(TaskStatus.PENDING);
        
        assertTrue(task.canBeCompleted());
    }

    @Test
    void canBeCompleted_whenStatusIsInProgress_returnsTrue() {
        Task task = new Task();
        task.setStatus(TaskStatus.IN_PROGRESS);
        
        assertTrue(task.canBeCompleted());
    }

    @Test
    void canBeCompleted_whenStatusIsCompleted_returnsFalse() {
        Task task = new Task();
        task.setStatus(TaskStatus.COMPLETED);
        
        assertFalse(task.canBeCompleted());
    }

    @Test
    void canBeCompleted_whenStatusIsCancelled_returnsFalse() {
        Task task = new Task();
        task.setStatus(TaskStatus.CANCELLED);
        
        assertFalse(task.canBeCompleted());
    }

    @Test
    void isOverdue_whenPendingForMoreThan7Days_returnsTrue() {
        Task task = new Task();
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now().minusDays(8));
        
        assertTrue(task.isOverdue());
    }

    @Test
    void isOverdue_whenPendingForLessThan7Days_returnsFalse() {
        Task task = new Task();
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now().minusDays(5));
        
        assertFalse(task.isOverdue());
    }

    @Test
    void isOverdue_whenStatusIsNotPending_returnsFalse() {
        Task task = new Task();
        task.setStatus(TaskStatus.COMPLETED);
        task.setCreatedAt(LocalDateTime.now().minusDays(10));
        
        assertFalse(task.isOverdue());
    }

    @Test
    void canChangeStatus_whenStatusIsCancelled_returnsFalse() {
        Task task = new Task();
        task.setStatus(TaskStatus.CANCELLED);
        
        assertFalse(task.canChangeStatus());
    }

    @Test
    void canChangeStatus_whenStatusIsNotCancelled_returnsTrue() {
        Task task = new Task();
        task.setStatus(TaskStatus.PENDING);
        
        assertTrue(task.canChangeStatus());
    }

    @Test
    void canBeDeleted_whenStatusIsCompleted_returnsFalse() {
        Task task = new Task();
        task.setStatus(TaskStatus.COMPLETED);
        
        assertFalse(task.canBeDeleted());
    }

    @Test
    void canBeDeleted_whenStatusIsNotCompleted_returnsTrue() {
        Task task = new Task();
        task.setStatus(TaskStatus.PENDING);
        
        assertTrue(task.canBeDeleted());
    }
}
