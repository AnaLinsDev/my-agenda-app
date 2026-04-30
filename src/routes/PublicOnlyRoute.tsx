import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";
import LoadingPage from "../pages/LoadingPage";

export default function PublicOnlyRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);

  if (loading) return <LoadingPage />;

  if (isAuthenticated) {
    return <Navigate to="/calendar" replace />;
  }

  return children;
}