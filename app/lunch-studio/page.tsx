"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users, Check, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight,
    Sparkles, Coffee, Cake, Leaf, Package, Truck, Wine, Snowflake, ChevronRight
} from "lucide-react";
import {
    OCCASIONS, LUNCH_TIERS, LUNCH_ADDONS, Occasion, LunchTier, LunchAddon,
    getTiersForOccasion, calculateTotal
} from "@/lib/lunch-data";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";

const ATTENDEE_PRESETS = [5, 10, 20, 50];

const ADDON_ICONS: Record<string, React.ReactNode> = {
    'coffee-service': <Coffee size={20} />,
    'premium-drinks': <Wine size={20} />,
    'ice-bar': <Snowflake size={20} />,
    'sweet-extra': <Cake size={20} />,
    'custom-cake': <Cake size={20} />,
    'gluten-free': <Leaf size={20} />,
    'eco-packaging': <Package size={20} />,
    'express-delivery': <Truck size={20} />,
};

export default function LunchStudioPage() {
    const [step, setStep] = useState(0);
    const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
    const [attendees, setAttendees] = useState(10);
    const [selectedTier, setSelectedTier] = useState<LunchTier | null>(null);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    // Get tiers filtered by occasion
    const availableTiers = selectedOccasion
        ? getTiersForOccasion(selectedOccasion.id)
        : LUNCH_TIERS;

    // Calculate totals
    const { base, addons: addonsTotal, total, perPerson } = calculateTotal(
        selectedTier,
        attendees,
        selectedAddons
    );

    const handleAddToCart = () => {
        if (!selectedTier || !selectedOccasion) return;

        const addonNames = selectedAddons
            .map(id => LUNCH_ADDONS.find(a => a.id === id)?.name)
            .filter(Boolean)
            .join(", ");

        const customProduct = {
            id: `catering-${Date.now()}`,
            name: `Catering ${selectedTier.name}`,
            description: `${selectedOccasion.emoji} ${selectedOccasion.name} · ${attendees} personas${addonNames ? ` · Extras: ${addonNames}` : ''}`,
            price: total,
            category: 'lunch' as const,
            image: selectedTier.image,
            isPopular: false
        };

        addItem(customProduct, 1);
        setCartOpen(true);
    };

    const goNext = () => setStep(s => Math.min(s + 1, 4));
    const goBack = () => setStep(s => Math.max(s - 1, 0));

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-stone-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg font-bold text-stone-900">
                            LNB
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-none">Lunch Studio</h1>
                            <p className="text-xs text-stone-400">Catering Inteligente</p>
                        </div>
                    </Link>

                    {/* Live Total */}
                    <div className="text-right">
                        <p className="text-xs text-stone-400">Total estimado</p>
                        <p className="text-2xl font-bold text-amber-400">${total.toLocaleString()}</p>
                    </div>
                </div>
            </header>

            {/* Progress Steps */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
                    {['Ocasión', 'Personas', 'Estilo', 'Extras', 'Confirmar'].map((label, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                    step >= i
                                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-stone-900"
                                        : "bg-stone-700 text-stone-400"
                                )}
                            >
                                {step > i ? <Check size={14} /> : i + 1}
                            </div>
                            <span className={cn(
                                "text-[10px] mt-1 font-medium hidden sm:block",
                                step >= i ? "text-amber-300" : "text-stone-500"
                            )}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 pb-32">
                <AnimatePresence mode="wait">
                    {/* STEP 0: Occasion Selector */}
                    {step === 0 && (
                        <motion.div
                            key="step-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Qué vas a celebrar?</h2>
                                <p className="text-stone-400">Elegí el tipo de evento para personalizar tu experiencia</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {OCCASIONS.map((occasion) => (
                                    <motion.div
                                        key={occasion.id}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedOccasion(occasion);
                                            setSelectedTier(null);
                                        }}
                                        className={cn(
                                            "relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all border-2",
                                            selectedOccasion?.id === occasion.id
                                                ? "border-amber-400 shadow-xl shadow-amber-500/20"
                                                : "border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-20",
                                            occasion.gradient
                                        )} />
                                        <div className="relative z-10 text-center">
                                            <div className="text-5xl mb-3">{occasion.emoji}</div>
                                            <h3 className="font-bold text-lg">{occasion.name}</h3>
                                            <p className="text-xs text-stone-400 mt-1 line-clamp-2">{occasion.description}</p>
                                        </div>
                                        {selectedOccasion?.id === occasion.id && (
                                            <div className="absolute top-2 right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                                                <Check size={14} className="text-stone-900" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                onClick={goNext}
                                disabled={!selectedOccasion}
                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-900 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                Continuar <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 1: Attendees */}
                    {step === 1 && (
                        <motion.div
                            key="step-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <div className="text-5xl mb-4">{selectedOccasion?.emoji}</div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">¿Cuántos son?</h2>
                                <p className="text-stone-400">Ajustá la cantidad de invitados</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                                {/* Presets */}
                                <div className="flex justify-center gap-3 mb-8">
                                    {ATTENDEE_PRESETS.map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => setAttendees(preset)}
                                            className={cn(
                                                "px-5 py-2 rounded-full font-bold text-sm transition-all",
                                                attendees === preset
                                                    ? "bg-amber-500 text-stone-900"
                                                    : "bg-white/10 hover:bg-white/20 text-white"
                                            )}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                </div>

                                {/* Counter */}
                                <div className="flex items-center justify-center gap-8">
                                    <button
                                        onClick={() => setAttendees(Math.max(2, attendees - 1))}
                                        className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                                    >
                                        <Minus size={24} />
                                    </button>
                                    <div className="text-center">
                                        <div className="text-7xl font-bold text-amber-400">{attendees}</div>
                                        <p className="text-stone-400 text-sm">personas</p>
                                    </div>
                                    <button
                                        onClick={() => setAttendees(attendees + 1)}
                                        className="w-14 h-14 rounded-full bg-amber-500 text-stone-900 flex items-center justify-center hover:bg-amber-400 transition shadow-lg shadow-amber-500/30"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-900 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Siguiente: Elegir Estilo <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Tier Selection */}
                    {step === 2 && (
                        <motion.div
                            key="step-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">Elegí el estilo</h2>
                                <p className="text-stone-400">Opciones perfectas para <span className="text-amber-400">{selectedOccasion?.name}</span></p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {availableTiers.map((tier) => (
                                    <motion.div
                                        key={tier.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedTier(tier)}
                                        className={cn(
                                            "relative overflow-hidden rounded-2xl cursor-pointer transition-all border-2",
                                            selectedTier?.id === tier.id
                                                ? "border-amber-400 ring-2 ring-amber-400/50"
                                                : "border-white/10 hover:border-white/30"
                                        )}
                                    >
                                        <div className="relative h-40">
                                            <Image src={tier.image} alt={tier.name} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
                                            <div className="absolute top-3 left-3 text-2xl">{tier.icon}</div>
                                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                                                ${tier.basePrice}<span className="text-xs font-normal text-stone-300">/pers</span>
                                            </div>
                                        </div>
                                        <div className={cn("p-4 bg-gradient-to-br", tier.bgGradient, tier.id === 'executive' ? 'text-white' : tier.color)}>
                                            <h3 className="font-bold text-lg">{tier.name}</h3>
                                            <p className="text-xs opacity-80 mb-2">{tier.tagline}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {tier.features.slice(0, 2).map((f, i) => (
                                                    <span key={i} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {selectedTier?.id === tier.id && (
                                            <div className="absolute top-3 right-3 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center z-10">
                                                <Check size={14} className="text-stone-900" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={!selectedTier}
                                    className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-900 rounded-2xl font-bold text-lg disabled:opacity-50 hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Siguiente: Personalizar <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Addons */}
                    {step === 3 && (
                        <motion.div
                            key="step-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">Personalizá tu pedido</h2>
                                <p className="text-stone-400">Agregá extras para una experiencia completa</p>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                                {LUNCH_ADDONS.map((addon) => {
                                    const isSelected = selectedAddons.includes(addon.id);
                                    const priceDisplay = addon.flatPrice
                                        ? `+$${addon.flatPrice}`
                                        : `+$${addon.pricePerPerson}/pers`;

                                    return (
                                        <motion.div
                                            key={addon.id}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => {
                                                setSelectedAddons(prev =>
                                                    isSelected ? prev.filter(id => id !== addon.id) : [...prev, addon.id]
                                                );
                                            }}
                                            className={cn(
                                                "p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 border-2",
                                                isSelected
                                                    ? "bg-emerald-500/20 border-emerald-400"
                                                    : "bg-white/5 border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center text-xl",
                                                isSelected ? "bg-emerald-500 text-white" : "bg-white/10"
                                            )}>
                                                {ADDON_ICONS[addon.id] || addon.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold">{addon.name}</h3>
                                                <p className="text-xs text-stone-400">{addon.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className={cn("font-bold", isSelected ? "text-emerald-400" : "text-stone-300")}>
                                                    {priceDisplay}
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                                                isSelected ? "bg-emerald-500 border-emerald-500" : "border-white/30"
                                            )}>
                                                {isSelected && <Check size={14} />}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-900 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    Ver Resumen <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Summary & Confirm */}
                    {step === 4 && selectedTier && selectedOccasion && (
                        <motion.div
                            key="step-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <Sparkles className="mx-auto text-amber-400 mb-4" size={40} />
                                <h2 className="text-3xl md:text-4xl font-bold mb-2">¡Tu pedido está listo!</h2>
                                <p className="text-stone-400">Revisá los detalles y confirmá</p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 space-y-6">
                                {/* Header */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                                        <Image src={selectedTier.image} alt={selectedTier.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-2xl mb-1">{selectedOccasion.emoji} {selectedTier.icon}</div>
                                        <h3 className="text-xl font-bold">{selectedTier.name}</h3>
                                        <p className="text-sm text-stone-400">{selectedOccasion.name} · {attendees} personas</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="border-t border-white/10 pt-4">
                                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Incluye</h4>
                                    <ul className="space-y-2">
                                        {selectedTier.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm">
                                                <Check size={14} className="text-emerald-400" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Addons */}
                                {selectedAddons.length > 0 && (
                                    <div className="border-t border-white/10 pt-4">
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Extras</h4>
                                        <ul className="space-y-2">
                                            {selectedAddons.map(id => {
                                                const addon = LUNCH_ADDONS.find(a => a.id === id);
                                                return addon && (
                                                    <li key={id} className="flex items-center gap-2 text-sm">
                                                        <span className="text-lg">{addon.icon}</span>
                                                        {addon.name}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                {/* Pricing */}
                                <div className="border-t border-white/10 pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-400">Base ({attendees} × ${selectedTier.basePrice})</span>
                                        <span>${base.toLocaleString()}</span>
                                    </div>
                                    {addonsTotal > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-stone-400">Extras</span>
                                            <span>${addonsTotal.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-2xl font-bold pt-2 border-t border-white/10">
                                        <span>Total</span>
                                        <span className="text-amber-400">${total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-right text-xs text-stone-400">${perPerson.toLocaleString()} por persona</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold border border-white/20 hover:bg-white/5 transition">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={20} />
                                    Agregar al Pedido
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
