// frontend/src/App.tsx
import { Routes, Route, Navigate, Link } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Layout() {
  const { user, logout, loading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="flex items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <span className="font-bold">ScannMyTicket</span>
          <nav className="flex gap-3 text-sm">
            <Link to="/events" className="text-blue-600 hover:underline">
              Eventos
            </Link>
            <Link
              to="/my-tickets"
              className="text-blue-600 hover:underline"
            >
              Mis tickets
            </Link>
          </nav>
        </div>

        <div className="text-xs flex items-center gap-2">
          {loading ? (
            <span>Cargando usuario...</span>
          ) : user ? (
            <>
              <span>{user.email}</span>
              <button
                onClick={logout}
                className="px-2 py-1 rounded bg-red-500 text-white"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-2 py-1 rounded bg-indigo-600 text-white"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 p-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
