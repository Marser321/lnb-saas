"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChefHat, Clock, Coffee, Cake, UtensilsCrossed, Bell, Check, Timer,
    RefreshCw, User, ShoppingBag, LogOut, History, BarChart3, Settings,
    Volume2, VolumeX, AlertTriangle, ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getSession, clearSession, StaffMember, ROLE_PERMISSIONS, hasPermission
} from "@/lib/kds-auth";
import { PinLogin } from "@/components/kds/pin-login";

// ============================================
// TYPES
// ============================================

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';
type OrderSource = 'express' | 'studio' | 'lunch';
type ViewMode = 'active' | 'history';

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
    completedAt?: Date;
    estimatedTime: number;
}

// ============================================
// MOCK DATA
// ============================================

const INITIAL_ORDERS: Order[] = [
    {
        id: '1', orderNumber: 42, customerName: 'Mario M.', source: 'express', status: 'pending',
        items: [{ name: 'Café con Leche', quantity: 2 }, { name: 'Medialunas x3', quantity: 1 }, { name: 'Tostado J&Q', quantity: 1 }],
        createdAt: new Date(Date.now() - 3 * 60000), estimatedTime: 8
    },
    {
        id: '2', orderNumber: 43, customerName: 'Ana G.', source: 'studio', status: 'preparing',
        items: [{ name: 'Torta Chocolate (6 pers)', quantity: 1, notes: 'Sin nueces' }],
        createdAt: new Date(Date.now() - 15 * 60000), estimatedTime: 45
    },
    {
        id: '3', orderNumber: 44, customerName: 'Oficina Tech', source: 'lunch', status: 'pending',
        items: [{ name: 'Catering Executive x10', quantity: 1 }, { name: 'Servicio de Café', quantity: 1 }],
        createdAt: new Date(Date.now() - 1 * 60000), estimatedTime: 25
    },
    {
        id: '4', orderNumber: 41, customerName: 'Pedro L.', source: 'express', status: 'ready',
        items: [{ name: 'Americano', quantity: 1 }, { name: 'Brownie', quantity: 2 }],
        createdAt: new Date(Date.now() - 10 * 60000), estimatedTime: 5
    },
];

const SOURCE_CONFIG = {
    express: { icon: Coffee, color: 'bg-amber-500', label: 'Express', textColor: 'text-amber-700' },
    studio: { icon: Cake, color: 'bg-pink-500', label: 'Studio', textColor: 'text-pink-700' },
    lunch: { icon: UtensilsCrossed, color: 'bg-blue-500', label: 'Lunch', textColor: 'text-blue-700' },
};

const STATUS_CONFIG = {
    pending: { label: 'Nuevo', color: 'bg-red-500', textColor: 'text-red-500' },
    preparing: { label: 'Preparando', color: 'bg-amber-500', textColor: 'text-amber-500' },
    ready: { label: 'Listo', color: 'bg-emerald-500', textColor: 'text-emerald-500' },
    delivered: { label: 'Entregado', color: 'bg-stone-400', textColor: 'text-stone-400' },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getTimeAgo(date: Date): { text: string; isUrgent: boolean; isWarning: boolean } {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    const isUrgent = minutes >= 15;
    const isWarning = minutes >= 10 && minutes < 15;

    if (minutes < 1) return { text: 'Ahora', isUrgent, isWarning };
    if (minutes < 60) return { text: `${minutes}m`, isUrgent, isWarning };
    return { text: `${Math.floor(minutes / 60)}h ${minutes % 60}m`, isUrgent, isWarning };
}

// ============================================
// ORDER CARD COMPONENT
// ============================================

function OrderCard({
    order,
    staff,
    onStatusChange
}: {
    order: Order;
    staff: StaffMember;
    onStatusChange: (id: string, status: OrderStatus) => void;
}) {
    const source = SOURCE_CONFIG[order.source];
    const status = STATUS_CONFIG[order.status];
    const SourceIcon = source.icon;
    const timeInfo = getTimeAgo(order.createdAt);
    const canPrepare = hasPermission(staff, 'canPrepare');
    const canDeliver = hasPermission(staff, 'canDeliver');

    const nextStatus: Record<OrderStatus, OrderStatus | null> = {
        pending: 'preparing',
        preparing: 'ready',
        ready: 'delivered',
        delivered: null
    };

    const nextAction: Record<OrderStatus, string> = {
        pending: '▶ Comenzar',
        preparing: '✓ Listo!',
        ready: '📦 Entregar',
        delivered: ''
    };

    const canDoAction =
        (order.status === 'pending' && canPrepare) ||
        (order.status === 'preparing' && canPrepare) ||
        (order.status === 'ready' && canDeliver);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 100 }}
            className={cn(
                "bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all",
                order.status === 'pending' && "ring-2 ring-red-400",
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
                    <div className={cn(
                        "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                        timeInfo.isUrgent ? "bg-red-600 text-white" :
                            timeInfo.isWarning ? "bg-amber-600 text-white" : "bg-white/20 text-white"
                    )}>
                        {(timeInfo.isUrgent || timeInfo.isWarning) && <AlertTriangle size={10} />}
                        <Clock size={12} />
                        {timeInfo.text}
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
                    {nextStatus[order.status] && canDoAction && (
                        <button
                            onClick={() => onStatusChange(order.id, nextStatus[order.status]!)}
                            className={cn(
                                "px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md active:scale-95",
                                order.status === 'pending' && "bg-amber-500 text-white",
                                order.status === 'preparing' && "bg-emerald-500 text-white",
                                order.status === 'ready' && "bg-stone-800 text-white"
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

// ============================================
// STATS BAR COMPONENT
// ============================================

function StatsBar({ orders }: { orders: Order[] }) {
    const pending = orders.filter(o => o.status === 'pending').length;
    const preparing = orders.filter(o => o.status === 'preparing').length;
    const ready = orders.filter(o => o.status === 'ready').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;

    // Avg prep time (mock)
    const avgTime = 8;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-red-500">{pending}</p>
                <p className="text-xs text-red-400 font-medium">Nuevos</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-500">{preparing}</p>
                <p className="text-xs text-amber-400 font-medium">En Proceso</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-emerald-500">{ready}</p>
                <p className="text-xs text-emerald-400 font-medium">Listos</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-500">{avgTime}m</p>
                <p className="text-xs text-blue-400 font-medium">Tiempo Promedio</p>
            </div>
        </div>
    );
}

// ============================================
// MAIN KDS PAGE
// ============================================

export default function KitchenLivePage() {
    const [staff, setStaff] = useState<StaffMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [viewMode, setViewMode] = useState<ViewMode>('active');
    const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    // Check for existing session on mount
    useEffect(() => {
        const session = getSession();
        if (session) {
            setStaff(session.staff);
        }
        setIsLoading(false);
    }, []);

    // Auto-refresh timer
    useEffect(() => {
        const interval = setInterval(() => {
            setLastRefresh(new Date());
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleLogin = (loggedInStaff: StaffMember) => {
        setStaff(loggedInStaff);
    };

    const handleLogout = () => {
        clearSession();
        setStaff(null);
    };

    const handleStatusChange = (id: string, newStatus: OrderStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === id
                ? { ...order, status: newStatus, completedAt: newStatus === 'delivered' ? new Date() : undefined }
                : order
        ));
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-stone-900 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    // Show login if not authenticated
    if (!staff) {
        return <PinLogin onLogin={handleLogin} />;
    }

    // Filter orders based on view mode and status filter
    const filteredOrders = orders.filter(order => {
        if (viewMode === 'active') {
            return order.status !== 'delivered' && (filter === 'all' || order.status === filter);
        } else {
            return order.status === 'delivered';
        }
    });

    const roleConfig = ROLE_PERMISSIONS[staff.role];

    return (
        <div className="min-h-screen bg-stone-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-stone-900 text-white shadow-xl">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Left: Logo + Staff */}
                        <div className="flex items-center justify-between sm:justify-start gap-4">
                            <Link href="/" className="p-2 hover:bg-white/10 rounded-full transition">
                                <ArrowLeft size={20} />
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl">
                                    <ChefHat size={24} className="text-stone-900" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="font-bold text-lg leading-none">Kitchen Display</h1>
                                    <p className="text-stone-400 text-xs">Sistema de Gestión</p>
                                </div>
                            </div>

                            {/* Staff Badge */}
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                <span className="text-lg">{staff.avatar}</span>
                                <span className="text-sm font-medium">{staff.name}</span>
                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold", roleConfig.color)}>
                                    {roleConfig.label}
                                </span>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 justify-end">
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className="p-2 hover:bg-white/10 rounded-full transition"
                                title={soundEnabled ? "Silenciar" : "Activar sonido"}
                            >
                                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                            </button>
                            <button
                                onClick={() => setLastRefresh(new Date())}
                                className="p-2 hover:bg-white/10 rounded-full transition"
                                title="Actualizar"
                            >
                                <RefreshCw size={20} />
                            </button>
                            <div className="hidden sm:block text-right text-xs text-stone-400 px-2">
                                <p>Actualizado</p>
                                <p className="font-mono">{lastRefresh.toLocaleTimeString('es-UY')}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-red-500/20 text-red-400 rounded-full transition"
                                title="Cerrar Sesión"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Tab Bar */}
                    <div className="flex gap-2 mt-4 pb-2 overflow-x-auto">
                        {/* View Mode Tabs */}
                        <button
                            onClick={() => { setViewMode('active'); setFilter('all'); }}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                viewMode === 'active' ? "bg-white text-stone-900" : "bg-white/10 hover:bg-white/20"
                            )}
                        >
                            <ShoppingBag size={16} />
                            Activos ({orders.filter(o => o.status !== 'delivered').length})
                        </button>

                        {hasPermission(staff, 'canViewHistory') && (
                            <button
                                onClick={() => setViewMode('history')}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                    viewMode === 'history' ? "bg-white text-stone-900" : "bg-white/10 hover:bg-white/20"
                                )}
                            >
                                <History size={16} />
                                Historial
                            </button>
                        )}

                        <div className="flex-1" />

                        {/* Status Filters (only in active view) */}
                        {viewMode === 'active' && (
                            <>
                                <button
                                    onClick={() => setFilter('pending')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                        filter === 'pending' ? "bg-red-500 text-white" : "bg-white/10 hover:bg-white/20"
                                    )}
                                >
                                    <Bell size={14} />
                                    <span className="hidden sm:inline">Nuevos</span>
                                </button>
                                <button
                                    onClick={() => setFilter('preparing')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                        filter === 'preparing' ? "bg-amber-500 text-white" : "bg-white/10 hover:bg-white/20"
                                    )}
                                >
                                    <Timer size={14} />
                                    <span className="hidden sm:inline">En Proceso</span>
                                </button>
                                <button
                                    onClick={() => setFilter('ready')}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                                        filter === 'ready' ? "bg-emerald-500 text-white" : "bg-white/10 hover:bg-white/20"
                                    )}
                                >
                                    <Check size={14} />
                                    <span className="hidden sm:inline">Listos</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-4">
                {/* Stats Bar */}
                {hasPermission(staff, 'canViewStats') && viewMode === 'active' && (
                    <StatsBar orders={orders} />
                )}

                {/* Orders Grid */}
                {filteredOrders.length === 0 ? (
                    <div className="text-center py-20">
                        <ChefHat size={48} className="mx-auto text-stone-300 mb-4" />
                        <p className="text-stone-400 font-medium">
                            {viewMode === 'history' ? 'No hay pedidos en el historial' : 'No hay pedidos en esta categoría'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {filteredOrders.map(order => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    staff={staff}
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
