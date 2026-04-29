import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";

export default function PublicOnlyRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);

  if (loading) return <p>Loading...</p>;

  if (isAuthenticated) {
    return <Navigate to="/calendar" replace />;
  }

  return children;
}