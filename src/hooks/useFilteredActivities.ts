import { useActivitiesStore } from "../store/useActivitiesStore";

export const useFilteredActivities = () => {
  return useActivitiesStore((state) => {
    const { activities, filters } = state;

    return activities.filter((curr) => {
      if (filters.category && curr.category !== filters.category) {
        return false;
      }

      if (
        filters.completed !== undefined &&
        curr.completed !== filters.completed
      ) {
        return false;
      }

      return true;
    });
  });
};