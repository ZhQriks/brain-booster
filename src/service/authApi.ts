import { backendUrl } from 'utils/consts';
import { storage } from 'utils/storage';

export interface AuthResponse {
  accessToken: string;
  refresh_token: string;
}

export interface User {
  user_id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
export function baseFetch(url: string, options: RequestInit): Promise<Response> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { accessToken } = storage.getToken() ?? {}; // Provide an empty object as default value
  const headers: Record<any, any> = {
    ...options.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return fetch(url, {
    ...options,
    method: options.method || 'GET', // Add the method property
    headers,
  });
}

export async function handleApiResponse(response: Response): Promise<any> {
  const data = await response.json();

  if (response.ok) {
    return data;
  }
  return Promise.reject(data);
}

export function getUserProfile(): Promise<{ user: User | undefined }> {
  return baseFetch(`${backendUrl}/auth/profile/`, {}).then(handleApiResponse);
}

export function loginWithEmailAndPassword(data: any): Promise<AuthResponse> {
  return baseFetch(`${backendUrl}/auth/signin/`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

export function registerWithEmailAndPassword(data: unknown): Promise<any> {
  return baseFetch(`${backendUrl}/auth/signup/`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then(handleApiResponse);
}

export function refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
  return fetch(`${backendUrl}/api/token/refresh/`, {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(handleApiResponse);
}
