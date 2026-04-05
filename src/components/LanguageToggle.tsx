import { useTranslation } from "react-i18next";
import Button from "./core/Button";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <Button
      variant="ghost"
      title={`🌍 ${i18n.language.toUpperCase()}`}
      onClick={toggleLanguage}
    />
  );
}
