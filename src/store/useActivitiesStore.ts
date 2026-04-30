import { create } from "zustand";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  type Activity,
  type ActivityCreatePayload,
  type ActivityUpdatePayload,
} from "../services/activityService";

type Filters = {
  category?: Activity["category"];
  completed?: boolean;
};

type Store = {
  activities: Activity[];
  weekOffset: number;
  filters: Filters;
  loading: boolean;

  setWeekOffset: (offset: number) => void;
  setFilters: (filters: Filters) => void;

  fetchActivities: () => Promise<void>;
  create: (data: ActivityCreatePayload) => Promise<void>;
  update: (id: string, data: ActivityUpdatePayload) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

const getStartOfWeek = (offset: number) => {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diff + offset * 7);

  return monday.toISOString().split("T")[0];
};

export const useActivitiesStore = create<Store>((set, get) => ({
  activities: [],
  weekOffset: 0,
  filters: {},
  loading: false,

  setWeekOffset: (offset) => set({ weekOffset: offset }),

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));

    get().fetchActivities();
  },

  fetchActivities: async () => {
    set({ loading: true });

    try {
      const { weekOffset, filters } = get();
      const weekStart = getStartOfWeek(weekOffset);

      const data = await getActivities(weekStart, filters);
      set({ activities: data });
    } finally {
      set({ loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true });

    try {
      await createActivity(data);
      await get().fetchActivities();
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true });

    try {
      await updateActivity(id, data);
      await get().fetchActivities();
    } finally {
      set({ loading: false });
    }
  },

  remove: async (id) => {
    set({ loading: true });

    try {
      await deleteActivity(id);
      await get().fetchActivities();
    } finally {
      set({ loading: false });
    }
  },
}));
