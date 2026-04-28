import { z } from "zod";
import i18n from "../i18n";

export const schema = z.object({
  title: z.string().min(2, i18n.t("validation.title_required")),
  date: z.string().min(1, i18n.t("validation.date_required")),
  time: z.string().min(1, i18n.t("validation.time_required")),
  category: z.enum(["personal", "work", "study", "health", "others"], {
    message: i18n.t("validation.category_required"),
  }),
});

export type FormDataModalAdd = z.infer<typeof schema>;
