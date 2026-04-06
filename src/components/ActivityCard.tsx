import { useState } from "react";
import { useActivities } from "../hooks/useActivities";
import { categoryStyles } from "../utils/category-styles";
import Button from "./core/Button";

type Props = {
  id: string;
  title: string;
  date: string;
  time: string;
  category: "personal" | "work" | "study" | "health" | "others";
  completed: boolean;
};

export default function ActivityCard({
  id,
  title,
  date,
  time,
  category,
  completed,
}: Props) {
  const { deleteActivity, toggleCompleted, updateActivity, activities } =
    useActivities();

  const activity = activities.find((a) => a.id === id);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newTime, setNewTime] = useState(time);
  const [newDate, setNewDate] = useState(date);

  const handleSave = () => {
    if (!activity) return;

    updateActivity({
      ...activity,
      title: newTitle,
      time: newTime,
      date: newDate,
    });

    setIsEditingTitle(false);
    setIsEditingTime(false);
    setIsEditingDate(false);
  };

  return (
    <div
      className={`my-2 p-3 max-w-240 text-text-h  ${
        categoryStyles[category].bg
      }`}
    >
      <div
        className={`flex flex-col gap-1 mb-2 ${
          completed ? "opacity-60 line-through" : ""
        }`}
      >
        {/* TITLE */}
        {isEditingTitle ? (
          <input
            className="bg-transparent border-b outline-none"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        ) : (
          <h1
            className="wrap-break-word cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {title}
          </h1>
        )}

        <div className="flex flex-row justify-between my-2">
          {/* DATE */}
          {isEditingDate ? (
            <input
              className=" border-b outline-none w-fit bg-black"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          ) : (
            <p
              className="cursor-pointer text-sm"
              onClick={() => setIsEditingDate(true)}
            >
              {`${newDate.split("-")[1]}/${newDate.split("-")[2]}`}
            </p>
          )}

          {/* TIME */}
          {isEditingTime ? (
            <input
              className="bg-transparent border-b outline-none w-fit"
              value={newTime}
              type="time"
              onChange={(e) => setNewTime(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          ) : (
            <p
              className="cursor-pointer text-sm"
              onClick={() => setIsEditingTime(true)}
            >
              {time}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          title="Delete"
          variant="danger"
          size="sm"
          onClick={() => deleteActivity(id)}
        />

        {!completed && (
          <Button
            title="Complete"
            variant="outlined"
            size="sm"
            onClick={() => toggleCompleted(id)}
          />
        )}
      </div>
    </div>
  );
}
