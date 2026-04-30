import { Link } from "react-router-dom";
import { logoutUser } from "../../services/authService";
import { useAuthStore } from "../../store/useAuthStore";
import LanguageToggle from "../LanguageToggle";
import ThemeToggle from "../ThemeToggle";
import Button from "../core/Button";

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const logoutApp = async () => {
    await logoutUser();
    await logout();
  };

  return (
    <header className="bg-navbar border-b border-border fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-6 md:px-10 py-3">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" width={40} alt="logo" />
          <span className="font-semibold text-lg hidden sm:block">
            <Link to="/calendar">
              MyAgenda
            </Link>
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />

          {/* USER SECTION */}
          {user && (
            <div className="flex items-center gap-3 ml-2 border-l border-border pl-3">
              {/* Name (hidden on small screens) */}
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-sm font-medium">{user.email}</span>
              </div>

              {/* Logout */}
              <Button variant="ghost" title="Logout" onClick={logoutApp} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
