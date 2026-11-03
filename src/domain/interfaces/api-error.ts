import { copy } from '@/constants/copy';

/**
 * Tipos de error que puede devolver la capa de servicios.
 * Permite distinguir entre errores de red, errores del servidor y errores inesperados.
 */
export type ApiErrorKind = 'network' | 'http' | 'parse' | 'unknown';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly statusCode?: number;

  constructor(message: string, kind: ApiErrorKind, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.statusCode = statusCode;
  }

  static network(message: string = copy.errors.network): ApiError {
    return new ApiError(message, 'network');
  }

  static http(statusCode: number, message?: string): ApiError {
    const defaultMessage = copy.errors.http[statusCode] ?? copy.errors.httpDefault(statusCode);
    return new ApiError(message ?? defaultMessage, 'http', statusCode);
  }

  static parse(message: string = copy.errors.parse): ApiError {
    return new ApiError(message, 'parse');
  }

  static unknown(message: string = copy.errors.unknown): ApiError {
    return new ApiError(message, 'unknown');
  }
}

/**
 * Retorna true si el error es una instancia de ApiError.
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Extrae el mensaje localizado de cualquier tipo de error de forma type-safe.
 * Evita el uso de `(err as Error).message` en los componentes.
 */
export function resolveErrorMessage(
  error: unknown,
  fallback: string = copy.errors.unknown,
): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

/**
 * Retorna true si el error es un error de negocio (4xx) que el usuario puede corregir.
 * Retorna false para errores de sistema: red, servidor 5xx, parseo, etc.
 */
export function isUserError(error: unknown): boolean {
  if (!isApiError(error)) return false;
  const { kind, statusCode } = error;
  return kind === 'http' && statusCode != null && statusCode >= 400 && statusCode < 500;
}
