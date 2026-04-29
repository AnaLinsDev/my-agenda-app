import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg mt-2">{t("notFound.title")}</p>

      <div className="flex gap-4 mt-4">
        <Link to="/calendar" className="px-4 py-2 rounded underline">
          {t("notFound.goHome")}
        </Link>
      </div>
    </div>
  );
}
