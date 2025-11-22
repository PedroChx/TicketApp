import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { ReactNode } from "react";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import MyTicketsPage from "./pages/MyTicketsPage";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas */}
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <EventsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/events/create"
            element={
              <PrivateRoute>
                <CreateEventPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/events/:eventId"
            element={
              <PrivateRoute>
                <EventDetailPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/tickets/mine"
            element={
              <PrivateRoute>
                <MyTicketsPage />
              </PrivateRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
