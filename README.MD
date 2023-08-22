# Autenticação 2fa Backend

## :nerd_face: Fluxo da implementação

### Register

- Gera uma secret;
- Retorna o qrcode e a secret;
- Registra o user passando a secret gerada e o token para fazer a validação com a biblioteca speakeasy;

### Login

- Verifica se o email e senha estão válidos;
- Verifica se o secret é válida;
- Verifica se o token é válido;
- Retorna o token e message de sucesso;

## :rocket: Fluxo da aplicação

### Register

**Exemplo:**

```json
{
  "name": "test",
  "email": "test@gmail.com",
  "password": "test123456",
  "secret": "secret",
  "token": "234567"
}
```

### Login

**Exemplo:**

```json
{
  "email": "test@gmail.com",
  "password": "test123456",
  "token": "4560"
}
```

## :wave: Configuração

#### Crie um arquivo .env

**Exemplo:**

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:123456@localhost:5435/auth-2fa?schema=public"
MFA_AUTHENTICATION_APP_NAME = 'AUTH2FA.NET'
JWT_SECRET = 'secret'
JWT_EXPIRE_IN = '15m'
PORT = 9090
```

## :muscle: Execução

#### Execute

```bash
npm i
```

Tenha o docker instalado na sua máquina, para a execução do container do banco de dados

#### Execute as migrations do prism

```bash
npx prisma migrate dev
```

#### Criar o container do banco de dados da aplicação

```bash
docker compose up
```

#### Starta a aplicação

```bash
npm run dev
```

---

By Talita Araujo :wink::purple_heart:
