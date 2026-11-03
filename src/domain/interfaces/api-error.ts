import i18n from '@/i18n';

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

  static network(message: string = i18n.t('errors.network')): ApiError {
    return new ApiError(message, 'network');
  }

  static http(statusCode: number, message?: string): ApiError {
    const defaultMessage = i18n.t(`errors.http.${statusCode}`, {
      defaultValue: i18n.t('errors.httpDefault', { statusCode }),
    });
    return new ApiError(message ?? defaultMessage, 'http', statusCode);
  }

  static parse(message: string = i18n.t('errors.parse')): ApiError {
    return new ApiError(message, 'parse');
  }

  static unknown(message: string = i18n.t('errors.unknown')): ApiError {
    return new ApiError(message, 'unknown');
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function resolveErrorMessage(
  error: unknown,
  fallback: string = i18n.t('errors.unknown'),
): string {
  if (isApiError(error)) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function isUserError(error: unknown): boolean {
  if (!isApiError(error)) return false;
  const { kind, statusCode } = error;
  return kind === 'http' && statusCode != null && statusCode >= 400 && statusCode < 500;
}
