import { useState } from "react";
import toast from "react-hot-toast";
import { MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

import { categoryStyles } from "../utils/category-styles";
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

  // ✅ single source of truth
  const [editingField, setEditingField] = useState<
    "title" | "date" | "time" | null
  >(null);

  const [newTitle, setNewTitle] = useState(title);
  const [newTime, setNewTime] = useState(time);
  const [newDate, setNewDate] = useState(date);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isEditingTitle = editingField === "title";
  const isEditingDate = editingField === "date";
  const isEditingTime = editingField === "time";

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
      setEditingField(null);
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
      className={`m-2 p-2 max-w-100 text-text-h rounded relative transition hover:shadow-md ${
        categoryStyles[category].bg
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div
          className={`flex flex-1 flex-col gap-1 ${
            completed ? "line-through" : ""
          }`}
        >
          {/* TITLE */}
          {isEditingTitle ? (
            <input
              className="border-b outline-none w-full"
              value={newTitle}
              autoFocus
              placeholder="Add a title..."
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setEditingField(null);
              }}
              onBlur={handleSave}
            />
          ) : (
            <div className="flex justify-between items-start gap-2">
              <h1
                className="break-words cursor-pointer hover:underline"
                onClick={() => setEditingField("title")}
              >
                {title || "Untitled"}
              </h1>

              {/* MENU BUTTON */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="p-2 rounded hover:bg-black/10 transition"
              >
                <MoreVertical size={18} />
              </button>

              {/* MENU */}
              <div
                className={`absolute right-2 top-10 w-44 bg-card border rounded shadow-lg z-10
                transition-all duration-150 ${
                  isMenuOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="py-1">
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-black/50 text-sm transition"
                    onClick={() => {
                      handleToggleCompleted();
                      setIsMenuOpen(false);
                    }}
                  >
                    {completed ? t("card.redo") : t("card.complete")}
                  </button>

                  <div className="border-t my-1 opacity-20" />

                  <button
                    className="w-full text-left px-3 py-2 hover:bg-black/10 text-sm text-red-500 transition"
                    onClick={() => {
                      handleDelete();
                      setIsMenuOpen(false);
                    }}
                  >
                    {t("card.delete")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DATE + TIME */}
          <div className="flex flex-row justify-between my-2 text-sm">
            {/* DATE */}
            {isEditingDate ? (
              <input
                className="border-b outline-none bg-transparent"
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") setEditingField(null);
                }}
                onBlur={handleSave}
              />
            ) : (
              <p
                className="cursor-pointer hover:underline opacity-80 hover:opacity-100 transition"
                onClick={() => setEditingField("date")}
              >
                {formatDate(parseLocalDate(newDate), i18n.language)}
              </p>
            )}

            {/* TIME */}
            {isEditingTime ? (
              <input
                className="border-b outline-none bg-transparent"
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") setEditingField(null);
                }}
                onBlur={handleSave}
              />
            ) : (
              <p
                className="cursor-pointer hover:underline opacity-80 hover:opacity-100 transition"
                onClick={() => setEditingField("time")}
              >
                {time}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
