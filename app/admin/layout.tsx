"use client";

import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { BarChart3, Package, Settings, LogOut, ShoppingCart, Tag, Users, Wand2, TrendingUp } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50">
            {/* Sidebar */}
            <aside className="w-64 bg-stone-900 text-white p-6 hidden md:flex flex-col fixed h-full z-10">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="relative group flex items-center justify-center">
                        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/40 transition-all animate-pulse"></div>
                        <BrandLogo variant="dark" className="text-white relative z-10" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">LNB Admin</h1>
                        <p className="text-xs text-stone-400">Panel de Control</p>
                    </div>
                </div>
                <nav className="space-y-2 flex-1">
                    <SidebarLink href="/admin/dashboard" icon={BarChart3} label="Dashboard" />
                    <SidebarLink href="/admin/analytics" icon={TrendingUp} label="Analytics" />
                    <SidebarLink href="/admin/products" icon={Package} label="Productos" />
                    <SidebarLink href="/admin/orders" icon={ShoppingCart} label="Pedidos" />
                    <SidebarLink href="/admin/promotions" icon={Tag} label="Promociones" />
                    <SidebarLink href="/admin/customers" icon={Users} label="Clientes" />
                    <SidebarLink href="/admin/ingredients" icon={Wand2} label="Ingredientes AI" />
                    <SidebarLink href="/admin/settings" icon={Settings} label="Configuración" />
                </nav>
                <div className="pt-8 mt-8 border-t border-white/10">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        <LogOut size={20} /> Volver a la Tienda
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function SidebarLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-white hover:bg-white/5 rounded-xl transition-all hover:translate-x-1">
            <Icon size={20} /> {label}
        </Link>
    );
}
