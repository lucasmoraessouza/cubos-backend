# Estrutura do Projeto

Este projeto segue uma arquitetura limpa e modular, com as seguintes pastas:

## Estrutura de Pastas

- `modules/`: Contém os módulos da aplicação, cada um com sua própria estrutura interna
- `controllers/`: Controladores da aplicação, responsáveis por receber as requisições
- `services/`: Camada de serviços que contém a lógica de negócio
- `interfaces/`: Definições de tipos e interfaces
- `repositories/`: Camada de acesso a dados
- `config/`: Arquivos de configuração
- `utils/`: Funções utilitárias
- `middlewares/`: Middlewares da aplicação

## Padrões de Código

- Utilizamos o padrão de Clean Code
- Seguimos os princípios SOLID
- Utilizamos injeção de dependência
- Implementamos validação de dados
- Documentação via Swagger

## Variáveis de Ambiente Necessárias

```env
# Configurações do Servidor
PORT=3000

# Configurações do Banco de Dados
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=cubos_db

# Configurações JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
``` 