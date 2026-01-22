# 📋 TodoList Frontend - React + TypeScript + Atomic Design

![React](https://img.shields.io/badge/React-19.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)
![Module Federation](https://img.shields.io/badge/Module%20Federation-Ready-green)

Frontend React para a aplicação TodoList, construído com TypeScript seguindo o padrão **Atomic Design** e preparado para **Module Federation**.

## 🎨 Características

- ✅ **Atomic Design**: Componentes organizados em Atoms, Molecules, Organisms, Templates e Pages
- 🌓 **Tema Claro/Escuro**: Alternância entre temas com persistência
- 🎨 **Design Moderno**: Interface branca com detalhes em laranja
- 🔔 **Notificações**: Toast para sucesso e Alert customizado para erros
- 🔌 **Module Federation**: Pronto para ser integrado como micro-frontend
- 📱 **Responsivo**: Interface adaptável a diferentes tamanhos de tela

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── atoms/          # Componentes básicos (Button, Input, Badge, etc.)
│   │   ├── molecules/      # Composições de atoms (TaskCard, Modal, Toast, etc.)
│   │   ├── organisms/      # Seções completas (Header, TaskList)
│   │   ├── templates/      # Layouts de página (MainLayout)
│   │   └── pages/          # Páginas da aplicação (HomePage)
│   ├── contexts/           # Contextos React (Theme, Toast, Alert)
│   ├── hooks/              # Custom hooks (useTasks)
│   ├── services/           # Serviços de API
│   ├── styles/             # Temas e estilos globais
│   └── types/              # Tipos TypeScript
├── vite.config.ts          # Configuração do Vite com Module Federation
└── package.json
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
cd frontend
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build de Produção

```bash
npm run build
npm run preview
```

## 🔌 Module Federation

O projeto está configurado para expor componentes via Module Federation:

```javascript
// vite.config.ts
federation({
  name: 'todolist-frontend',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App.tsx',
    './HomePage': './src/components/pages/HomePage.tsx',
  },
  shared: ['react', 'react-dom', 'styled-components'],
})
```

### Uso em um Host

```javascript
// No projeto host, configure o remote:
remotes: {
  todolist: 'http://localhost:3000/remoteEntry.js'
}

// E importe o componente:
import App from 'todolist/App';
import HomePage from 'todolist/HomePage';
```

## 🌐 Configuração da API

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:8080/api
```

## 📖 Funcionalidades

### Gerenciamento de Tarefas

- **Criar tarefa**: Adicione novas tarefas com título e descrição
- **Listar tarefas**: Visualize todas as tarefas com filtro por status
- **Atualizar tarefa**: Edite o título e descrição
- **Completar tarefa**: Marque tarefas como concluídas
- **Excluir tarefa**: Remova tarefas pendentes

### Filtros de Status

- Todos
- Pendentes (PENDING)
- Em Progresso (IN_PROGRESS)
- Concluídos (COMPLETED)
- Cancelados (CANCELLED)

### Temas

Clique no ícone ☀️/🌙 no canto superior direito para alternar entre os temas claro e escuro.

## 🛠️ Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Styled Components** - CSS-in-JS
- **Axios** - Cliente HTTP
- **Module Federation** - Micro-frontends

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa o ESLint |
