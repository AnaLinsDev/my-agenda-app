"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../core/Input";
import Select from "../core/Select";
import Button from "../core/Button";
import { schema, type FormDataModalAdd } from "../../zod/modal-add";
import type { Category } from "../../types/Category";
import { categoryStyles } from "../../utils/category-styles";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: () => void;
  onSubmit: (data: FormDataModalAdd) => void;
  categories: Category[];
};

export default function ModalAdd({ onClose, onSubmit, categories }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataModalAdd>({
    resolver: zodResolver(schema),
  });

  const { t } = useTranslation();
  const selectedCategory = watch("category");

  const categoryStyle =
    selectedCategory &&
    categoryStyles[selectedCategory as keyof typeof categoryStyles];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="w-full max-w-lg rounded-2xl bg-bg p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">{t("card.addActivity")}</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-2"
        >
          {/* Title */}
          <Input
            label={t("card.title")}
            placeholder="Activity title"
            errorMessage={errors.title?.message}
            variant={errors.title ? "error" : "default"}
            {...register("title")}
          />

          {/* Date */}
          <Input
            type="date"
            label={t("card.date")}
            variant={errors.date ? "error" : "default"}
            errorMessage={errors.date?.message}
            {...register("date")}
          />

          {/* Time */}
          <Input
            type="time"
            label={t("card.time")}
            variant={errors.time ? "error" : "default"}
            errorMessage={errors.time?.message}
            {...register("time")}
          />

          {/* Category */}
          <Select
            label={t("card.category")}
            options={categories.map((cat) => ({
              label: t(`categoryList.${cat.id}`),
              value: cat.id,
            }))}
            className={categoryStyle ? `${categoryStyle.bg} text-text-h` : ""}
            {...register("category")}
          />

          <div></div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <Button
              title={t("card.buttons.cancel")}
              type="button"
              variant="ghost"
              onClick={onClose}
            />

            <Button title={t("card.buttons.create")} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
