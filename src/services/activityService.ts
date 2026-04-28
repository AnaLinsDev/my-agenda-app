import { apiFetch } from "./api";

export type Activity = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  category: "personal" | "work" | "study" | "health" | "others";
  completed: boolean;
};

export type ActivityFilters = {
  category?: Activity["category"];
  completed?: boolean;
};

export type ActivityCreatePayload = {
  title: string;
  date: string;
  time: string;
  completed: boolean;
  category: "personal" | "work" | "study" | "health" | "others";
};

export type ActivityUpdatePayload = {
  title: string;
  date: string;
  time: string;
  category: "personal" | "work" | "study" | "health" | "others";
  completed: boolean;
};

// Get activities by week
export async function getActivities(
  weekStart: string,
  filters?: ActivityFilters,
) {
  const params = new URLSearchParams({
    week_start: weekStart,
  });

  if (filters?.category) {
    params.append("category", filters.category);
  }

  if (filters?.completed !== undefined) {
    params.append("completed", String(filters.completed));
  }

  return apiFetch<Activity[]>(`/activities?${params.toString()}`, {
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
