import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useActivities } from "../../hooks/useActivities";
import { useActivitiesStore } from "../../store/useActivitiesStore";

import Button from "../core/Button";
import Select from "../core/Select";
import LanguageToggle from "../LanguageToggle";
import ThemeToggle from "../ThemeToggle";
import ModalAdd from "../modal/ModalAdd";

import type { FormDataModalAdd } from "../../zod/modal-add";
import { categoryStyles } from "../../utils/category-styles";

import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();

  const { categories } = useCategories();
  const { addActivity } = useActivities();
  const setFilters = useActivitiesStore((s) => s.setFilters);

  const [open, setOpen] = useState(false);

  // ✅ controlled states
  const [category, setCategory] = useState<string>("all");
  const [completed, setCompleted] = useState<string>("all");

  const handleCreate = async (data: FormDataModalAdd) => {
    await addActivity(data);
    setOpen(false);
  };

  return (
    <div className="flex flex-col-reverse gap-6 py-6 md:flex-row md:items-end md:justify-between">
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
                ? `${categoryStyles[category as keyof typeof categoryStyles].bg} text-text-h`
                : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              setCategory(value);

              setFilters({
                category: value,
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
              const value = e.target.value;
              setCompleted(value);

              setFilters({
                completed: value,
              });
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <ThemeToggle />
        <LanguageToggle />
        <Button
          title={t("addActivity")}
          variant="ghost"
          onClick={() => setOpen(true)}
        />
      </div>

      {/* MODAL */}
      {open && (
        <ModalAdd
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
          categories={categories}
        />
      )}
    </div>
  );
}
