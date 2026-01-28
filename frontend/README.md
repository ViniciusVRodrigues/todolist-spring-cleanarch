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
VITE_USE_MOCK_DATA=false
```

### Modo Mock (sem Backend)

Para usar a aplicação sem o backend (ideal para GitHub Pages ou demonstração):

```env
VITE_USE_MOCK_DATA=true
```

No modo mock:
- Os dados são armazenados no `localStorage` do navegador
- Tarefas de exemplo são criadas automaticamente na primeira execução
- Todas as operações CRUD funcionam normalmente
- Não requer conexão com a API do backend

## 🚀 Deploy no GitHub Pages

Para fazer deploy da versão mockada no GitHub Pages:

1. **Configure o repositório no GitHub:**
   - Vá em Settings > Pages
   - Selecione "GitHub Actions" como source

2. **Crie o arquivo de workflow** `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      - name: Build
        working-directory: ./frontend
        env:
          VITE_USE_MOCK_DATA: true
          VITE_BASE_PATH: /todolist-spring-cleanarch/
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. **Build manual (alternativa):**

```bash
cd frontend
VITE_USE_MOCK_DATA=true VITE_BASE_PATH=/todolist-spring-cleanarch/ npm run build
```

Os arquivos serão gerados em `frontend/dist/` prontos para deploy.

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
