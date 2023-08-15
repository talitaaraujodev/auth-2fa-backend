export interface AuthServiceInputPort {
  auth(email: string, password: string, token: string): Promise<string>;
}
