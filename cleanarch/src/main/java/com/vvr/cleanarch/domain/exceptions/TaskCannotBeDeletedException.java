package com.vvr.cleanarch.domain.exceptions;

public class TaskCannotBeDeletedException extends RuntimeException {

    public TaskCannotBeDeletedException(Long id) {
        super("Task with id " + id + " cannot be deleted because it is completed");
    }

    public TaskCannotBeDeletedException(String message) {
        super(message);
    }
}
