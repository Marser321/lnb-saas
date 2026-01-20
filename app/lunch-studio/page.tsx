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
        <div className="min-h-screen bg-stone-50 text-stone-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
                        <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-stone-900/20">
                            LNB
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-none text-stone-900">Lunch Studio</h1>
                            <p className="text-xs text-stone-500 font-bold">Catering Inteligente</p>
                        </div>
                    </Link>

                    {/* Live Total */}
                    <div className="text-right">
                        <p className="text-xs text-stone-500 font-bold">Total estimado</p>
                        <p className="text-2xl font-bold text-stone-900">${total.toLocaleString()}</p>
                    </div>
                </div>
            </header>

            {/* Progress Steps */}
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -translate-y-1/2" />
                    {['Ocasión', 'Personas', 'Estilo', 'Extras', 'Confirmar'].map((label, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2",
                                    step >= i
                                        ? "bg-stone-900 text-white border-stone-900 shadow-lg"
                                        : "bg-white text-stone-300 border-stone-200"
                                )}
                            >
                                {step > i ? <Check size={14} /> : i + 1}
                            </div>
                            <span className={cn(
                                "text-[10px] mt-2 font-bold uppercase tracking-wider hidden sm:block transition-colors",
                                step >= i ? "text-stone-900" : "text-stone-400"
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
                                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-stone-900">¿Qué vas a celebrar?</h2>
                                <p className="text-stone-500 font-medium text-lg">Elegí el tipo de evento para personalizar tu experiencia</p>
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
                                            "relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all border-2 bg-white",
                                            selectedOccasion?.id === occasion.id
                                                ? `border-current shadow-xl ring-1 ${occasion.color}`
                                                : "border-stone-100 hover:border-stone-200 shadow-sm"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-br opacity-50",
                                            occasion.gradient
                                        )} />
                                        <div className="relative z-10 text-center">
                                            <div className="text-6xl mb-4 drop-shadow-sm">{occasion.emoji}</div>
                                            <h3 className={cn("font-bold text-lg mb-1", selectedOccasion?.id === occasion.id ? "text-stone-900" : "text-stone-700")}>{occasion.name}</h3>
                                            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{occasion.description}</p>
                                        </div>
                                        {selectedOccasion?.id === occasion.id && (
                                            <div className={cn("absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white", occasion.color.replace('text-', 'bg-'))}>
                                                <Check size={14} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <button
                                onClick={goNext}
                                disabled={!selectedOccasion}
                                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-800 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10"
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
                                <div className="text-6xl mb-4 animate-bounce">{selectedOccasion?.emoji}</div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-stone-900">¿Cuántos son?</h2>
                                <p className="text-stone-500 font-medium text-lg">Ajustá la cantidad de invitados para el evento <span className={cn("font-bold", selectedOccasion?.color)}>{selectedOccasion?.name}</span></p>
                            </div>

                            <div className="bg-white rounded-[2rem] p-8 border border-stone-200 shadow-xl shadow-stone-200/50">
                                {/* Presets */}
                                <div className="flex flex-wrap justify-center gap-3 mb-10">
                                    {ATTENDEE_PRESETS.map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => setAttendees(preset)}
                                            className={cn(
                                                "px-6 py-2.5 rounded-full font-bold text-sm transition-all border-2",
                                                attendees === preset
                                                    ? "bg-stone-900 text-white border-stone-900 shadow-lg transform scale-105"
                                                    : "bg-stone-50 text-stone-500 border-stone-100 hover:border-stone-300 hover:bg-white"
                                            )}
                                        >
                                            {preset} personas
                                        </button>
                                    ))}
                                </div>

                                {/* Counter */}
                                <div className="flex items-center justify-center gap-8 md:gap-12">
                                    <button
                                        onClick={() => setAttendees(Math.max(2, attendees - 1))}
                                        className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 transition-colors shadow-sm"
                                    >
                                        <Minus size={24} />
                                    </button>
                                    <div className="text-center min-w-[120px]">
                                        <div className="text-8xl font-bold text-stone-900 tracking-tighter">{attendees}</div>
                                        <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mt-2">Invitados</p>
                                    </div>
                                    <button
                                        onClick={() => setAttendees(attendees + 1)}
                                        className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20"
                                    >
                                        <Plus size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold text-stone-500 border-2 border-stone-200 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10"
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
                                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-stone-900">Elegí el estilo</h2>
                                <p className="text-stone-500 font-medium text-lg">Opciones perfectas para <span className={cn("font-bold px-2 py-0.5 rounded-md bg-white border border-stone-200", selectedOccasion?.color)}>{selectedOccasion?.name} (x{attendees})</span></p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {availableTiers.map((tier) => (
                                    <motion.div
                                        key={tier.id}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedTier(tier)}
                                        className={cn(
                                            "relative overflow-hidden rounded-3xl cursor-pointer transition-all border-2 group bg-white",
                                            selectedTier?.id === tier.id
                                                ? "border-stone-900 shadow-2xl shadow-stone-900/10 ring-1 ring-stone-900"
                                                : "border-stone-100 hover:border-stone-300 hover:shadow-xl"
                                        )}
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <Image src={tier.image} alt={tier.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-xl shadow-sm">{tier.icon}</div>
                                            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                                                <span className="text-lg font-bold text-stone-900">${tier.basePrice}</span>
                                                <span className="text-xs font-medium text-stone-500 ml-1">/pers</span>
                                            </div>
                                        </div>
                                        <div className={cn("p-6 bg-gradient-to-b", tier.bgGradient)}>
                                            <h3 className={cn("font-bold text-xl mb-1", tier.color)}>{tier.name}</h3>
                                            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">{tier.tagline}</p>
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {tier.features.slice(0, 3).map((f, i) => (
                                                    <span key={i} className="text-[10px] font-bold bg-white border border-stone-100 px-2.5 py-1 rounded-full text-stone-600 shadow-sm">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {selectedTier?.id === tier.id && (
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center z-10 text-white shadow-lg">
                                                <Check size={16} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold text-stone-500 border-2 border-stone-200 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={!selectedTier}
                                    className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-800 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10"
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
                                                "p-4 rounded-xl cursor-pointer transition-all border-2 relative overflow-hidden",
                                                isSelected
                                                    ? "bg-emerald-500/20 border-emerald-400"
                                                    : "bg-white/5 border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0",
                                                    isSelected ? "bg-emerald-500 text-white" : "bg-white/10"
                                                )}>
                                                    {ADDON_ICONS[addon.id] || addon.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold truncate">{addon.name}</h3>
                                                    <p className="text-xs text-stone-400 line-clamp-1">{addon.description}</p>

                                                    {addon.id === 'custom-cake' && isSelected && (
                                                        <Link
                                                            href="/studio"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center gap-1 mt-2 text-xs font-bold bg-amber-500 text-stone-900 px-3 py-1.5 rounded-full hover:bg-amber-400 transition-colors"
                                                        >
                                                            <Sparkles size={12} />
                                                            Diseñar Torta
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <div className={cn("font-bold", isSelected ? "text-emerald-400" : "text-stone-300")}>
                                                        {priceDisplay}
                                                    </div>
                                                </div>
                                                <div className={cn(
                                                    "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all shrink-0",
                                                    isSelected ? "bg-emerald-500 border-emerald-500" : "border-white/30"
                                                )}>
                                                    {isSelected && <Check size={14} />}
                                                </div>
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
                                <Sparkles className="mx-auto text-amber-500 mb-4" size={48} />
                                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-stone-900">¡Tu pedido está listo!</h2>
                                <p className="text-stone-500 font-medium text-lg">Revisá los detalles antes de confirmar</p>
                            </div>

                            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl shadow-stone-200/50 space-y-6">
                                {/* Header */}
                                <div className="flex items-center gap-6">
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                                        <Image src={selectedTier!.image} alt={selectedTier!.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-2xl mb-1 flex items-center gap-2">
                                            <span>{selectedOccasion!.emoji}</span>
                                            <span className="text-stone-300">|</span>
                                            <span>{selectedTier!.icon}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-stone-900">{selectedTier!.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded bg-stone-100 border border-stone-200", selectedOccasion!.color)}>{selectedOccasion!.name}</span>
                                            <span className="text-xs font-bold text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-100">{attendees} personas</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="border-t border-stone-100 pt-6">
                                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">El Menú Incluye</h4>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {selectedTier!.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                                                <Check size={16} className="text-emerald-500 mt-0.5" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Addons */}
                                {selectedAddons.length > 0 && (
                                    <div className="border-t border-stone-100 pt-6">
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">Extras Seleccionados</h4>
                                        <ul className="space-y-3">
                                            {selectedAddons.map(id => {
                                                const addon = LUNCH_ADDONS.find(a => a.id === id);
                                                return addon && (
                                                    <li key={id} className="flex items-center gap-3 text-sm bg-stone-50 p-2 rounded-lg border border-stone-100">
                                                        <span className="text-xl">{addon.icon}</span>
                                                        <span className="font-medium text-stone-700">{addon.name}</span>
                                                        {addon.category === 'dulces' && <span className="ml-auto text-xs text-amber-600 font-bold px-2 py-0.5 bg-amber-50 rounded-full">DULCE</span>}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}

                                {/* Pricing */}
                                <div className="border-t border-stone-100 pt-6 space-y-3">
                                    <div className="flex justify-between text-sm text-stone-500">
                                        <span>Base ({attendees} × ${selectedTier!.basePrice})</span>
                                        <span>${base.toLocaleString()}</span>
                                    </div>
                                    {addonsTotal > 0 && (
                                        <div className="flex justify-between text-sm text-stone-500">
                                            <span>Extras</span>
                                            <span>${addonsTotal.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-end pt-4 border-t border-stone-200">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-stone-400 uppercase">Total Final</span>
                                            <span className="text-xs text-stone-400 font-medium">${perPerson.toLocaleString()} por persona</span>
                                        </div>
                                        <span className="text-4xl font-bold text-stone-900 tracking-tight">${total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={goBack} className="px-6 py-4 rounded-xl font-bold text-stone-500 border-2 border-stone-200 hover:bg-stone-50 hover:text-stone-900 transition-colors">
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10"
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
