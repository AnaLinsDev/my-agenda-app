import { z } from "zod";
import i18n from "../i18n";

export const schema = z.object({
  email: z
    .string()
    .min(1, i18n.t("validation.email_required"))
    .email(i18n.t("validation.invalid_email")),

  password: z
    .string()
    .min(6, i18n.t("validation.password_min")),
});

export type FormDataAuthRegister = z.infer<typeof schema>;