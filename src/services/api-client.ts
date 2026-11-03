import i18n from '@/i18n';
import { ApiError } from '@/domain/interfaces/api-error';

const BASE_URL = 'https://dummy-api-topaz.vercel.app';

const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'X-Enable-Bugs': 'off',
  'X-Candidate-Id': 'danielpereira19861978@gmail.com',
};

/**
 * Realiza una petición HTTP y retorna la respuesta tipada.
 * Lanza ApiError en caso de error de red, HTTP no-2xx o fallo de parseo.
 */
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { ...DEFAULT_HEADERS, ...options?.headers },
    });
  } catch {
    // Error de red: sin conexión, timeout, DNS, etc.
    throw ApiError.network();
  }

  if (!response.ok) {
    try {
      const body = await response.json();
      const rawMessage = typeof body?.error === 'string' ? body.error : undefined;
      const serverMessage = rawMessage
        ? i18n.t(`errors.apiMessages.${rawMessage}`, { defaultValue: rawMessage })
        : undefined;
      throw ApiError.http(response.status, serverMessage);
    } catch (e) {
      if (e instanceof ApiError) throw e;
      throw ApiError.http(response.status);
    }
  }

  try {
    const data: T = await response.json();
    return data;
  } catch {
    throw ApiError.parse();
  }
}

/**
 * Métodos HTTP convenientes exportados como cliente unificado.
 */
export const apiClient = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
