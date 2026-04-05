import { useActivities } from "../hooks/useActivities";

export default function ExampleZustand() {
  const { activities, addActivity } = useActivities();

  return (
    <div>
      <button
        onClick={() =>
          addActivity({
            title: "Study React",
            description: "",
            date: "2026-04-04",
            time: "19:00",
            category: "study",
          })
        }
      >
        Add
      </button>

      {activities.map((a) => (
        <div key={a.id}>{a.title}</div>
      ))}
    </div>
  );
}