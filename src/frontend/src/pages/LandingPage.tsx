// src/frontend/src/pages/LandingPage.tsx
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
            <div className="max-w-3xl w-full">
                <header className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        ScannMyTicket
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm md:text-base">
                        Administra eventos, genera tickets digitales y permite que tus
                        operadores validen accesos con códigos QR.
                    </p>
                </header>

                <div className="grid gap-6 md:grid-cols-[2fr,1.2fr] items-start">
                    <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Comienza ahora</h2>
                        <p className="text-sm text-slate-300 mb-5">
                            Elige cómo quieres entrar al sistema:
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                to="/login"
                                className="flex-1 inline-flex items-center justify-center rounded-xl bg-indigo-500 hover:bg-indigo-400 text-sm font-semibold py-2.5 transition-colors"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/register"
                                className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-700 hover:border-slate-500 text-sm font-semibold py-2.5 transition-colors"
                            >
                                Crear cuenta
                            </Link>
                        </div>
                    </section>

                    <aside className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 text-sm">
                        <h3 className="font-semibold mb-2">Vista rápida</h3>
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                            <li>Lista de eventos disponibles</li>
                            <li>Suscripción con generación de ticket</li>
                            <li>Panel para ver tus tickets</li>
                            <li>Operadores para validar accesos (futuro)</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
}
