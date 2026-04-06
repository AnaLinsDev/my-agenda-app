"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../core/Input";
import Select from "../core/Select";
import Button from "../core/Button";
import { schema, type FormDataModalAdd } from "../../zod/modal-add";
import type { Category } from "../../types/Category";
import { categoryStyles } from "../../utils/category-styles";

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

  const selectedCategory = watch("category");

  const categoryStyle =
    selectedCategory &&
    categoryStyles[selectedCategory as keyof typeof categoryStyles];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="w-full max-w-lg rounded-2xl bg-bg p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Add Activity</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-2"
        >
          {/* Title */}
          <Input
            label="Title"
            placeholder="Activity title"
            errorMessage={errors.title?.message}
            variant={errors.title ? "error" : "default"}
            {...register("title")}
          />

          {/* Date */}
          <Input
            type="date"
            label="Date"
            variant={errors.date ? "error" : "default"}
            errorMessage={errors.date?.message}
            {...register("date")}
          />

          {/* Time */}
          <Input
            type="time"
            label="Time"
            variant={errors.time ? "error" : "default"}
            errorMessage={errors.time?.message}
            {...register("time")}
          />

          {/* Category */}
          <Select
            label="Category"
            options={categories.map((cat) => ({
              label: cat.id,
              value: cat.id,
            }))}
            className={categoryStyle ? `${categoryStyle.bg} text-text-h` : ""}
            {...register("category")}
          />

          <div></div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <Button
              title="Cancel"
              type="button"
              variant="ghost"
              onClick={onClose}
            />

            <Button title="Create" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
