# 📝 To-Do List API - Spring Boot com Clean Architecture

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.1-brightgreen)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-blue)

Uma API REST para gerenciamento de tarefas (To-Do List) construída com Spring Boot seguindo os princípios da **Clean Architecture**. Este projeto demonstra a separação clara de responsabilidades entre camadas, facilitando a manutenção, testabilidade e evolução do código.

## 🏗️ Arquitetura do Projeto

O projeto segue os princípios da Clean Architecture, organizando o código em camadas bem definidas:

```
cleanarch/
├── domain/                    # Camada de Domínio (regras de negócio)
│   ├── entities/             # Entidades de domínio (Task, TaskStatus)
│   ├── repositories/         # Interfaces dos repositórios
│   └── exceptions/           # Exceções de domínio
│
├── application/              # Camada de Aplicação (casos de uso)
│   ├── usecases/            # Casos de uso da aplicação
│   │   ├── CreateTaskUseCase
│   │   ├── UpdateTaskUseCase
│   │   ├── CompleteTaskUseCase
│   │   ├── ListTasksUseCase
│   │   ├── DeleteTaskUseCase
│   │   └── GetTaskByIdUseCase
│   └── dto/                 # DTOs da camada de aplicação
│
├── infrastructure/           # Camada de Infraestrutura
│   └── persistence/         # Implementação de persistência
│       ├── TaskEntity       # Entidade JPA
│       ├── TaskRepositoryImpl
│       ├── JpaTaskRepository
│       └── TaskMapper
│
├── presentation/            # Camada de Apresentação
│   ├── controllers/        # Controllers REST
│   └── dto/               # DTOs da API
│
└── config/                 # Configurações
    └── UseCaseConfig       # Beans dos casos de uso
```

### 🎯 Princípios Aplicados

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Inversão de Dependências**: Camadas externas dependem de abstrações definidas nas camadas internas
- **Regras de Negócio no Domínio**: Lógica de negócio concentrada na camada de domínio
- **Independência de Frameworks**: Lógica de negócio independente do Spring

## 🚀 Tecnologias Utilizadas

- **Java 21** - Linguagem de programação
- **Spring Boot 4.0.1** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Validation** - Validação de dados
- **H2 Database** - Banco de dados em memória
- **Lombok** - Redução de código boilerplate
- **Gradle** - Gerenciamento de dependências

## 📋 Funcionalidades

A API oferece as seguintes funcionalidades para gerenciamento de tarefas:

- ✅ **Criar tarefa** - Cria uma nova tarefa com título e descrição
- 📄 **Listar tarefas** - Lista todas as tarefas ou filtra por status
- 🔍 **Buscar tarefa** - Busca uma tarefa específica por ID
- ✏️ **Atualizar tarefa** - Atualiza título, descrição ou status de uma tarefa
- ✔️ **Completar tarefa** - Marca uma tarefa como completa
- 🗑️ **Deletar tarefa** - Remove uma tarefa (exceto as completadas)

### 📊 Status de Tarefas

As tarefas podem ter os seguintes status: 

- `PENDING` - Tarefa pendente (status inicial)
- `IN_PROGRESS` - Tarefa em progresso
- `COMPLETED` - Tarefa completada
- `CANCELLED` - Tarefa cancelada

### 🔒 Regras de Negócio

O projeto implementa as seguintes regras de negócio: 

1. **Título obrigatório**: Toda tarefa deve ter um título não vazio
2. **Status inicial**: Novas tarefas sempre iniciam como `PENDING`
3. **Tarefas canceladas são imutáveis**: Uma tarefa `CANCELLED` não pode mudar de status
4. **Tarefas completadas não podem ser deletadas**:  Proteção contra remoção acidental

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Java 21 ou superior
- Gradle 7.x ou superior (ou use o wrapper incluído)

### Passos para Execução

1. **Clone o repositório**
```bash
git clone https://github.com/ViniciusVRodrigues/todolist-spring-cleanarch.git
cd todolist-spring-cleanarch/cleanarch
```

2. **Execute o projeto usando Gradle**
```bash
./gradlew bootRun
```

Ou no Windows:
```bash
gradlew.bat bootRun
```

3. **A aplicação estará disponível em:**
```
http://localhost:8080
```

### Build do Projeto

Para gerar o JAR da aplicação: 

```bash
./gradlew build
```

O arquivo JAR será gerado em `build/libs/cleanarch-0.0.1-SNAPSHOT. jar`

Para executar o JAR:

```bash
java -jar build/libs/cleanarch-0.0.1-SNAPSHOT.jar
```

## 🧪 Como Testar a API

### Usando cURL

#### 1️⃣ Criar uma nova tarefa

```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Clean Architecture",
    "description": "Revisar conceitos de Clean Architecture no Spring Boot"
  }'
```

**Resposta esperada (201 Created):**
```json
{
  "id": 1,
  "title": "Estudar Clean Architecture",
  "description": "Revisar conceitos de Clean Architecture no Spring Boot",
  "status": "PENDING",
  "createdAt": "2026-01-21T10:30:00",
  "updatedAt": null
}
```

#### 2️⃣ Listar todas as tarefas

```bash
curl -X GET http://localhost:8080/api/tasks
```

#### 3️⃣ Listar tarefas por status

```bash
curl -X GET "http://localhost:8080/api/tasks?status=PENDING"
```

Status válidos: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`

#### 4️⃣ Buscar tarefa por ID

```bash
curl -X GET http://localhost:8080/api/tasks/1
```

#### 5️⃣ Atualizar uma tarefa

```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title":  "Estudar Clean Architecture - Atualizado",
    "description": "Revisar e praticar Clean Architecture",
    "status": "IN_PROGRESS"
  }'
```

#### 6️⃣ Marcar tarefa como completa

```bash
curl -X PATCH http://localhost:8080/api/tasks/1/complete
```

#### 7️⃣ Deletar uma tarefa

```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

**Nota**:  Tarefas com status `COMPLETED` não podem ser deletadas.

### Usando Postman ou Insomnia

Importe a seguinte coleção de endpoints:

**Base URL**: `http://localhost:8080`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/tasks` | Criar tarefa |
| GET | `/api/tasks` | Listar todas |
| GET | `/api/tasks? status=PENDING` | Listar por status |
| GET | `/api/tasks/{id}` | Buscar por ID |
| PUT | `/api/tasks/{id}` | Atualizar tarefa |
| PATCH | `/api/tasks/{id}/complete` | Completar tarefa |
| DELETE | `/api/tasks/{id}` | Deletar tarefa |

### Usando o Console H2

O projeto utiliza H2 Database em memória.  Para acessar o console:

1. Acesse:  `http://localhost:8080/h2-console`
2. Configure a conexão: 
   - **JDBC URL**: `jdbc:h2:mem:testdb`
   - **Username**: `sa`
   - **Password**: *(deixe em branco)*
3. Clique em "Connect"

## 📝 Exemplos de Requisições

### Criar múltiplas tarefas

```bash
# Tarefa 1
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Fazer compras", "description": "Comprar itens do supermercado"}'

# Tarefa 2
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar Java", "description": "Revisar conceitos de POO"}'

# Tarefa 3
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":  "Exercício físico", "description": "Correr 30 minutos"}'
```

### Fluxo completo de uma tarefa

```bash
# 1. Criar tarefa
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Desenvolver feature", "description": "Implementar nova funcionalidade"}'

# 2. Atualizar para IN_PROGRESS
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Desenvolver feature", "description": "Implementar nova funcionalidade", "status": "IN_PROGRESS"}'

# 3. Completar tarefa
curl -X PATCH http://localhost:8080/api/tasks/1/complete

# 4. Tentar deletar (falhará pois está COMPLETED)
curl -X DELETE http://localhost:8080/api/tasks/1
```

## 🧪 Executar Testes

Para executar os testes do projeto:

```bash
./gradlew test
```

Para ver o relatório de testes:

```bash
./gradlew test --info
```

O relatório HTML será gerado em:  `build/reports/tests/test/index.html`

## 🐛 Tratamento de Erros

A API retorna respostas apropriadas para diferentes cenários de erro:

| Código | Situação | Exemplo |
|--------|----------|---------|
| 400 | Bad Request | Título vazio ou ausente |
| 404 | Not Found | Tarefa não encontrada |
| 422 | Unprocessable Entity | Tentativa de deletar tarefa completada |

**Exemplo de erro (400 Bad Request):**
```json
{
  "timestamp": "2026-01-21T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Title is mandatory and cannot be empty",
  "path":  "/api/tasks"
}
```

## 📚 Estrutura de Dados

### Task Entity

```java
{
  "id": Long,
  "title": String (max 100 caracteres, obrigatório),
  "description": String (max 500 caracteres, opcional),
  "status": TaskStatus (PENDING, IN_PROGRESS, COMPLETED, CANCELLED),
  "createdAt": LocalDateTime,
  "updatedAt": LocalDateTime
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para: 

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais, demonstrando a implementação de Clean Architecture com Spring Boot.

## 👨‍💻 Autor

**Vinicius V. Rodrigues**

- GitHub: [@ViniciusVRodrigues](https://github.com/ViniciusVRodrigues)

## 📖 Referências

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture. html)
- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório! 