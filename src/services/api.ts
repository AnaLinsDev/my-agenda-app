import { extractError } from "../utils/error-parser";
import { handleApiError } from "../utils/errorHandler";

const API_URL = import.meta.env.VITE_API_URL;

type ApiError = {
  message: string;
  code?: string;
  status: number;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    // resposta vazia
  }

  if (!response.ok) {
    const parsed = extractError(data);

    const error: ApiError = {
      message: parsed.message,
      code: parsed.code,
      status: response.status,
    };

    handleApiError(error);

    throw error;
  }

  return data as T; // 👈 cast seguro no final
}
