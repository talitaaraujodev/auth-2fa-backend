export class BaseError {
  public readonly code: number;
  public readonly message: string;
  public readonly errors?: Array<object>;

  constructor(code: number, message: string, errors?: Array<object>) {
    this.code = code;
    this.message = message;
    this.errors = errors;
  }
}
