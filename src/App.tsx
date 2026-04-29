import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";

import Register from "./pages/SignUpPage";
import Calendar from "./pages/CalendarPage";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toaster position="top-right" />
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
