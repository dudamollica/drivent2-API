import { ApplicationError } from '@/protocols';

export function notFoundError(errorMessage: string | void): ApplicationError {
  return {
    name: 'NotFoundError',
    message: errorMessage ? errorMessage : 'No result for this search!',
  };
}
