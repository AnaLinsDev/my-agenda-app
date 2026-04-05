import { create } from "zustand";
import type { Category } from "../types/Category";

type State = {
  categories: Category[];
};

export const useCategoriesStore = create<State>(() => ({
  categories: [
    { id: "personal" },
    { id: "work" },
    { id: "study" },
    { id: "health" },
    { id: "others" },
  ],
}));
