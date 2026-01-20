"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Package, RefreshCw, Trash2 } from "lucide-react";
import { useOrdersStore, Order } from "@/lib/orders-store";
import { useCartStore } from "@/lib/cart-store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<Order['status'], { label: string; color: string; icon: any }> = {
    pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-700', icon: Package },
    cooking: { label: 'Preparando', color: 'bg-orange-100 text-orange-700', icon: Clock },
    ready: { label: 'Listo', color: 'bg-green-100 text-green-700', icon: Package },
    delivered: { label: 'Entregado', color: 'bg-emerald-100 text-emerald-700', icon: Package },
    cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700', icon: Trash2 },
};

export default function OrdersPage() {
    const { orders, clearOrders } = useOrdersStore();
    const { addItem } = useCartStore();

    const handleReorder = (order: Order) => {
        order.items.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                addItem(item.product);
            }
        });
        alert('¡Productos agregados al carrito!');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-UY', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-stone-600 dark:text-stone-400" />
                    </Link>
                    <h1 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                        <Package size={20} /> Mis Pedidos
                    </h1>
                    {orders.length > 0 && (
                        <button
                            onClick={clearOrders}
                            className="text-xs text-stone-500 hover:text-red-500 transition-colors"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-4">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                            <Package size={32} className="text-stone-300 dark:text-stone-600" />
                        </div>
                        <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">Sin pedidos aún</h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-6">Tu historial de pedidos aparecerá aquí</p>
                        <Link
                            href="/express"
                            className="inline-flex items-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
                        >
                            <Package size={18} /> Hacer Pedido
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {orders.map((order) => {
                                const statusConfig = STATUS_CONFIG[order.status];
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden shadow-sm"
                                    >
                                        {/* Order Header */}
                                        <div className="p-4 border-b border-stone-100 dark:border-stone-700">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-mono text-stone-500 dark:text-stone-400">{order.id}</span>
                                                <span className={cn("text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1", statusConfig.color)}>
                                                    <StatusIcon size={12} /> {statusConfig.label}
                                                </span>
                                            </div>
                                            <p className="text-xs text-stone-500 dark:text-stone-400">{formatDate(order.createdAt)}</p>
                                        </div>

                                        {/* Order Items */}
                                        <div className="p-4 space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="text-stone-700 dark:text-stone-300">{item.quantity}x {item.product.name}</span>
                                                    <span className="text-stone-500 dark:text-stone-400">${item.product.price * item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Footer */}
                                        <div className="p-4 bg-stone-50 dark:bg-stone-800/50 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-stone-500 dark:text-stone-400">Total</p>
                                                <p className="text-xl font-bold text-stone-900 dark:text-white">${order.total}</p>
                                            </div>
                                            <button
                                                onClick={() => handleReorder(order)}
                                                className="flex items-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition"
                                            >
                                                <RefreshCw size={16} /> Repetir
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
