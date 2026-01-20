"use client";

import Link from "next/link";
import { BarChart3, Package, Users, Plus, TrendingUp, Clock, ShoppingCart } from "lucide-react";

export default function AdminDashboard() {
    return (
        <>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-stone-800">Dashboard</h2>
                    <p className="text-stone-500">Bienvenido al panel de control</p>
                </div>
                <Link href="/admin/products" className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-200 transition-all hover:-translate-y-0.5 font-bold">
                    <Plus size={18} /> Nuevo Producto
                </Link>
            </header>

            {/* Quick Stats - Floating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                    <div className="flex items-start justify-between relative">
                        <div>
                            <h3 className="text-stone-500 text-sm font-medium">Ventas de Hoy</h3>
                            <p className="text-4xl font-bold text-stone-900 mt-2">$24.500</p>
                            <div className="flex items-center gap-1 mt-2 text-emerald-600 font-medium text-sm">
                                <TrendingUp size={16} /> +12% vs ayer
                            </div>
                        </div>
                        <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                    <div className="flex items-start justify-between relative">
                        <div>
                            <h3 className="text-stone-500 text-sm font-medium">Pedidos Activos</h3>
                            <p className="text-4xl font-bold text-stone-900 mt-2">12</p>
                            <div className="flex items-center gap-1 mt-2 text-amber-600 font-medium text-sm">
                                <Clock size={16} /> 4 en cocina
                            </div>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                            <Clock size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-stone-400/20 to-transparent rounded-full -mr-8 -mt-8"></div>
                    <div className="flex items-start justify-between relative">
                        <div>
                            <h3 className="text-stone-500 text-sm font-medium">Productos</h3>
                            <p className="text-4xl font-bold text-stone-900 mt-2">48</p>
                            <div className="flex items-center gap-1 mt-2 text-stone-500 font-medium text-sm">
                                <Package size={16} /> Total en carta
                            </div>
                        </div>
                        <div className="p-3 bg-stone-100 rounded-2xl text-stone-600">
                            <Package size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table - Floating Card */}
            <div className="bg-white rounded-3xl shadow-lg shadow-stone-200/50 border border-stone-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-stone-800">Últimos Pedidos</h3>
                    <span className="text-xs text-stone-400 bg-stone-100 px-3 py-1 rounded-full">Tiempo real</span>
                </div>
                <div className="p-8 text-center text-stone-400">
                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart size={32} className="text-stone-300" />
                    </div>
                    <p className="font-medium">No hay pedidos recientes</p>
                    <p className="text-sm mt-1">Los nuevos pedidos aparecerán aquí en tiempo real</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/products" className="bg-gradient-to-br from-stone-800 to-stone-900 p-5 rounded-2xl text-white hover:shadow-lg transition-all group">
                    <Package size={24} className="mb-3 text-amber-400" />
                    <p className="font-bold">Gestionar</p>
                    <p className="text-xs text-stone-400 mt-1">Productos</p>
                </Link>
                <Link href="/express" className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-5 rounded-2xl text-white hover:shadow-lg transition-all group">
                    <ShoppingCart size={24} className="mb-3" />
                    <p className="font-bold">Ver Tienda</p>
                    <p className="text-xs text-emerald-100 mt-1">Beach Express</p>
                </Link>
                <Link href="/studio" className="bg-gradient-to-br from-amber-500 to-amber-600 p-5 rounded-2xl text-white hover:shadow-lg transition-all group">
                    <Users size={24} className="mb-3" />
                    <p className="font-bold">Cake Studio</p>
                    <p className="text-xs text-amber-100 mt-1">Personalizar</p>
                </Link>
                <Link href="/" className="bg-white p-5 rounded-2xl border border-stone-200 hover:shadow-lg transition-all group">
                    <BarChart3 size={24} className="mb-3 text-stone-600" />
                    <p className="font-bold text-stone-800">Landing</p>
                    <p className="text-xs text-stone-400 mt-1">Página Principal</p>
                </Link>
            </div>
        </>
    );
}
