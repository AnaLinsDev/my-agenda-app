import { categoryStyles } from "../utils/category-styles";

type Props = {
  id: string;
  title: string;
  date: string;
  time: string;
  category: "personal" | "work" | "study" | "health" | "others";
};

export default function ActivityCard({ title, time, category }: Props) {
  return (
    <div
      className={`m-4 p-3 max-w-240 text-text-h rounded-xl ${categoryStyles[category].bg}`}
    >
      <div className="flex flex-col justify-between gap-3">
        <h1 className="wrap-break-word">{title}</h1>
        <p>{time}</p>
      </div>
    </div>
  );
}
