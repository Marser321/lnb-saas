"use client";

import { motion } from "framer-motion";
import { Save, Store, CreditCard, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-stone-800">Configuración</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Navigation/Sidebar (Simulated within Settings) */}
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full text-left px-4 py-3 rounded-xl bg-white shadow-sm border border-stone-100 font-bold text-stone-800 flex items-center gap-3">
                        <Store size={18} /> Tienda
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/50 text-stone-500 font-medium flex items-center gap-3 transition-colors">
                        <CreditCard size={18} /> Pagos
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/50 text-stone-500 font-medium flex items-center gap-3 transition-colors">
                        <Bell size={18} /> Notificaciones
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/50 text-stone-500 font-medium flex items-center gap-3 transition-colors">
                        <Lock size={18} /> Seguridad
                    </button>
                </div>

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 space-y-6"
                >
                    {/* General Store Settings */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Store className="text-emerald-600" /> Información del Negocio
                        </h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-600">Nombre del Local</label>
                                    <input
                                        type="text"
                                        defaultValue="La Nueva Brasil"
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-600">Slogan</label>
                                    <input
                                        type="text"
                                        defaultValue="Confitería & Café"
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-stone-600">Dirección</label>
                                <input
                                    type="text"
                                    defaultValue="Calle 20, Punta del Este, Maldonado"
                                    className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-600">Teléfono</label>
                                    <input
                                        type="text"
                                        defaultValue="+598 4244 0000"
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-stone-600">Email de Contacto</label>
                                    <input
                                        type="email"
                                        defaultValue="contacto@lanuevabrasil.com"
                                        className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Settings */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
                        <h2 className="text-xl font-bold mb-4">Configuración Operativa</h2>

                        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                            <div>
                                <div className="font-bold text-stone-800">Estado de la Tienda</div>
                                <div className="text-sm text-stone-500">Habilitar pedidos online</div>
                            </div>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500 cursor-pointer">
                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        <Save size={20} /> Guardar Cambios
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
