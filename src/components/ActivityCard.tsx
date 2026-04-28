import { useState } from "react";
import toast from "react-hot-toast";

import { categoryStyles } from "../utils/category-styles";
import Button from "./core/Button";
import { useTranslation } from "react-i18next";
import { formatDate, parseLocalDate } from "../utils/dates";

import type { Activity } from "../services/activityService";
import { useActivitiesStore } from "../store/useActivitiesStore";
import { ActivitySchemaUpdate } from "../zod/activity";

export default function ActivityCard({
  id,
  title,
  date,
  time,
  category,
  completed,
}: Activity) {
  const { t, i18n } = useTranslation();
  const { update, remove } = useActivitiesStore();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newTime, setNewTime] = useState(time);
  const [newDate, setNewDate] = useState(date);

  const handleSave = async () => {
    const result = ActivitySchemaUpdate.safeParse({
      title: newTitle,
      date: newDate,
      time: newTime,
      category,
      completed,
    });

    if (!result.success) {
      const firstError = result.error.issues[0];
      toast.error(t(firstError.message)); 
      return;
    }

    try {
      await update(id, result.data);
    } catch (error) {
      console.error("Error updating activity:", error);
    } finally {
      setIsEditingTitle(false);
      setIsEditingTime(false);
      setIsEditingDate(false);
    }
  };

  const handleDelete = async () => {
    try {
      await remove(id);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleToggleCompleted = async () => {
    try {
      await update(id, {
        title,
        date,
        time,
        category,
        completed: !completed,
      });
    } catch (error) {
      console.error("Error toggling activity:", error);
    }
  };

  return (
    <div
      className={`m-2 p-3 max-w-240 text-text-h rounded ${
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
              className="border-b outline-none w-fit bg-black"
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
              {formatDate(parseLocalDate(newDate), i18n.language)}
            </p>
          )}

          {/* TIME */}
          {isEditingTime ? (
            <input
              className="bg-transparent border-b outline-none w-fit"
              type="time"
              value={newTime}
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
          title={t("card.delete")}
          variant="danger"
          size="sm"
          onClick={handleDelete}
        />

        {!completed && (
          <Button
            title={t("card.complete")}
            variant="outlined"
            size="sm"
            onClick={handleToggleCompleted}
          />
        )}
      </div>
    </div>
  );
}
