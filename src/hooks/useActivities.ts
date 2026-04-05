import { useEffect } from "react";
import type { Activity, CreateActivityDTO } from "../types/Activity";

// Zustand
import { useActivitiesStore } from "../store/useActivitiesStore";

// IndexedDB
import {
  getAllActivities,
  addActivityDB,
  updateActivityDB,
  deleteActivityDB,
} from "../services/db";

//Factory: a function or pattern responsible for creating fully-formed objects 
// with all required fields and defaults applied.
function createActivity(data: CreateActivityDTO): Activity {
  return {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    completed: false,
  };
}

export function useActivities() {
  const {
    activities,
    setActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useActivitiesStore();

  // Load inicial do IndexedDB
  useEffect(() => {
    getAllActivities().then(setActivities);
  }, [setActivities]);

  // Add
  const handleAdd = async (data: CreateActivityDTO) => {
    const newActivity = createActivity(data);

    addActivity(newActivity);
    await addActivityDB(newActivity);
  };

  // Update
  const handleUpdate = async (activity: Activity) => {
    updateActivity(activity);
    await updateActivityDB(activity);
  };

  // Delete
  const handleDelete = async (id: string) => {
    deleteActivity(id);
    await deleteActivityDB(id);
  };

  // Toggle
  const handleToggle = async (id: string) => {
    const activity = activities.find((a) => a.id === id);
    if (!activity) return;

    const updated = { ...activity, completed: !activity.completed };

    updateActivity(updated);
    await updateActivityDB(updated);
  };

  return {
    activities,
    addActivity: handleAdd,
    updateActivity: handleUpdate,
    deleteActivity: handleDelete,
    toggleCompleted: handleToggle,
  };
}
