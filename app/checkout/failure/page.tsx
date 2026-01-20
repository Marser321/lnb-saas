"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { XCircle, RefreshCcw, Home, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

function FailureContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order');

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-red-100 mx-auto rounded-full flex items-center justify-center mb-6"
                >
                    <XCircle size={40} className="text-red-600" />
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-stone-900 mb-2"
                >
                    Pago No Procesado
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-stone-500 mb-6"
                >
                    Hubo un problema al procesar tu pago. No te preocupes, no se realizó ningún cargo.
                </motion.p>

                {/* Common Issues */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-stone-50 rounded-2xl p-4 mb-6 text-left"
                >
                    <p className="font-bold text-stone-700 mb-2">Posibles causas:</p>
                    <ul className="text-sm text-stone-600 space-y-1">
                        <li>• Fondos insuficientes</li>
                        <li>• Datos de tarjeta incorrectos</li>
                        <li>• Límite de compra excedido</li>
                        <li>• Conexión interrumpida</li>
                    </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                >
                    <Link
                        href="/checkout"
                        className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                    >
                        <RefreshCcw size={20} />
                        Intentar de Nuevo
                    </Link>
                    <Link
                        href="/"
                        className="w-full bg-stone-100 text-stone-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                    >
                        <Home size={18} />
                        Volver al Inicio
                    </Link>
                    <a
                        href="https://wa.me/59899123456?text=Hola, tuve un problema con mi pago"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-stone-500 py-2 font-medium flex items-center justify-center gap-2 hover:text-stone-700 transition-colors"
                    >
                        <MessageCircle size={18} />
                        Contactar Soporte
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function CheckoutFailurePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900" />
            </div>
        }>
            <FailureContent />
        </Suspense>
    );
}
