'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
            <div className="max-w-md text-center space-y-6">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-ping opacity-75"></div>
                        <div className="relative p-4 bg-red-100 dark:bg-red-900/50 rounded-full text-red-600 dark:text-red-400">
                            <AlertCircle size={48} />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-bold font-serif">¡Ups! Algo salió mal.</h1>
                <p className="text-stone-600 dark:text-stone-400">
                    No te preocupes, esto es culpa nuestra. Tu café sigue a salvo.
                </p>

                <div className="p-4 bg-stone-100 dark:bg-stone-900 rounded-lg text-sm font-mono text-left overflow-auto max-h-32 opacity-70 border border-stone-200 dark:border-stone-800">
                    {error.message || "Error desconocido"}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-stone-200 dark:text-stone-900 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                    >
                        <RefreshCcw size={18} />
                        Intentar de nuevo
                    </button>
                    
                    <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors font-medium text-stone-700 dark:text-stone-300"
                    >
                        <Home size={18} />
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
