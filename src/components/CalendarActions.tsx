import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useActivitiesStore } from "../store/useActivitiesStore";

import Button from "./core/Button";
import Select from "./core/Select";
import ModalAdd from "./modal/ModalAdd";

import { categoryStyles } from "../utils/category-styles";
import { useTranslation } from "react-i18next";
import type { Activity } from "../types/Activity";

export default function CalendarActions() {
  const { t } = useTranslation();

  const { categories } = useCategories();

  const { setFilters } = useActivitiesStore();

  const [openModal, setOpenModal] = useState(false);

  // controlled UI state
  const [category, setCategory] = useState<string>("all");
  const [completed, setCompleted] = useState<string>("all");

  return (
    <div className="flex flex-col-reverse gap-6 py-0 md:flex-row md:items-end md:justify-between">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mr-6">
          {/* CATEGORY */}
          <Select
            label={t("category")}
            options={[
              { label: t("categoryList.all"), value: "all" },
              ...categories.map((cat) => ({
                label: t(`categoryList.${cat.id}`),
                value: cat.id,
              })),
            ]}
            value={category}
            className={
              category in categoryStyles
                ? `${
                    categoryStyles[category as keyof typeof categoryStyles].bg
                  } text-text-h`
                : ""
            }
            onChange={(e) => {
              const value = e.target.value as Activity["category"] | "all";

              setCategory(value);

              setFilters({
                category: value === "all" ? undefined : value,
              });
            }}
          />

          {/* COMPLETED */}
          <Select
            label={t("completed")}
            options={[
              { label: t("completedList.all"), value: "all" },
              { label: t("completedList.true"), value: "true" },
              { label: t("completedList.false"), value: "false" },
            ]}
            value={completed}
            onChange={(e) => {
              const value = e.target.value as "all" | "true" | "false";

              setCompleted(value);

              setFilters({
                completed: value === "all" ? undefined : value === "true",
              });
            }}
          />
        </div>

        <Button
          title={t("addActivity")}
          variant="ghost"
          onClick={() => setOpenModal(true)}
        />
      </div>

      {/* MODAL */}
      {openModal && (
        <ModalAdd onClose={() => setOpenModal(false)} categories={categories} />
      )}
    </div>
  );
}
