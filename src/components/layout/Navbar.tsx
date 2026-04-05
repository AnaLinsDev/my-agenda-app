import { useCategories } from "../../hooks/useCategories";
import Button from "../core/Button";
import Input from "../core/Input";
import Select from "../core/Select";
import LanguageToggle from "../LanguageToggle";
import ThemeToggle from "../ThemeToggle";
import ModalAdd from "../modal/ModalAdd";
import { useState } from "react";
import type { FormDataModalAdd } from "../../zod/modal-add";

export default function Navbar() {
  const { categories } = useCategories();
  const [open, setOpen] = useState(false);

  const handleCreate = (data: FormDataModalAdd) => {
    console.log("FORM DATA:", data);
    setOpen(false);
  };

  return (
    <div className="flex flex-col-reverse gap-6 py-6 md:flex-row md:items-end md:justify-between">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mr-6">
          <Select
            label="Categoria"
            options={categories.map((cat) => ({
              label: cat.id,
              value: cat.id,
            }))}
          />

          <Input label="Start" type="date" />
          <Input label="End" type="date" />
        </div>

        {/* Button */}
        <div className="flex justify-center md:justify-start">
          <Button title="Filtrar" variant="secondary" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <ThemeToggle />
        <LanguageToggle />
        <Button
          title="+ Atividade"
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
