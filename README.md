# Hospital Procedures

Sistema de gerenciamento de documentos e procedimentos hospitalares construído com Turborepo, Next.js e Nest.js.

## 🏗️ Arquitetura

- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Nest.js + TypeORM + PostgreSQL
- **Monorepo**: Turborepo

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL (rodando localmente)
- pnpm 8+

## 🚀 Instalação

1. Clone o repositório
2. Configure o banco de dados PostgreSQL
3. Execute o script de desenvolvimento:

```bash
chmod +x dev.sh
./dev.sh
```

O script irá:
- Criar arquivos .env necessários
- Instalar dependências
- Criar pasta de uploads
- Iniciar frontend e backend simultaneamente

## 📁 Estrutura do Projeto

```
hg-procedures/
├── apps/
│   ├── backend/          # API Nest.js
│   │   └── src/
│   │       ├── auth/     # Autenticação JWT
│   │       ├── documents/# CRUD de documentos
│   │       └── users/    # Gerenciamento de usuários
│   └── frontend/         # App Next.js
│       └── src/
│           ├── app/      # Pages (App Router)
│           ├── components/# Componentes React
│           └── lib/      # Utilitários
├── uploads/
│   └── pdfs/            # 📄 COLOQUE OS PDFs AQUI
└── dev.sh               # Script de desenvolvimento
```

## 📄 Onde inserir os PDFs

Coloque os arquivos PDF na pasta: `uploads/pdfs/`

Ou use a interface administrativa para fazer upload.

## 🔐 Credenciais Padrão

- **Usuário**: admin
- **Senha**: admin123

## 🌐 URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin: http://localhost:3000/admin

## ⚙️ Configuração do Banco de Dados

Configure as variáveis em `.env` (raiz do projeto):

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=hg_procedures
JWT_SECRET=your-secret-key-here
PORT=3001

NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🎯 Funcionalidades

### Público
- Listagem de documentos em grid responsivo
- Busca por título
- Visualização de PDFs
- Download de PDFs

### Admin
- Login com autenticação JWT
- Upload de novos documentos
- Remoção de documentos
- Gerenciamento completo

## 🛠️ Comandos

```bash
pnpm dev         # Desenvolvimento
pnpm build       # Build de produção
pnpm start       # Start de produção
```

### Instalar pnpm (se não tiver)
```bash
npm install -g pnpm
```

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Mobile

## 🔧 Tecnologias

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Axios
- **Backend**: Nest.js, TypeORM, PostgreSQL, JWT, Multer
- **DevOps**: Turborepo, TypeScript

## 📝 Licença

Projeto desenvolvido para uso hospitalar.

