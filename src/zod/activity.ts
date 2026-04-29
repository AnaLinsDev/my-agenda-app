import { z } from "zod";
import i18n from "../i18n";

export const ActivitySchemaUpdate = z.object({
  title: z
    .string()
    .min(1, i18n.t("validation.title_required"))
    .min(6, i18n.t("validation.title_min"))
    .max(128, i18n.t("validation.title_max")),
  date: z.string().min(1, i18n.t("validation.date_required")),
  time: z.string().min(1, i18n.t("validation.time_required")),
  category: z.enum(["personal", "work", "study", "health", "others"], {
    message: i18n.t("validation.category_required"),
  }),
  completed: z.boolean(),
});

export const ActivitySchema = z.object({
  title: z
    .string()
    .min(1, i18n.t("validation.title_required"))
    .min(6, i18n.t("validation.title_min"))
    .max(128, i18n.t("validation.title_max")),
  date: z.string().min(1, i18n.t("validation.date_required")),
  time: z.string().min(1, i18n.t("validation.time_required")),
  category: z.enum(["personal", "work", "study", "health", "others"], {
    message: i18n.t("validation.category_required"),
  }),
});

export type FormDataActivity = z.infer<typeof ActivitySchema>;
