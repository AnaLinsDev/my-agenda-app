import { useEffect } from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

import ActivityCard from "../components/ActivityCard";
import { useTranslation } from "react-i18next";
import CalendarActions from "../components/CalendarActions";
import { formatDate, parseLocalDate } from "../utils/dates";
import { useActivitiesStore } from "../store/useActivitiesStore";

export default function Calendar() {
  const { t, i18n } = useTranslation();

  const { activities, weekOffset, setWeekOffset, fetchActivities } =
    useActivitiesStore();

  const getStartOfWeek = (offset: number) => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day;

    const monday = new Date(today);
    monday.setDate(today.getDate() + diff + offset * 7);

    return monday;
  };

  const startOfWeek = getStartOfWeek(weekOffset);

  const week = [
    { id: 1, name: "weekDays.monday" },
    { id: 2, name: "weekDays.tuesday" },
    { id: 3, name: "weekDays.wednesday" },
    { id: 4, name: "weekDays.thursday" },
    { id: 5, name: "weekDays.friday" },
    { id: 6, name: "weekDays.saturday" },
    { id: 7, name: "weekDays.sunday" },
  ];

  const weekDates = week.map((_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);
    return date;
  });

  useEffect(() => {
    fetchActivities();
  }, [weekOffset]);

  return (
    <div className="flex-1 pt-26 px-10">
      <CalendarActions />

      <div className="flex justify-end items-center px-4">
        <button
          className="rounded bg-transparent text-text-h hover:bg-accent-bg"
          onClick={() => setWeekOffset(weekOffset - 1)}
        >
          <MdOutlineKeyboardArrowLeft size={36} />
        </button>

        <button
          className="rounded bg-transparent text-text-h hover:bg-accent-bg"
          onClick={() => setWeekOffset(weekOffset + 1)}
        >
          <MdKeyboardArrowRight size={36} />
        </button>
      </div>

      <div className="grid sm:grid-cols-4 2xl:grid-cols-7">
        {week.map((w, index) => (
          <div key={w.id} className="mb-6">
            <h2 className="text-center font-bold p-2">
              {t(w.name)} - {formatDate(weekDates[index], i18n.language)}
            </h2>

            <div className="h-[calc(100vh-295px)] max-h-160 bg-card overflow-y-scroll">
              {activities
                .filter((a) => {
                  const activityDate = parseLocalDate(a.date);

                  return (
                    activityDate.getFullYear() ===
                      weekDates[index].getFullYear() &&
                    activityDate.getMonth() === weekDates[index].getMonth() &&
                    activityDate.getDate() === weekDates[index].getDate()
                  );
                })
                .map((a) => (
                  <ActivityCard key={a.id} {...a} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
