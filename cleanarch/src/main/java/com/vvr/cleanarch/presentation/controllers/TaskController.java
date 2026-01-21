package com.vvr.cleanarch.presentation.controllers;

import com.vvr.cleanarch.application.dto.CreateTaskRequest;
import com.vvr.cleanarch.application.dto.UpdateTaskRequest;
import com.vvr.cleanarch.application.usecases.CompleteTaskUseCase;
import com.vvr.cleanarch.application.usecases.CreateTaskUseCase;
import com.vvr.cleanarch.application.usecases.DeleteTaskUseCase;
import com.vvr.cleanarch.application.usecases.GetTaskByIdUseCase;
import com.vvr.cleanarch.application.usecases.ListTasksUseCase;
import com.vvr.cleanarch.application.usecases.UpdateTaskUseCase;
import com.vvr.cleanarch.domain.entities.Task;
import com.vvr.cleanarch.domain.entities.TaskStatus;
import com.vvr.cleanarch.presentation.dto.TaskResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Tasks", description = "API para gerenciamento de tarefas")
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;
    private final UpdateTaskUseCase updateTaskUseCase;
    private final CompleteTaskUseCase completeTaskUseCase;
    private final ListTasksUseCase listTasksUseCase;
    private final DeleteTaskUseCase deleteTaskUseCase;
    private final GetTaskByIdUseCase getTaskByIdUseCase;

    public TaskController(CreateTaskUseCase createTaskUseCase,
                          UpdateTaskUseCase updateTaskUseCase,
                          CompleteTaskUseCase completeTaskUseCase,
                          ListTasksUseCase listTasksUseCase,
                          DeleteTaskUseCase deleteTaskUseCase,
                          GetTaskByIdUseCase getTaskByIdUseCase) {
        this.createTaskUseCase = createTaskUseCase;
        this.updateTaskUseCase = updateTaskUseCase;
        this.completeTaskUseCase = completeTaskUseCase;
        this.listTasksUseCase = listTasksUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
        this.getTaskByIdUseCase = getTaskByIdUseCase;
    }

    @Operation(
            summary = "Criar nova tarefa",
            description = "Cria uma nova tarefa com título e descrição opcional"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Tarefa criada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content)
    })
    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody CreateTaskRequest request) {
        Task task = createTaskUseCase.execute(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(TaskResponse.from(task));
    }

    @Operation(
            summary = "Listar tarefas",
            description = "Retorna a lista de todas as tarefas. Pode ser filtrada por status."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de tarefas retornada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class)))
    })
    @GetMapping
    public ResponseEntity<List<TaskResponse>> listTasks(
            @Parameter(description = "Filtrar por status da tarefa (PENDING, IN_PROGRESS, COMPLETED)")
            @RequestParam(required = false) TaskStatus status) {
        List<Task> tasks = listTasksUseCase.execute(status);
        List<TaskResponse> responses = tasks.stream()
                .map(TaskResponse::from)
                .toList();
        return ResponseEntity.ok(responses);
    }

    @Operation(
            summary = "Buscar tarefa por ID",
            description = "Retorna os detalhes de uma tarefa específica pelo seu ID"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarefa encontrada",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class))),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id) {
        Task task = getTaskByIdUseCase.execute(id);
        return ResponseEntity.ok(TaskResponse.from(task));
    }

    @Operation(
            summary = "Atualizar tarefa",
            description = "Atualiza o título e/ou descrição de uma tarefa existente"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarefa atualizada com sucesso",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id,
            @Valid @RequestBody UpdateTaskRequest request) {
        Task task = updateTaskUseCase.execute(id, request);
        return ResponseEntity.ok(TaskResponse.from(task));
    }

    @Operation(
            summary = "Completar tarefa",
            description = "Marca uma tarefa como concluída (status = COMPLETED)"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarefa marcada como concluída",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class))),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content)
    })
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TaskResponse> completeTask(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id) {
        Task task = completeTaskUseCase.execute(id);
        return ResponseEntity.ok(TaskResponse.from(task));
    }

    @Operation(
            summary = "Excluir tarefa",
            description = "Remove uma tarefa do sistema. Apenas tarefas com status PENDING podem ser excluídas."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Tarefa excluída com sucesso"),
            @ApiResponse(responseCode = "404", description = "Tarefa não encontrada",
                    content = @Content),
            @ApiResponse(responseCode = "400", description = "Tarefa não pode ser excluída (status diferente de PENDING)",
                    content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @Parameter(description = "ID da tarefa", required = true)
            @PathVariable Long id) {
        deleteTaskUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
