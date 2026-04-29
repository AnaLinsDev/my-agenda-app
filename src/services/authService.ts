import { apiFetch } from "./api";

type RegisterPayload = {
  email: string;
  password: string;
};

type UserResponse = {
  id: string;
  email: string;
};

export async function registerUser(data: RegisterPayload) {
  return apiFetch<UserResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: RegisterPayload) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
}

export async function logoutUser() {
  return apiFetch<{ message: string }>("/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}
