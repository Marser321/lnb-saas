"use client";

import { useState } from "react";
import { X, Search, Filter, MoreHorizontal, ArrowUpDown, Plus, Clock, User, FileText, DollarSign, AlertCircle, CheckCircle, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// MOCK DATA
// ============================================

interface Order {
    id: string;
    customer: string;
    items: string;
    total: number;
    status: 'pending' | 'cooking' | 'ready' | 'completed' | 'cancelled';
    time: string;
    note?: string;
    payment: 'MercadoPago' | 'Efectivo';
}

const INITIAL_ORDERS: Order[] = [
    { id: '#1532S6', customer: 'Juan Perez', items: '2x Café Latte, 1x Medialunas', total: 460, status: 'pending', time: '10:30', note: 'Leche descremada por favor', payment: 'MercadoPago' },
    { id: '#1532S5', customer: 'Ana Silva', items: '1x Tostado Mixto', total: 220, status: 'cooking', time: '10:15', payment: 'Efectivo' },
    { id: '#1532S4', customer: 'Carlos Ruiz', items: '3x Empanadas', total: 280, status: 'ready', time: '09:45', payment: 'MercadoPago' },
    { id: '#1532S3', customer: 'Maria Diaz', items: '1x Cappuccino, 1x Alfajor', total: 310, status: 'completed', time: '09:30', payment: 'MercadoPago' },
];

// ============================================
// COMPONENT
// ============================================

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleUpdateStatus = (id: string, newStatus: Order['status']) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
        setSelectedOrder(null);
    };

    const handleCancelOrder = (id: string) => {
        if (confirm('¿Estás seguro de cancelar este pedido?')) {
            handleUpdateStatus(id, 'cancelled');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-orange-500';
            case 'cooking': return 'bg-blue-500';
            case 'ready': return 'bg-emerald-500';
            case 'completed': return 'bg-stone-500';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-stone-500';
        }
    };

    const columns: { id: Order['status'] | 'cancelled', label: string, color: string, bg: string }[] = [
        { id: 'pending', label: 'Pendientes', color: 'orange-500', bg: 'bg-orange-50 border-orange-100' },
        { id: 'cooking', label: 'En Cocina', color: 'blue-500', bg: 'bg-blue-50 border-blue-100' },
        { id: 'ready', label: 'Listos', color: 'emerald-500', bg: 'bg-emerald-50 border-emerald-100' },
        { id: 'completed', label: 'Completados', color: 'stone-500', bg: 'bg-stone-100 border-stone-200' },
    ];

    return (
        <div className="space-y-6 h-full flex flex-col">
            <header className="flex justify-between items-center shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800">Pedidos</h1>
                    <p className="text-stone-500">Gestión de órdenes en tiempo real</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-stone-50 font-medium transition-colors">
                        <Filter size={18} /> Filtrar
                    </button>
                    <button className="bg-stone-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-black font-bold shadow-lg transition-all hover:scale-105">
                        <Plus size={18} /> Nueva Orden Manual
                    </button>
                </div>
            </header>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-[1000px] h-full">
                    {columns.map(col => (
                        <div key={col.id} className={cn("flex-1 rounded-3xl p-4 flex flex-col h-full border", col.bg)}>
                            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
                                <h3 className="font-bold text-stone-700 flex items-center gap-2">
                                    <span className={cn("w-2 h-2 rounded-full", `bg-${col.color}`)}></span> {col.label}
                                </h3>
                                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-stone-400 border border-stone-100 shadow-sm">
                                    {orders.filter(o => o.status === col.id).length}
                                </span>
                            </div>

                            <div className="space-y-3 overflow-y-auto flex-1 pr-1 custom-scrollbar">
                                <AnimatePresence mode="popLayout">
                                    {orders.filter(o => o.status === col.id).map(order => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            key={order.id}
                                            onClick={() => setSelectedOrder(order)}
                                            className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md cursor-pointer transition-all hover:border-stone-300 group"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">{order.id}</span>
                                                <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                                                    <Clock size={12} /> {order.time}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-stone-800 mb-1">{order.customer}</h4>
                                            <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">{order.items}</p>

                                            {order.note && (
                                                <div className="mb-3 flex items-start gap-1 p-2 bg-amber-50 rounded-lg border border-amber-100/50">
                                                    <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                                                    <p className="text-[10px] text-amber-700 font-medium line-clamp-1">{order.note}</p>
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                                                <span className="font-bold text-stone-900">${order.total}</span>
                                                <div className="text-[10px] text-stone-400 font-medium px-2 py-1 bg-stone-50 rounded-full border border-stone-100">
                                                    {order.payment}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {orders.filter(o => o.status === col.id).length === 0 && (
                                    <div className="h-full flex items-center justify-center text-stone-400/50 text-sm font-medium italic border-2 border-dashed border-stone-200/50 rounded-2xl">
                                        No hay pedidos
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                                <div>
                                    <h3 className="font-bold text-xl text-stone-800 flex items-center gap-2">
                                        Orden {selectedOrder.id}
                                    </h3>
                                    <p className="text-xs text-stone-500">{selectedOrder.time} • {selectedOrder.payment}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6 overflow-y-auto">
                                {/* Status Actions */}
                                <div className="grid grid-cols-4 gap-2">
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                                        className={cn("p-2 rounded-xl border-2 text-center transition-all", selectedOrder.status === 'pending' ? "border-orange-500 bg-orange-50 text-orange-700" : "border-stone-100 hover:bg-stone-50")}
                                    >
                                        <div className="w-full h-1 bg-orange-500 rounded-full mb-1 mx-auto max-w-[20px]" />
                                        <span className="text-[10px] font-bold block">Pendiente</span>
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'cooking')}
                                        className={cn("p-2 rounded-xl border-2 text-center transition-all", selectedOrder.status === 'cooking' ? "border-blue-500 bg-blue-50 text-blue-700" : "border-stone-100 hover:bg-stone-50")}
                                    >
                                        <div className="w-full h-1 bg-blue-500 rounded-full mb-1 mx-auto max-w-[20px]" />
                                        <span className="text-[10px] font-bold block">Cocina</span>
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'ready')}
                                        className={cn("p-2 rounded-xl border-2 text-center transition-all", selectedOrder.status === 'ready' ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-stone-100 hover:bg-stone-50")}
                                    >
                                        <div className="w-full h-1 bg-emerald-500 rounded-full mb-1 mx-auto max-w-[20px]" />
                                        <span className="text-[10px] font-bold block">Listo</span>
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                                        className={cn("p-2 rounded-xl border-2 text-center transition-all", selectedOrder.status === 'completed' ? "border-stone-500 bg-stone-100 text-stone-700" : "border-stone-100 hover:bg-stone-50")}
                                    >
                                        <div className="w-full h-1 bg-stone-500 rounded-full mb-1 mx-auto max-w-[20px]" />
                                        <span className="text-[10px] font-bold block">Fin</span>
                                    </button>
                                </div>

                                {/* Customer Info */}
                                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-400 border border-stone-100 shadow-sm">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-stone-900">{selectedOrder.customer}</p>
                                        <p className="text-xs text-stone-500">Cliente Frecuente (Nivel Silver)</p>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div>
                                    <h4 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
                                        <FileText size={16} /> Detalle del Pedido
                                    </h4>
                                    <div className="bg-white border-2 border-dashed border-stone-200 rounded-2xl p-4 space-y-3">
                                        {selectedOrder.items.split(', ').map((item, i) => (
                                            <div key={i} className="flex justify-between items-start text-sm">
                                                <span className="text-stone-700">• {item}</span>
                                            </div>
                                        ))}

                                        {selectedOrder.note && (
                                            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
                                                <strong>Nota:</strong> {selectedOrder.note}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-stone-500 font-bold">Total a cobrar</span>
                                    <span className="text-2xl font-bold text-stone-900">${selectedOrder.total}</span>
                                </div>
                            </div>

                            <div className="p-6 bg-stone-50 border-t border-stone-100 flex gap-3">
                                <button
                                    onClick={() => handleCancelOrder(selectedOrder.id)}
                                    className="flex-1 px-4 py-3 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Ban size={18} /> Cancelar
                                </button>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="flex-1 px-4 py-3 rounded-xl font-bold bg-stone-900 text-white hover:bg-black transition-colors shadow-lg"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
