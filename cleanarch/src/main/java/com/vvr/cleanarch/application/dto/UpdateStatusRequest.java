package com.vvr.cleanarch.application.dto;

import com.vvr.cleanarch.domain.entities.TaskStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "Requisição para atualizar o status de uma tarefa")
public class UpdateStatusRequest {

    @Schema(description = "Novo status da tarefa", example = "IN_PROGRESS", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "Status is required")
    private TaskStatus status;

    public UpdateStatusRequest() {
    }

    public UpdateStatusRequest(TaskStatus status) {
        this.status = status;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }
}
