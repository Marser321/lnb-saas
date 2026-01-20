"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock analytics data
const SALES_DATA = [
    { day: 'Lun', sales: 12500 },
    { day: 'Mar', sales: 15200 },
    { day: 'Mié', sales: 18900 },
    { day: 'Jue', sales: 14300 },
    { day: 'Vie', sales: 22100 },
    { day: 'Sáb', sales: 28500 },
    { day: 'Dom', sales: 21000 },
];

const TOP_PRODUCTS = [
    { name: 'Espresso Doble', sales: 145, revenue: 14500 },
    { name: 'Medialunas (x3)', sales: 120, revenue: 18000 },
    { name: 'Tostado Mixto', sales: 98, revenue: 19600 },
    { name: 'Capuccino', sales: 87, revenue: 13050 },
    { name: 'Torta Chocolate', sales: 65, revenue: 22750 },
];

const PEAK_HOURS = [
    { hour: '7-8', orders: 12 },
    { hour: '8-9', orders: 45 },
    { hour: '9-10', orders: 38 },
    { hour: '10-11', orders: 22 },
    { hour: '11-12', orders: 15 },
    { hour: '12-13', orders: 52 },
    { hour: '13-14', orders: 48 },
    { hour: '14-15', orders: 25 },
    { hour: '15-16', orders: 18 },
    { hour: '16-17', orders: 35 },
    { hour: '17-18', orders: 42 },
    { hour: '18-19', orders: 28 },
];

export default function AnalyticsPage() {
    const [period, setPeriod] = useState<'week' | 'month'>('week');

    const totalSales = SALES_DATA.reduce((acc, d) => acc + d.sales, 0);
    const maxSales = Math.max(...SALES_DATA.map(d => d.sales));
    const maxOrders = Math.max(...PEAK_HOURS.map(h => h.orders));

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Analytics</h2>
                    <p className="text-stone-500">Métricas de rendimiento del negocio</p>
                </div>
                <div className="flex bg-stone-100 rounded-xl p-1">
                    <button
                        onClick={() => setPeriod('week')}
                        className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", period === 'week' ? "bg-white shadow text-stone-900" : "text-stone-500")}
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => setPeriod('month')}
                        className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all", period === 'month' ? "bg-white shadow text-stone-900" : "text-stone-500")}
                    >
                        Mes
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={DollarSign} label="Ventas Totales" value={`$${totalSales.toLocaleString()}`} change="+12.5%" positive />
                <StatCard icon={ShoppingCart} label="Pedidos" value="324" change="+8.2%" positive />
                <StatCard icon={Users} label="Clientes Nuevos" value="48" change="+15.3%" positive />
                <StatCard icon={Package} label="Ticket Promedio" value="$412" change="-2.1%" positive={false} />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-stone-900 flex items-center gap-2">
                            <BarChart3 size={18} className="text-amber-500" /> Ventas por Día
                        </h3>
                    </div>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {SALES_DATA.map((data) => (
                            <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-amber-400 to-amber-300 rounded-t-lg transition-all hover:from-amber-500 hover:to-amber-400"
                                    style={{ height: `${(data.sales / maxSales) * 100}%` }}
                                />
                                <span className="text-xs font-medium text-stone-500">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Peak Hours Chart */}
                <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-stone-900 flex items-center gap-2">
                            <Clock size={18} className="text-blue-500" /> Horarios Pico
                        </h3>
                    </div>
                    <div className="flex items-end justify-between h-48 gap-1">
                        {PEAK_HOURS.map((data) => (
                            <div key={data.hour} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className={cn(
                                        "w-full rounded-t-md transition-all",
                                        data.orders > 40 ? "bg-gradient-to-t from-red-400 to-red-300" :
                                            data.orders > 25 ? "bg-gradient-to-t from-amber-400 to-amber-300" :
                                                "bg-gradient-to-t from-blue-400 to-blue-300"
                                    )}
                                    style={{ height: `${(data.orders / maxOrders) * 100}%` }}
                                />
                                <span className="text-[10px] font-medium text-stone-400 -rotate-45">{data.hour.split('-')[0]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
                <h3 className="font-bold text-stone-900 flex items-center gap-2 mb-6">
                    <TrendingUp size={18} className="text-green-500" /> Top 5 Productos
                </h3>
                <div className="space-y-4">
                    {TOP_PRODUCTS.map((product, index) => (
                        <div key={product.name} className="flex items-center gap-4">
                            <span className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                index === 0 ? "bg-amber-100 text-amber-600" :
                                    index === 1 ? "bg-stone-200 text-stone-600" :
                                        index === 2 ? "bg-orange-100 text-orange-600" :
                                            "bg-stone-100 text-stone-500"
                            )}>
                                {index + 1}
                            </span>
                            <div className="flex-1">
                                <p className="font-medium text-stone-900">{product.name}</p>
                                <p className="text-xs text-stone-500">{product.sales} ventas</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-stone-900">${product.revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, change, positive }: { icon: any; label: string; value: string; change: string; positive: boolean }) {
    return (
        <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center">
                    <Icon size={20} className="text-stone-600" />
                </div>
                <span className={cn("text-xs font-bold px-2 py-1 rounded-full", positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600")}>
                    {change}
                </span>
            </div>
            <p className="text-2xl font-bold text-stone-900">{value}</p>
            <p className="text-sm text-stone-500">{label}</p>
        </div>
    );
}
