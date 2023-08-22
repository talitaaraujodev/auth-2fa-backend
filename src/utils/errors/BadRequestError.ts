import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string, errors: Array<object>) {
    super(400, message, errors);
  }
}
