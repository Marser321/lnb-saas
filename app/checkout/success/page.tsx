"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Home, Utensils, Sparkles, Gift } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "./confetti";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order') || 'N/A';
    const status = searchParams.get('status'); // Could be 'pending'
    const isPending = status === 'pending';

    // Generate a simple order number from the ID
    const orderNumber = orderId.startsWith('LNB-')
        ? orderId
        : `#${orderId.slice(-6).toUpperCase()}`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Confetti Animation */}
            {!isPending && <Confetti />}

            {/* Success Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative z-10"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${isPending ? 'bg-amber-100' : 'bg-emerald-100'
                        }`}
                >
                    {isPending ? (
                        <Clock size={40} className="text-amber-600" />
                    ) : (
                        <CheckCircle size={40} className="text-emerald-600" />
                    )}
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-stone-900 mb-2"
                >
                    {isPending ? '¡Pago Pendiente!' : '¡Pago Exitoso!'}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-stone-500 mb-6"
                >
                    {isPending
                        ? 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.'
                        : 'Gracias por tu compra. Tu pedido está siendo preparado.'}
                </motion.p>

                {/* Order Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-stone-50 rounded-2xl p-4 mb-6"
                >
                    <p className="text-xs text-stone-400 uppercase font-bold mb-1">Número de Orden</p>
                    <p className="text-2xl font-bold text-stone-900 font-mono">{orderNumber}</p>
                </motion.div>

                {/* Estimated Time */}
                {!isPending && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-2 text-stone-600 mb-6"
                    >
                        <Clock size={18} />
                        <span>Listo en aproximadamente <strong>15 minutos</strong></span>
                    </motion.div>
                )}

                {/* Crumb Club Points */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-4"
                >
                    <div className="p-3 bg-amber-100 rounded-xl">
                        <Sparkles size={24} className="text-amber-600" />
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-amber-800">¡Puntos Crumb Club!</p>
                        <p className="text-sm text-amber-700">
                            Ganaste puntos con esta compra. ¡Seguí sumando para canjear premios!
                        </p>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-3"
                >
                    <Link
                        href="/kitchen-live"
                        className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                    >
                        <Utensils size={20} />
                        Ver Estado del Pedido
                    </Link>
                    <Link
                        href="/"
                        className="w-full bg-stone-100 text-stone-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                    >
                        <Home size={18} />
                        Volver al Inicio
                    </Link>
                </motion.div>
            </motion.div>

            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-50 blur-xl" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-200 rounded-full opacity-50 blur-xl" />
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
