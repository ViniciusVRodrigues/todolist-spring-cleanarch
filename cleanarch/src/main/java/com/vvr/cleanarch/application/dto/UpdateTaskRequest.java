package com.vvr.cleanarch.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Requisição para atualizar uma tarefa existente")
public class UpdateTaskRequest {

    @Schema(description = "Novo título da tarefa", example = "Estudar Clean Architecture", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be at most 100 characters")
    private String title;

    @Schema(description = "Nova descrição da tarefa", example = "Implementar um projeto seguindo os princípios de Clean Architecture")
    @Size(max = 500, message = "Description must be at most 500 characters")
    private String description;

    public UpdateTaskRequest() {
    }

    public UpdateTaskRequest(String title, String description) {
        this.title = title;
        this.description = description;
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
}
