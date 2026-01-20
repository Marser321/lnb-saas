"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Check, ChevronRight, Briefcase, Minus, Plus, ShoppingBag } from "lucide-react";
import { LUNCH_TIERS, LUNCH_ADDONS, LunchTier } from "@/lib/lunch-data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { BrandLogo } from "@/components/brand-logo";

export default function LunchStudioPage() {
    const [step, setStep] = useState(1);
    const [attendees, setAttendees] = useState(10);
    const [selectedTier, setSelectedTier] = useState<LunchTier | null>(null);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    // Calculate Totals
    const baseTotal = selectedTier ? selectedTier.basePrice * attendees : 0;
    const addonsTotal = selectedAddons.reduce((acc, addonId) => {
        const addon = LUNCH_ADDONS.find(a => a.id === addonId);
        return acc + (addon ? addon.pricePerPerson * attendees : 0);
    }, 0);
    const total = baseTotal + addonsTotal;
    const pricePerPerson = attendees > 0 ? total / attendees : 0;

    const handleAddToCart = () => {
        if (!selectedTier) return;

        const tierName = selectedTier.name;
        const addonsNames = selectedAddons.map(id => LUNCH_ADDONS.find(a => a.id === id)?.name).join(", ");

        // Construct a "Product" compatible object
        const customProduct = {
            id: `catering-${Date.now()}`,
            name: `Catering ${tierName}`,
            description: `${attendees} personas. ${addonsNames ? `Incluye: ${addonsNames}` : ''}`,
            price: total, // Total price for the bundle
            category: 'lunch' as const,
            image: selectedTier.image,
            isPopular: false
        };

        addItem(customProduct, 1);
        setCartOpen(true);
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pb-32">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
                        <BrandLogo variant="color" />
                        <span className="font-bold text-lg hidden sm:block">Lunch Studio</span>
                    </div>
                    <div className="text-sm font-medium text-stone-500">
                        Catering Inteligente
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 mt-8">

                {/* Progress Bar */}
                <div className="flex justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -z-10" />
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                            step >= s ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-400"
                        )}>
                            {s}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">

                    {/* Left Column: Flow */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {/* STEP 1: Attendees */}
                            {step === 1 && (
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-center space-y-8">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold font-serif">¿Cuántas personas son?</h2>
                                    <p className="text-stone-500 text-lg">Ajusta la cantidad de invitados para tu evento.</p>

                                    <div className="flex items-center justify-center gap-8">
                                        <button
                                            onClick={() => setAttendees(Math.max(5, attendees - 1))}
                                            className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <div className="text-6xl font-bold w-32 text-center text-stone-800">
                                            {attendees}
                                        </div>
                                        <button
                                            onClick={() => setAttendees(attendees + 1)}
                                            className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition shadow-lg hover:scale-110"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all transform duration-300"
                                    >
                                        Siguiente: Elegir Estilo
                                    </button>
                                </div>
                            )}

                            {/* STEP 2: Tier Selection */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold font-serif mb-2">Elige el estilo</h2>
                                        <p className="text-stone-500">¿Qué tipo de experiencia buscas?</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {LUNCH_TIERS.map((tier) => (
                                            <div
                                                key={tier.id}
                                                onClick={() => setSelectedTier(tier)}
                                                className={cn(
                                                    "border-2 rounded-2xl p-4 cursor-pointer transition-all relative overflow-hidden group",
                                                    selectedTier?.id === tier.id
                                                        ? `${tier.color} border-current shadow-xl scale-[1.02]`
                                                        : "bg-white border-stone-100 hover:border-stone-200 hover:shadow-md"
                                                )}
                                            >
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-24 h-24 rounded-xl relative overflow-hidden shrink-0">
                                                        <Image src={tier.image} alt={tier.name} fill className="object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h3 className="font-bold text-lg">{tier.name}</h3>
                                                            <div className="text-sm font-bold opacity-80">${tier.basePrice} <span className="text-[10px] font-normal">/pers</span></div>
                                                        </div>
                                                        <p className="text-sm opacity-70 mb-3">{tier.description}</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {tier.features.slice(0, 2).map((f, i) => (
                                                                <span key={i} className="text-[10px] bg-white/50 px-2 py-1 rounded-full backdrop-blur-sm border border-black/5">
                                                                    {f}
                                                                </span>
                                                            ))}
                                                            {tier.features.length > 2 && <span className="text-[10px] opacity-60">+{tier.features.length - 2} más</span>}
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                        selectedTier?.id === tier.id ? "bg-current border-current" : "border-stone-300"
                                                    )}>
                                                        {selectedTier?.id === tier.id && <Check size={14} className="text-white mix-blend-difference" />}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-6 py-4 rounded-xl font-bold border border-stone-200 hover:bg-stone-50 transition"
                                        >
                                            Atrás
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            disabled={!selectedTier}
                                            className="flex-1 py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 disabled:opacity-50 transition"
                                        >
                                            Siguiente: Personalizar
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Add-ons */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold font-serif mb-2">Extras</h2>
                                        <p className="text-stone-500">Agrega el toque final a tu catering.</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {LUNCH_ADDONS.map((addon) => {
                                            const isSelected = selectedAddons.includes(addon.id);
                                            return (
                                                <div
                                                    key={addon.id}
                                                    onClick={() => {
                                                        setSelectedAddons(prev =>
                                                            isSelected ? prev.filter(id => id !== addon.id) : [...prev, addon.id]
                                                        );
                                                    }}
                                                    className={cn(
                                                        "bg-white border rounded-xl p-4 cursor-pointer transition-all flex items-center gap-4 hover:shadow-md",
                                                        isSelected ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50" : "border-stone-100"
                                                    )}
                                                >
                                                    <div className="text-2xl">{addon.icon}</div>
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-stone-900">{addon.name}</h3>
                                                        <p className="text-xs text-stone-500">{addon.description}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="font-bold text-stone-900">+${addon.pricePerPerson}</div>
                                                        <div className="text-[10px] text-stone-400">/pers</div>
                                                    </div>
                                                    <div className={cn(
                                                        "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                                                        isSelected ? "bg-emerald-500 border-emerald-500 text-white" : "border-stone-300 bg-white"
                                                    )}>
                                                        {isSelected && <Check size={14} />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="px-6 py-4 rounded-xl font-bold border border-stone-200 hover:bg-stone-50 transition"
                                        >
                                            Atrás
                                        </button>
                                        <button
                                            onClick={handleAddToCart}
                                            className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag size={20} />
                                            Agregar al Pedido
                                        </button>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    </AnimatePresence>

                    {/* Right Column: Sticky Summary */}
                    <div className="hidden md:block">
                        <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-lg border border-stone-100">
                            <h3 className="font-bold text-stone-400 text-xs uppercase tracking-wider mb-4">Resumen de Cotización</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-stone-600">Invitados</span>
                                    <span className="font-bold text-stone-900">{attendees}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-stone-600">Estilo</span>
                                    <span className="font-bold text-stone-900 truncate ml-4">
                                        {selectedTier ? selectedTier.name : '-'}
                                    </span>
                                </div>
                                {selectedAddons.length > 0 && (
                                    <div className="border-t border-dashed border-stone-200 pt-2 mt-2">
                                        <div className="text-xs text-stone-400 mb-1">Extras seleccionados:</div>
                                        {selectedAddons.map(id => (
                                            <div key={id} className="text-xs text-stone-600 flex justify-between">
                                                <span>{LUNCH_ADDONS.find(a => a.id === id)?.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-stone-200 pt-4">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-stone-500 text-sm">Total Estimado</span>
                                    <span className="text-3xl font-bold text-stone-900">${total.toLocaleString()}</span>
                                </div>
                                <div className="text-right text-xs text-stone-400">
                                    ${pricePerPerson.toLocaleString()} por persona
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
