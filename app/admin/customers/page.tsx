"use client";

import { useState } from "react";
import {
    Search,
    Crown,
    TrendingUp,
    ShoppingBag,
    Gift,
    MoreVertical,
    X,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit2,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LOYALTY_LEVELS, getLevelForPoints, formatPoints } from "@/lib/loyalty";
import { motion, AnimatePresence } from "framer-motion";

// ============================================
// MOCK DATA
// ============================================

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    points: number;
    totalSpent: number;
    ordersCount: number;
    lastOrder: string;
    memberSince: string;
    notes?: string;
}

const MOCK_CUSTOMERS: Customer[] = [
    {
        id: '1',
        name: 'María García',
        email: 'maria@email.com',
        phone: '+598 99 123 456',
        address: 'Av. Brasil 1234, Pocitos',
        points: 650,
        totalSpent: 6500,
        ordersCount: 32,
        lastOrder: '2024-01-15',
        memberSince: '2023-06-10',
        notes: 'Le gusta el café muy caliente. Alérgica a las nueces.'
    },
    {
        id: '2',
        name: 'Juan Rodríguez',
        email: 'juan.r@email.com',
        phone: '+598 99 234 567',
        points: 320,
        totalSpent: 3200,
        ordersCount: 18,
        lastOrder: '2024-01-14',
        memberSince: '2023-08-20',
    },
    {
        id: '3',
        name: 'Ana López',
        email: 'ana.lopez@email.com',
        phone: '+598 99 345 678',
        points: 180,
        totalSpent: 1800,
        ordersCount: 9,
        lastOrder: '2024-01-10',
        memberSince: '2023-11-05',
    },
    {
        id: '4',
        name: 'Carlos Fernández',
        email: 'carlos.f@email.com',
        phone: '+598 99 456 789',
        points: 85,
        totalSpent: 850,
        ordersCount: 5,
        lastOrder: '2024-01-08',
        memberSince: '2024-01-01',
    },
    {
        id: '5',
        name: 'Laura Martínez',
        email: 'laura.m@email.com',
        phone: '+598 99 567 890',
        points: 450,
        totalSpent: 4500,
        ordersCount: 24,
        lastOrder: '2024-01-16',
        memberSince: '2023-07-15',
    },
];

// ============================================
// COMPONENT
// ============================================

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase());

        if (levelFilter === 'all') return matchesSearch;

        const level = getLevelForPoints(customer.points);
        return matchesSearch && level.id === levelFilter;
    });

    const totalCustomers = customers.length;
    const totalPoints = customers.reduce((sum, c) => sum + c.points, 0);
    const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrderValue = Math.round(totalSpent / (customers.reduce((sum, c) => sum + c.ordersCount, 0) || 1));

    const handleDelete = (id: string) => {
        if (confirm("¿Eliminar cliente?")) {
            setCustomers(prev => prev.filter(c => c.id !== id));
            setSelectedCustomer(null);
        }
    };

    return (
        <>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-stone-800">Clientes</h2>
                    <p className="text-stone-500">Base de clientes y Crumb Club</p>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between">
                    <Crown size={24} className="text-amber-500 mb-2" />
                    <div>
                        <p className="text-3xl font-bold text-stone-900">{totalCustomers}</p>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wide">Activos</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between">
                    <Gift size={24} className="text-emerald-500 mb-2" />
                    <div>
                        <p className="text-3xl font-bold text-stone-900">{formatPoints(totalPoints)}</p>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wide">Puntos Totales</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between">
                    <TrendingUp size={24} className="text-blue-500 mb-2" />
                    <div>
                        <p className="text-3xl font-bold text-stone-900">${totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wide">Ventas Totales</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between">
                    <ShoppingBag size={24} className="text-purple-500 mb-2" />
                    <div>
                        <p className="text-3xl font-bold text-stone-900">${avgOrderValue}</p>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wide">Ticket Promedio</p>
                    </div>
                </div>
            </div>

            {/* Level Distribution */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 mb-6">
                <h3 className="font-bold text-stone-700 mb-3 text-sm uppercase px-2">Distribución por Nivel</h3>
                <div className="flex gap-4">
                    {LOYALTY_LEVELS.map((level) => {
                        const count = customers.filter(c => getLevelForPoints(c.points).id === level.id).length;
                        const percentage = Math.round((count / customers.length) * 100) || 0;

                        return (
                            <button
                                key={level.id}
                                onClick={() => setLevelFilter(levelFilter === level.id ? 'all' : level.id)}
                                className={cn(
                                    "flex-1 p-4 rounded-xl border-2 transition-all text-center group",
                                    levelFilter === level.id
                                        ? "border-stone-900 bg-stone-900 text-white shadow-lg scale-105"
                                        : "border-stone-100 hover:border-stone-300 hover:bg-stone-50"
                                )}
                            >
                                <span className="text-4xl mb-2 block group-hover:scale-110 transition-transform">{level.emoji}</span>
                                <p className={cn("font-bold text-2xl mb-1", levelFilter === level.id ? "text-white" : "text-stone-900")}>{count}</p>
                                <p className={cn("text-xs uppercase font-bold tracking-wider", levelFilter === level.id ? "text-stone-400" : "text-stone-500")}>
                                    {level.name} <span className="opacity-60">{percentage}%</span>
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 mb-6">
                <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-xl px-4 py-3 hover:bg-stone-100 transition-colors">
                        <Search size={20} className="text-stone-400" />
                        <input
                            type="text"
                            placeholder="Buscar cliente por nombre o email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none w-full font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-stone-50 text-stone-400 font-bold uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-5">Cliente</th>
                            <th className="px-6 py-5">Nivel</th>
                            <th className="px-6 py-5">Puntos</th>
                            <th className="px-6 py-5">Total Gastado</th>
                            <th className="px-6 py-5">Pedidos</th>
                            <th className="px-6 py-5">Último Pedido</th>
                            <th className="px-6 py-5"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {filteredCustomers.map((customer) => {
                            const level = getLevelForPoints(customer.points);

                            return (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-amber-50/30 transition-colors group cursor-pointer"
                                    onClick={() => setSelectedCustomer(customer)}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center font-bold text-stone-500">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-stone-900">{customer.name}</p>
                                                <p className="text-xs text-stone-400 font-medium">{customer.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
                                            level.bgColor, level.color, "border-transparent"
                                        )}>
                                            {level.emoji} {level.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-amber-600">{formatPoints(customer.points)} pts</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-stone-700">
                                        ${customer.totalSpent.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-stone-600">
                                        {customer.ordersCount}
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 text-sm">
                                        {new Date(customer.lastOrder).toLocaleDateString('es-UY', {
                                            day: 'numeric',
                                            month: 'short'
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-stone-100 rounded-lg text-stone-300 hover:text-stone-600 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Customer Detail Modal */}
            <AnimatePresence>
                {selectedCustomer && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-start bg-stone-50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                                    <span className="text-9xl">{getLevelForPoints(selectedCustomer.points).emoji}</span>
                                </div>
                                <div className="relative z-10 flex gap-4 items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-stone-800 border border-stone-100">
                                        {selectedCustomer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-2xl text-stone-900">{selectedCustomer.name}</h3>
                                        <p className="text-stone-500 text-sm flex items-center gap-1">
                                            {getLevelForPoints(selectedCustomer.points).name} Member • {selectedCustomer.email}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-white/50 rounded-full transition-colors relative z-20">
                                    <X size={24} className="text-stone-500" />
                                </button>
                            </div>

                            <div className="p-8 space-y-6 overflow-y-auto">

                                {/* Info Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                                        <p className="text-xs text-amber-600 font-bold uppercase mb-1">Puntos Crumb Club</p>
                                        <p className="text-2xl font-bold text-amber-700">{selectedCustomer.points}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                                        <p className="text-xs text-stone-500 font-bold uppercase mb-1">Total Gastado</p>
                                        <p className="text-2xl font-bold text-stone-700">${selectedCustomer.totalSpent}</p>
                                    </div>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-stone-800 text-sm uppercase">Contacto</h4>
                                    <div className="flex items-center gap-3 text-stone-600">
                                        <Phone size={18} className="text-stone-400" />
                                        <span>{selectedCustomer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-stone-600">
                                        <Mail size={18} className="text-stone-400" />
                                        <span>{selectedCustomer.email}</span>
                                    </div>
                                    {selectedCustomer.address && (
                                        <div className="flex items-center gap-3 text-stone-600">
                                            <MapPin size={18} className="text-stone-400" />
                                            <span>{selectedCustomer.address}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Mock Notes */}
                                {selectedCustomer.notes && (
                                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-sm text-yellow-800">
                                        <p className="font-bold mb-1 flex items-center gap-2"><Edit2 size={14} /> Notas:</p>
                                        {selectedCustomer.notes}
                                    </div>
                                )}

                                {/* History Mock */}
                                <div>
                                    <h4 className="font-bold text-stone-800 text-sm uppercase mb-3">Historial Reciente</h4>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((_, i) => (
                                            <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-stone-100 hover:bg-stone-50 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-stone-100 rounded-lg">
                                                        <ShoppingBag size={16} className="text-stone-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-stone-800 text-sm">Pedido #{1000 + i}</p>
                                                        <p className="text-xs text-stone-500">Hace {i + 1} días</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-stone-600">$1,200</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="p-6 bg-stone-50 border-t border-stone-100 flex gap-3 justify-between sticky bottom-0">
                                <button
                                    onClick={() => handleDelete(selectedCustomer.id)}
                                    className="px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={18} /> Eliminar
                                </button>
                                <button className="px-6 py-3 rounded-xl font-bold bg-stone-900 text-white hover:bg-black shadow-lg transition-all">
                                    Editar Cliente
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
