import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser, loginUser } from "../services/authService";

import Input from "../components/core/Input";
import Button from "../components/core/Button";
import { schema, type FormDataAuthRegister } from "../zod/auth";
import { useAuthStore } from "../store/useAuthStore";
import LanguageToggle from "../components/LanguageToggle";
import ThemeToggle from "../components/ThemeToggle";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const checkAuth = useAuthStore((s) => s.checkAuth);

  const [mode, setMode] = useState<AuthMode>("register");

  const [formData, setFormData] = useState<FormDataAuthRegister>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataAuthRegister>>({});
  const [loading, setLoading] = useState(false);

  const isRegister = mode === "register";

  const handleChange = (field: keyof FormDataAuthRegister, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "register" ? "login" : "register"));
    resetForm();
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
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      if (mode === "register") {
        await registerUser(result.data);

        toast.success(t("toast.registerSuccess"));

        resetForm();
        setMode("login");
      } else {
        await loginUser(result.data);
        await checkAuth();

        toast.success(t("toast.loginSuccess"));

        navigate("/calendar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-4 flex flex-row justify-end">
        <div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="p-0 flex flex-col items-center mt-10 w-30 lg:w-50">
        <img src="/images/logo.png" width={200} alt="logo" />
      </div>
      <div className="flex items-center justify-center bg-bg px-4 max-w-lg w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-card-login border border-border rounded-3xl p-8 shadow-custom flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex flex-col gap-1 text-center">
            <div className="flex flex-row justify-center">
              <h2 className="text-2xl font-semibold text-text-h">
                {isRegister
                  ? t("signup.titleRegister")
                  : t("signup.titleLogin")}
              </h2>
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
              errorMessage={errors.email && t(errors.email)}
              variant={errors.email ? "error" : "default"}
            />

            <Input
              label={t("signup.password")}
              type="password"
              placeholder={t("signup.passwordPlaceholder")}
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              errorMessage={errors.password && t(errors.password)}
              variant={errors.password ? "error" : "default"}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            title={
              loading
                ? t("signup.loading")
                : isRegister
                  ? t("signup.registerButton")
                  : t("signup.loginButton")
            }
            className="w-40 mx-auto"
            size="lg"
            disabled={loading}
          />

          <div className="flex flex-row justify-center gap-2">
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
              {isRegister ? t("signup.goToLogin") : t("signup.goToRegister")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
