import * as bcrypt from 'bcrypt';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  secret: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    secret: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.secret = secret;
  }

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getEmail(): string {
    return this.email;
  }

  async encryptPassword(): Promise<string> {
    this.password = await bcrypt.hash(this.password, 10);
    return this.password;
  }
}
