"use client";

import { useState } from "react";
import { useCakeStore } from "@/lib/store";
import { CAKE_SIZES, CAKE_FLAVORS, CAKE_FILLINGS, CAKE_TOPPINGS } from "@/lib/data";
import { GlassCard } from "@/components/ui/glass-card";
import { Steps } from "@/components/studio/steps";
import { CheckCheck, MessageSquare, Send } from "lucide-react";
import Image from "next/image";

export default function FinishPage() {
    const { config, totalPrice } = useCakeStore();
    const [isGenerating, setIsGenerating] = useState(false);

    const handleWhatsApp = async () => {
        setIsGenerating(true);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        const size = CAKE_SIZES.find(s => s.id === config.size)?.label;
        const flavor = CAKE_FLAVORS.find(f => f.id === config.flavor)?.label;
        const fillings = config.fillings.map(id => CAKE_FILLINGS.find(f => f.id === id)?.label).join(" + ");
        const topping = CAKE_TOPPINGS.find(t => t.id === config.topping)?.label;

        const orderId = Math.random().toString(36).substr(2, 5).toUpperCase();

        const text = `Hola *La Nueva Brasil*! 🎂%0AQuiero pedir una torta personalizada:%0A%0A🆔 *Pedido #${orderId}*%0A------------------%0A🥧 Tamaño: ${size}%0A🍰 Sabor: ${flavor}%0A🍯 Rellenos: ${fillings}%0A🍫 Cobertura: ${topping}%0A💬 Mensaje: ${config.message || "Sin mensaje"}%0A------------------%0A💰 *Total Estimado: $${totalPrice}*`;

        window.open(`https://wa.me/59899123456?text=${text}`, '_blank');
        setIsGenerating(false);
    };

    return (
        <div className="max-w-3xl mx-auto pb-20">
            <Steps currentStep={3} totalSteps={3} />

            <div className="mt-12 text-center space-y-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-in zoom-in spin-in-12 duration-700">
                    <CheckCheck size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-emerald-950">¡Casi listo!</h2>
                <p className="text-stone-500">Revisa tu diseño y envíalo a la cocina.</p>
            </div>

            <div className="mt-8 grid gap-6">
                {/* Review Card */}
                <GlassCard className="bg-white/90 border-emerald-100">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Visual Snapshot */}
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-xl">
                            <Image src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=2192&auto=format&fit=crop" fill className="object-cover" alt="Cake Preview" />
                        </div>

                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-stone-50 p-3 rounded-lg">
                                    <span className="block text-xs text-stone-500 uppercase tracking-wider">Tamaño</span>
                                    <span className="font-medium text-stone-900">{CAKE_SIZES.find(s => s.id === config.size)?.label}</span>
                                </div>
                                <div className="bg-stone-50 p-3 rounded-lg">
                                    <span className="block text-xs text-stone-500 uppercase tracking-wider">Sabor</span>
                                    <span className="font-medium text-stone-900">{CAKE_FLAVORS.find(f => f.id === config.flavor)?.label}</span>
                                </div>
                                <div className="bg-stone-50 p-3 rounded-lg col-span-2">
                                    <span className="block text-xs text-stone-500 uppercase tracking-wider">Rellenos & Cobertura</span>
                                    <span className="font-medium text-stone-900">
                                        {config.fillings.map(id => CAKE_FILLINGS.find(f => f.id === id)?.label).join(" + ")}
                                        {" / "}
                                        {CAKE_TOPPINGS.find(t => t.id === config.topping)?.label}
                                    </span>
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="pt-4">
                                <label className="block text-sm font-medium text-stone-700 mb-2 flex items-center gap-2">
                                    <MessageSquare size={16} /> Mensaje sobre la torta (Opcional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: Feliz Cumple Mamá!"
                                    className="w-full rounded-md border border-stone-200 p-3 text-sm focus:border-emerald-500 focus:ring-emerald-500 outline-none"
                                    onChange={(e) => useCakeStore.getState().setConfig('message', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="mt-8 flex items-center justify-between border-t border-dashed pt-6">
                        <div className="text-stone-500 text-sm">Tiempo estimado: 48hs</div>
                        <div className="text-3xl font-bold text-emerald-950">${totalPrice}</div>
                    </div>
                </GlassCard>

                <button
                    onClick={handleWhatsApp}
                    disabled={isGenerating}
                    className="w-full rounded-xl bg-[#25D366] py-4 text-white font-bold text-lg hover:brightness-95 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                    {isGenerating ? (
                        <>
                            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                            Generando Pedido...
                        </>
                    ) : (
                        <>
                            <Send size={24} /> Confirmar Pedido por WhatsApp
                        </>
                    )}
                </button>

                <button onClick={() => window.history.back()} className="text-stone-500 text-sm hover:text-emerald-700 hover:underline">
                    ← Volver a editar
                </button>
            </div>
        </div>
    );
}
