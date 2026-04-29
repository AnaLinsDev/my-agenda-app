import { apiFetch } from "./api";

export type UserResponse = {
  id: string;
  email: string;
};

export type UpdateUserPayload = {
  email?: string;
  password?: string;
};

// Get Profile
export async function getUserProfile() {
  return apiFetch<UserResponse>("/users/profile", {
    method: "GET",
    credentials: "include",
  });
}

// Update User
export async function updateUser(data: UpdateUserPayload) {
  return apiFetch<UserResponse>("/users/edit", {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
  });
}

// Delete User
export async function deleteUser() {
  return apiFetch<{ message: string }>("/users/delete", {
    method: "DELETE",
    credentials: "include",
  });
}