import { apiFetch } from "./api";

export type Activity = {
  id: string;
  title: string;
  date: string;   // YYYY-MM-DD
  time: string;   // HH:MM
  category: string;
  completed: boolean;
};

export type ActivityCreatePayload = {
  title: string;
  date: string;
  time: string;
  category: string;
};

export type ActivityUpdatePayload = {
  title: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
};

// Get activities by week
export async function getActivities(weekStart: string) {
  return apiFetch<Activity[]>(`/activities?week_start=${weekStart}`, {
    method: "GET",
    credentials: "include",
  });
}

// Create activity
export async function createActivity(data: ActivityCreatePayload) {
  return apiFetch<Activity>("/activities", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
}

// Update activity
export async function updateActivity(id: string, data: ActivityUpdatePayload) {
  return apiFetch<Activity>(`/activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
  });
}

// Delete activity
export async function deleteActivity(id: string) {
  return apiFetch<{ message: string }>(`/activities/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}