type Props = {
  id: string;
  title: string;
  date: string;
  time: string;
  category: "personal" | "work" | "study" | "health" | "others";
};

export default function ActivityCard({
  id,
  title,
  date,
  time,
  category,
}: Props) {
  const categoryStyles = {
    personal: {
      bg: "bg-[var(--personal)]",
    },
    work: {
      bg: "bg-[var(--work)]",
    },
    study: {
      bg: "bg-[var(--study)]",
    },
    health: {
      bg: "bg-[var(--health)]",
    },
    others: {
      bg: "bg-[var(--others)]",
    },
  };

  return (
    <div
      className={`m-4 p-3 max-w-240 text-text-h rounded-xl ${categoryStyles[category].bg}`}
    >
      <div className="flex justify-between">
        <h1>{title}</h1>
        
      </div>
    </div>
  );
}
