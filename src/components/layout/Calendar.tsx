import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

import ActivityCard from "../ActivityCard";
import { useFilteredActivities } from "../../hooks/useFilteredActivities";

export default function Calendar() {
  const activities = useFilteredActivities();

  const [weekOffset, setWeekOffset] = useState(0);

  const week = [
    { id: 1, name: "Segunda" },
    { id: 2, name: "Terça" },
    { id: 3, name: "Quarta" },
    { id: 4, name: "Quinta" },
    { id: 5, name: "Sexta" },
    { id: 6, name: "Sábado" },
    { id: 7, name: "Domingo" },
  ];

  const getStartOfWeek = (offset: number) => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) - 6 (Sat)

    const diff = day === 0 ? -6 : 1 - day; // adjust to Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff + offset * 7);

    return monday;
  };

  const startOfWeek = getStartOfWeek(weekOffset);

  // _ -> means you can ignore the current item from the array
  const weekDates = week.map((_, index) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + index);

    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const parseLocalDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center px-4 mt-4">
        <button onClick={() => setWeekOffset((prev) => prev - 1)}>
          <MdOutlineKeyboardArrowLeft size={36} />
        </button>

        <span></span>

        <button onClick={() => setWeekOffset((prev) => prev + 1)}>
          <MdKeyboardArrowRight size={36} />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 2xl:grid-cols-7">
        {week.map((w, index) => (
          <div key={w.id} className="mx-1 bg-card rounded-2xl my-6">
            <h2 className="text-center font-bold bg-bg border border-b-0 p-2 rounded-t-2xl">
              {w.name} - {formatDate(weekDates[index])}
            </h2>

            <div className="min-h-[calc(100vh-300px)]">
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
                  <ActivityCard
                    key={a.id}
                    id={a.id}
                    title={a.title}
                    category={a.category}
                    date={a.date}
                    time={a.time}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
