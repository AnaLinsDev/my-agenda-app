import { create } from "zustand";
import type { Category } from "../types/Category";

type State = {
  categories: Category[];
};

export const useCategoriesStore = create<State>(() => ({
  categories: [
    { id: "personal", color: "#3b82f6" },
    { id: "work", color: "#f59e0b" },
    { id: "study", color: "#10b981" },
    { id: "health", color: "#ef4444" },
    { id: "others", color: "#6b7280" },
  ],
}));
