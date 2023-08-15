## Autenticação 2fa Backend

### Fluxo da implementação

#### Register

- Registra o user e gera uma secret com a biblioteca speakeasy;
- Retorna o qrcode, user e message de sucesso;

#### Login

- Verifica se o email e senha estão válidos;
- Verifica se o secret é válida;
- Verifica se o token é válido;
- Retorna o token e message de sucesso;

### Fluxo da aplicação :rocket:

#### Register

**Exemplo**

```json
{
  "name": "test",
  "email": "test@gmail.com",
  "password": "test123456"
}
```

#### Login

**Exemplo**

```json
{
  "email": "test@gmail.com",
  "password": "test123456",
  "token": "4560"
}
```

### Configuração

Crie um arquivo .env
**Examplo**

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:123456@localhost:5435/auth-2fa?schema=public"
```

### Execução

Execute

```bash
npm i
```

Tenha o docker instalado na sua máquina, para a execução do container do banco de dados

Criar o container do banco de dados da aplicação

```bash
docker compose up
```

Starta a aplicação

```bash
npm run dev
```

---

By Talita Araujo :wink::purple_heart:
