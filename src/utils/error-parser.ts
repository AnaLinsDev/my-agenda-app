export type ParsedError = {
  code?: string;
  message: string;
};

type ApiErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export function extractError(data: unknown): ParsedError {
  if (
    typeof data === "object" &&
    data !== null &&
    "error" in data
  ) {
    const err = (data as ApiErrorResponse).error;

    return {
      code: err.code,
      message: err.message,
    };
  }

  // FastAPI fallback
  if (
    typeof data === "object" &&
    data !== null &&
    "detail" in data
  ) {
    return {
      message: String((data as { detail?: string }).detail),
    };
  }

  return { message: "Unexpected error" };
}