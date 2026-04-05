"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../core/Input";
import Select from "../core/Select";
import Button from "../core/Button";
import { schema, type FormDataModalAdd } from "../../zod/modal-add";
import type { Category } from "../../types/Category";

type Props = {
  onClose: () => void;
  onSubmit: (data: FormDataModalAdd) => void;
  categories: Category[];
};

export default function ModalAdd({ onClose, onSubmit, categories }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataModalAdd>({
    resolver: zodResolver(schema),
  });

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
            {...register("category")}
          />

          {/* Frequence */}
          <Select
            label="Visibility"
            options={[
              { label: "Only today", value: "today" },
              { label: "All week", value: "week" },
              { label: "Week + Weekend", value: "weekend" },
            ]}
            {...register("frequence")}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
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
