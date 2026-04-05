import "./App.css";
import ExampleZustand from "./components/ExampleZustand";
import LanguageToggle from "./components/LanguageToggle";
import ThemeToggle from "./components/ThemeToggle";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-accent-bg text-white p-4 rounded-xl">
        {t("welcome")}
        <ThemeToggle />
        <LanguageToggle />
        <br />
        <div>
          <ExampleZustand />
        </div>
      </div>
    </>
  );
}

export default App;
