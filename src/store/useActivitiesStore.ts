import { create } from "zustand";
import type { Activity } from "../types/Activity";
import { startOfWeek, endOfWeek, format } from "date-fns";

type Filters = {
  category?: string;
  completed?: boolean;

  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
};

type State = {
  activities: Activity[];
  filters: Filters;
};

type Actions = {
  setActivities: (activities: Activity[]) => void;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;

  setDayFilter: (date: Date) => void;
  setWeekFilter: (date: Date) => void;

  addActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  toggleCompleted: (id: string) => void;
};

export const useActivitiesStore = create<State & Actions>((set) => ({
  activities: [],
  filters: {},

  setActivities: (activities) => set({ activities }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: {} }),

  //  DAY
  setDayFilter: (date) => {
    const formatted = format(date, "yyyy-MM-dd");

    set({
      filters: {
        startDate: formatted,
        endDate: formatted,
      },
    });
  },

  // WEEK
  setWeekFilter: (date) => {
    const start = format(startOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");
    const end = format(endOfWeek(date, { weekStartsOn: 1 }), "yyyy-MM-dd");

    set({
      filters: {
        startDate: start,
        endDate: end,
      },
    });
  },

  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity],
    })),

  updateActivity: (activity) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === activity.id ? activity : a,
      ),
    })),

  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a.id !== id),
    })),

  toggleCompleted: (id) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a,
      ),
    })),
}));
