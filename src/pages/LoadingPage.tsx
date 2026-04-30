import { useTranslation } from "react-i18next";

export default function LoadingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-screen -mt-10">
      <div className="flex flex-col items-center animate-pulse">
        <img src="/images/logo.png" className="w-34" alt="logo" />

        <div className="flex flex-col text-sm text-center mt-2 max-w-xs">
          <span className="text-center font-semibold pb-2">
            {t("loading.coldStartMessage_p1")}
          </span>
          <span>{t("loading.coldStartMessage_p2")}</span>
        </div>
      </div>
    </div>
  );
}
