import { useActivities } from "../../hooks/useActivities";
import ActivityCard from "../core/ActivityCard";

export default function Calendar() {
  const { activities } = useActivities();

  const week = [
    {
      id: 1,
      name: "Segunda",
    },
    {
      id: 2,
      name: "Terça",
    },
    {
      id: 3,
      name: "Quarta",
    },
    {
      id: 4,
      name: "Quinta",
    },
    {
      id: 5,
      name: "Sexta",
    },
    {
      id: 6,
      name: "Sábado",
    },
    {
      id: 7,
      name: "Domingo",
    },
  ];

  return (
    <div className="flex-1 grid lg:grid-cols-7">
      {week.map((w) => (
        <div key={w.id} className="mx-1 bg-card rounded-2xl my-6">
          <h2 className="text-center font-bold bg-bg border border-b-0 p-2 rounded-t-2xl">
            {w.name}
          </h2>

          {activities.map((a) => (
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
      ))}
    </div>
  );
}
