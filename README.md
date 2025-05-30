# Cubos movie - Backend

API REST desenvolvida em NestJS para gerenciamento de filmes, com sistema de autenticação, upload de imagens para AWS S3 e notificações por email usando Resend.

## 🛠 Tecnologias

- NestJS
- PostgreSQL
- Prisma ORM
- AWS S3
- Resend (Email)
- JWT Authentication
- bcrypt
- Docker

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- Docker e Docker Compose
- Uma conta AWS (para S3)
- Uma conta Resend (para emails)

## 🚀 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/lucasmoraessouza/cubos-backend
cd server
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cubos_db?schema=public"

# JWT
JWT_SECRET="seu-secret-aqui"

# AWS
AWS_ACCESS_KEY_ID="sua-access-key"
AWS_SECRET_ACCESS_KEY="sua-secret-key"
AWS_REGION="sua-region"
AWS_BUCKET_NAME="seu-bucket"

# Resend
RESEND_API_KEY="sua-api-key-resend"
```

4. Inicie o banco de dados:

```bash
docker-compose up -d
```

5. Execute as migrations e seed:

```bash
npm run setup
```

## 🎯 Funcionalidades

### Autenticação

- Registro de usuário
- Login com JWT
- Proteção de rotas

### Filmes

- CRUD completo
- Upload de imagens para AWS S3
- Filtros por duração e data de lançamento
- Paginação

### Notificações

- Envio automático de emails quando filmes são lançados
- Template personalizado de email

## 📨 Endpoints

### Autenticação

```bash
# Registro
POST /auth/register
Body: { name, email, password, confirmPassword }

# Login
POST /auth/login
Body: { email, password }
```

### Filmes

```bash
# Criar filme (Multipart Form)
POST /movies
Headers: Authorization: Bearer {token}
Body: { title, description, duration, releaseDate, image }

# Listar filmes (com filtros)
GET /movies?page=1&limit=10&minDuration=90&maxDuration=180&startDate=2024-01-01&endDate=2024-12-31
Headers: Authorization: Bearer {token}

# Detalhes do filme
GET /movies/:id
Headers: Authorization: Bearer {token}

# Atualizar filme
PATCH /movies/:id
Headers: Authorization: Bearer {token}
Body: { title, description, duration, releaseDate, image }

# Deletar filme
DELETE /movies/:id
Headers: Authorization: Bearer {token}
```

## 🔄 Seed

O projeto inclui uma seed com:

- Um usuário padrão (email: cubos@cubos.academy, senha: Cubos@2025)
- 11 filmes pré-cadastrados

A seed é executada automaticamente com o comando `npm run setup`

## 🏃‍♂️ Rodando o Projeto

1. Inicie o banco de dados:

```bash
docker-compose up -d
```

2. Inicie o servidor:

```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`

## 📝 Notas

- As imagens são armazenadas no AWS S3
- Emails são enviados através do Resend
- O sistema verifica diariamente à meia-noite por filmes que serão lançados no dia

## 🤝 Agradecimentos

Agradeço à Cubos Tecnologias pela oportunidade de apresentar meu trabalho e pela confiança depositada em mim.

Att,
Lucas de Moraes Souza
