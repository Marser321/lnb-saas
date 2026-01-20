"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Login for now (Replace with Supabase later)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple mock check
        if (email === "admin@lnb.com" && password === "admin") {
            router.push("/admin/dashboard");
        } else {
            alert("Credenciales inválidas (Prueba: admin@lnb.com / admin)");
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-stone-900 p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-stone-600" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-stone-900">Admin Panel</h2>
                    <p className="mt-2 text-sm text-stone-500">Inicia sesión para gestionar LNB</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <input
                                type="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-3 px-3 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-3 px-3 text-stone-900 ring-1 ring-inset ring-stone-300 placeholder:text-stone-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-md bg-stone-900 px-3 py-3 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600 disabled:opacity-70"
                        >
                            {loading ? "Entrando..." : "Ingresar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
