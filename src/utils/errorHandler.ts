import toast from "react-hot-toast";
import i18n from "../i18n";
import { useAuthStore } from "../store/useAuthStore";

export type ApiError = {
  message: string;
  code?: string;
  status: number;
};

export function handleApiError(error: ApiError) {
  if (error.status === 401) {
    const publicPaths = ["/login", "/register"];
    const isPublicRoute = publicPaths.includes(window.location.pathname);

    if (!isPublicRoute) {
      const { logout } = useAuthStore.getState();

      logout();

      toast.error("Session expired");
      window.location.href = "/login";
    }

    return;
  }

  if (error.code) {
    const translated = i18n.t(`errors.${error.code}`);

    toast.error(
      translated !== `errors.${error.code}` ? translated : error.message,
    );

    return;
  }

  toast.error(error.message);
}
