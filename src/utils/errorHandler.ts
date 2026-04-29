import toast from "react-hot-toast";
import i18n from "../i18n";
import { useAuthStore } from "../store/useAuthStore";

type ApiError = {
  message: string;
  code?: string;
  status: number;
};

export function handleApiError(error: ApiError) {
  console.error("API Error:", error);

  if (error.status === 401) {
    const { logout } = useAuthStore.getState();
    logout();

    const publicPaths = ["/login", "/register"];

    if (!publicPaths.includes(window.location.pathname)) {
      toast.error("Session expired");
      window.location.href = "/login";
    }

    return;
  }

  // traduz via code
  if (error.code) {
    const translated = i18n.t(`errors.${error.code}`);
    toast.error(
      translated !== `errors.${error.code}`
        ? translated
        : error.message
    );

    return;
  }

  toast.error(error.message);
}