import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string, errors: Array<object>) {
    super(404, message, errors);
  }
}
