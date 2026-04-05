import { useCategoriesStore } from "../store/useCategoriesStore";

export function useCategories() {
  const categories = useCategoriesStore((state) => state.categories);

  const getCategoryById = (id: string) => categories.find((c) => c.id === id);

  return {
    categories,
    getCategoryById,
  };
}
