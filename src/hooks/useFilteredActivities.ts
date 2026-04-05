import { useMemo } from "react";
import { useActivitiesStore } from "../store/useActivitiesStore";

export const useFilteredActivities = () => {
  const activities = useActivitiesStore((s) => s.activities);
  const filters = useActivitiesStore((s) => s.filters);

  return useMemo(() => {
    return activities
      .filter((curr) => {
        if (
          filters.category &&
          filters.category !== "all" &&
          curr.category !== filters.category
        ) {
          return false;
        }

        if (
          filters.completed &&
          filters.completed !== "all" &&
          `${curr.completed}` !== filters.completed
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // 🔥 sort by time (HH:mm)
        return a.time.localeCompare(b.time);
      });
  }, [activities, filters]);
};