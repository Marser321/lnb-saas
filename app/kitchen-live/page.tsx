"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ChefHat,
    Clock,
    Coffee,
    Cake,
    UtensilsCrossed,
    Bell,
    Check,
    Timer,
    RefreshCw,
    User,
    ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";

// Order Status Types
type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';
type OrderSource = 'express' | 'studio' | 'lunch';

interface OrderItem {
    name: string;
    quantity: number;
    notes?: string;
}

interface Order {
    id: string;
    orderNumber: number;
    customerName: string;
    source: OrderSource;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: Date;
    estimatedTime: number; // minutes
}

// Mock orders for demo
const INITIAL_ORDERS: Order[] = [
    {
        id: '1',
        orderNumber: 42,
        customerName: 'Mario M.',
        source: 'express',
        status: 'pending',
        items: [
            { name: 'Café con Leche', quantity: 2 },
            { name: 'Medialunas x3', quantity: 1 },
            { name: 'Tostado J&Q', quantity: 1 }
        ],
        createdAt: new Date(Date.now() - 3 * 60000),
        estimatedTime: 8
    },
    {
        id: '2',
        orderNumber: 43,
        customerName: 'Ana G.',
        source: 'studio',
        status: 'preparing',
        items: [
            { name: 'Torta Chocolate (6 pers)', quantity: 1, notes: 'Sin nueces' },
        ],
        createdAt: new Date(Date.now() - 15 * 60000),
        estimatedTime: 45
    },
    {
        id: '3',
        orderNumber: 44,
        customerName: 'Oficina Tech',
        source: 'lunch',
        status: 'pending',
        items: [
            { name: 'Catering Executive x10', quantity: 1 },
            { name: 'Servicio de Café', quantity: 1 }
        ],
        createdAt: new Date(Date.now() - 1 * 60000),
        estimatedTime: 25
    },
    {
        id: '4',
        orderNumber: 41,
        customerName: 'Pedro L.',
        source: 'express',
        status: 'ready',
        items: [
            { name: 'Americano', quantity: 1 },
            { name: 'Brownie', quantity: 2 }
        ],
        createdAt: new Date(Date.now() - 10 * 60000),
        estimatedTime: 5
    },
];

const SOURCE_CONFIG = {
    express: { icon: Coffee, color: 'bg-amber-500', label: 'Express', textColor: 'text-amber-700' },
    studio: { icon: Cake, color: 'bg-pink-500', label: 'Studio', textColor: 'text-pink-700' },
    lunch: { icon: UtensilsCrossed, color: 'bg-blue-500', label: 'Lunch', textColor: 'text-blue-700' },
};

const STATUS_CONFIG = {
    pending: { label: 'Nuevo', color: 'bg-red-500', ring: 'ring-red-500' },
    preparing: { label: 'Preparando', color: 'bg-amber-500', ring: 'ring-amber-400' },
    ready: { label: 'Listo', color: 'bg-emerald-500', ring: 'ring-emerald-400' },
    delivered: { label: 'Entregado', color: 'bg-stone-400', ring: 'ring-stone-300' },
};

function getTimeAgo(date: Date): string {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: OrderStatus) => void }) {
    const source = SOURCE_CONFIG[order.source];
    const status = STATUS_CONFIG[order.status];
    const SourceIcon = source.icon;
    const timeAgo = getTimeAgo(order.createdAt);

    const nextStatus: Record<OrderStatus, OrderStatus | null> = {
        pending: 'preparing',
        preparing: 'ready',
        ready: 'delivered',
        delivered: null
    };

    const nextAction: Record<OrderStatus, string> = {
        pending: 'Comenzar',
        preparing: 'Listo!',
        ready: 'Entregar',
        delivered: ''
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className={cn(
                "bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all",
                order.status === 'pending' && "ring-2 ring-red-400 animate-pulse",
                order.status === 'ready' && "ring-2 ring-emerald-400"
            )}
        >
            {/* Header */}
            <div className={cn("px-4 py-3 flex items-center justify-between", source.color)}>
                <div className="flex items-center gap-2 text-white">
                    <SourceIcon size={18} />
                    <span className="font-bold text-sm">{source.label}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                        <Clock size={12} />
                        {timeAgo}
                    </div>
                    <div className="bg-white/20 px-2 py-0.5 rounded-full text-white font-bold text-sm">
                        #{order.orderNumber}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
                {/* Customer */}
                <div className="flex items-center gap-2 text-stone-600">
                    <User size={14} />
                    <span className="font-medium text-sm">{order.customerName}</span>
                </div>

                {/* Items */}
                <div className="space-y-1">
                    {order.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm bg-stone-50 p-2 rounded-lg">
                            <span className="font-bold text-stone-800 min-w-[20px]">{item.quantity}x</span>
                            <div className="flex-1">
                                <span className="text-stone-700">{item.name}</span>
                                {item.notes && (
                                    <p className="text-xs text-amber-600 font-medium mt-0.5">⚠️ {item.notes}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status + Action */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className={cn("px-3 py-1 rounded-full text-white text-xs font-bold uppercase", status.color)}>
                        {status.label}
                    </div>
                    {nextStatus[order.status] && (
                        <button
                            onClick={() => onStatusChange(order.id, nextStatus[order.status]!)}
                            className={cn(
                                "px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md",
                                order.status === 'pending' && "bg-amber-500 text-white hover:bg-amber-600",
                                order.status === 'preparing' && "bg-emerald-500 text-white hover:bg-emerald-600",
                                order.status === 'ready' && "bg-stone-800 text-white hover:bg-stone-900"
                            )}
                        >
                            {nextAction[order.status]}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function KitchenLivePage() {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
    const [lastRefresh, setLastRefresh] = useState(new Date());

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setLastRefresh(new Date());
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = (id: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));

        // Notification sound effect (visual feedback for now)
        if (newStatus === 'ready') {
            // Could trigger a sound here
        }
    };

    const filteredOrders = filter === 'all'
        ? orders.filter(o => o.status !== 'delivered')
        : orders.filter(o => o.status === filter);

    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const preparingCount = orders.filter(o => o.status === 'preparing').length;
    const readyCount = orders.filter(o => o.status === 'ready').length;

    return (
        <div className="min-h-screen bg-stone-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-stone-900 text-white shadow-xl">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition">
                                <ArrowLeft size={20} />
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="bg-amber-500 p-2 rounded-xl">
                                    <ChefHat size={24} />
                                </div>
                                <div>
                                    <h1 className="font-bold text-lg">Kitchen Display</h1>
                                    <p className="text-stone-400 text-xs">La Nueva Brasil</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-stone-400">Última actualización</p>
                                <p className="text-sm font-mono">{lastRefresh.toLocaleTimeString('es-UY')}</p>
                            </div>
                            <button
                                onClick={() => setLastRefresh(new Date())}
                                className="p-2 hover:bg-white/10 rounded-full transition"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex gap-4 mt-4 pb-2 overflow-x-auto">
                        <button
                            onClick={() => setFilter('all')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                filter === 'all' ? "bg-white text-stone-900" : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            <ShoppingBag size={16} />
                            Todos ({orders.filter(o => o.status !== 'delivered').length})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                filter === 'pending' ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            <Bell size={16} />
                            Nuevos ({pendingCount})
                        </button>
                        <button
                            onClick={() => setFilter('preparing')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                filter === 'preparing' ? "bg-amber-500 text-white" : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            <Timer size={16} />
                            En Proceso ({preparingCount})
                        </button>
                        <button
                            onClick={() => setFilter('ready')}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                filter === 'ready' ? "bg-emerald-500 text-white" : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            <Check size={16} />
                            Listos ({readyCount})
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main className="max-w-7xl mx-auto p-4">
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-20">
                        <ChefHat size={48} className="mx-auto text-stone-300 mb-4" />
                        <p className="text-stone-400 font-medium">No hay pedidos en esta categoría</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filteredOrders.map(order => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
