import { useState } from "react";
import { useTranslation } from "react-i18next";

import { registerUser, loginUser } from "../../services/authService";

import Input from "../../components/core/Input";
import Button from "../../components/core/Button";
import { schema, type FormDataAuthRegister } from "../../zod/auth";
import { useAuthStore } from "../../store/useAuthStore";
import ThemeToggle from "../../components/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const { t } = useTranslation();
  const checkAuth = useAuthStore((s) => s.checkAuth);

  const [mode, setMode] = useState<AuthMode>("register");

  const [formData, setFormData] = useState<FormDataAuthRegister>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataAuthRegister>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormDataAuthRegister, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "register" ? "login" : "register"));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<FormDataAuthRegister> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormDataAuthRegister;
        fieldErrors[field] = err.message; // you can translate later if needed
      });

      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      if (mode === "register") {
        await registerUser(result.data);
      } else {
        await loginUser(result.data);
        await checkAuth();
      }
    } finally {
      setLoading(false);
    }
  };

  const isRegister = mode === "register";

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-card border border-border rounded-3xl p-8 shadow-custom flex flex-col gap-5"
      >
        {/* Header */}
        <div className="flex flex-col gap-1 text-center">
          <div className="flex justify-between items-center">
            <span />

            <h2 className="text-2xl font-semibold text-text-h">
              {isRegister
                ? t("signup.titleRegister")
                : t("signup.titleLogin")}
            </h2>

            <div className="flex flex-col items-center gap-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          <p className="text-sm text-text">
            {isRegister
              ? t("signup.subtitleRegister")
              : t("signup.subtitleLogin")}
          </p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          <Input
            label={t("signup.email")}
            type="email"
            placeholder={t("signup.emailPlaceholder")}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            errorMessage={errors.email}
            variant={errors.email ? "error" : "default"}
          />

          <Input
            label={t("signup.password")}
            type="password"
            placeholder={t("signup.passwordPlaceholder")}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            errorMessage={errors.password}
            variant={errors.password ? "error" : "default"}
          />
        </div>

        {/* Button */}
        <Button
          type="submit"
          title={
            loading
              ? t("signup.loading")
              : isRegister
              ? t("signup.registerButton")
              : t("signup.loginButton")
          }
          disabled={loading}
        />

        {/* Divider */}
        <div className="text-center text-sm text-text">
          {isRegister
            ? t("signup.alreadyHaveAccount")
            : t("signup.noAccount")}
        </div>

        {/* Toggle */}
        <button
          type="button"
          onClick={toggleMode}
          className="text-sm font-medium text-accent hover:underline"
        >
          {isRegister
            ? t("signup.goToLogin")
            : t("signup.goToRegister")}
        </button>
      </form>
    </div>
  );
}