"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag, AlertCircle, ChefHat, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { type Product } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Cake3DViewer } from "@/components/cake-3d-viewer";

// ============================================
// OPTIONS CONFIGURATION
// ============================================

const SECTIONS = [
    { id: 'base', label: 'El Bizcochuelo', icon: '🍰' },
    { id: 'filling', label: 'El Relleno', icon: '🍯' },
    { id: 'topping', label: 'El Topping', icon: '🍓' },
];

const BASES = [
    { id: 'vanilla', label: 'Vainilla Bourbon', price: 0, image: '/cakes/cake_vanilla_premium_1768693258745.png' },
    { id: 'chocolate', label: 'Chocolate Belga', price: 100, image: '/cakes/cake_chocolate_premium_1768693272400.png' },
    { id: 'redvelvet', label: 'Red Velvet', price: 150, image: '/cakes/cake_redvelvet_premium_1768693285364.png' },
];

const FILLINGS = [
    { id: 'dl', label: 'Dulce de Leche', price: 0, image: '/textures/texture_dulce_de_leche_1768692255414.png' },
    { id: 'cream', label: 'Crema Chantilly', price: 50, image: '/textures/texture_whipped_cream_1768692270053.png' },
];

const TOPPINGS = [
    { id: 'merengue', label: 'Merengue Italiano', price: 0, emoji: '🍦' },
    { id: 'chocolate_shavings', label: 'Rulos de Chocolate', price: 80, emoji: '🍫' },
    { id: 'macarons', label: 'Macarons (x3)', price: 200, emoji: '🧁' },
    { id: 'flowers', label: 'Flores Comestibles', price: 150, emoji: '🌸' },
    { id: 'strawberries', label: 'Frutillas Frescas', price: 120, emoji: '🍓' },
];

const ALLERGENS = ['Gluten', 'Lactosa', 'Nueces', 'Huevos', 'Soja'];

// ============================================
// COMPONENT
// ============================================

export default function CakeBuilder() {
    const [step, setStep] = useState(0);
    const [selection, setSelection] = useState({
        base: BASES[0].id,
        filling: FILLINGS[0].id,
        topping: TOPPINGS[0].id,
        specialRequest: '',
        allergens: [] as string[],
    });

    const addItem = useCartStore(state => state.addItem);

    const currentBase = BASES.find(b => b.id === selection.base)!;
    const currentFilling = FILLINGS.find(f => f.id === selection.filling)!;
    const currentTopping = TOPPINGS.find(t => t.id === selection.topping)!;

    const totalPrice = 1200 + currentBase.price + currentFilling.price + currentTopping.price;

    const handleAddToCart = () => {
        const customProduct: Product = {
            id: `custom-cake-${Date.now()}`,
            name: `Torta LNB: ${currentBase.label}`,
            description: `Relleno: ${currentFilling.label}. Topping: ${currentTopping.label}.`,
            price: totalPrice,
            category: 'desserts' as const,
            image: currentBase.image,
            isPopular: false,
            tags: ['custom'],
        };
        addItem(customProduct);
        alert('¡Tu creación ha sido guardada en el carrito!');
    };

    const toggleAllergen = (allergen: string) => {
        setSelection(prev => ({
            ...prev,
            allergens: prev.allergens.includes(allergen)
                ? prev.allergens.filter(a => a !== allergen)
                : [...prev.allergens, allergen]
        }));
    };

    return (
        <div className="min-h-screen bg-stone-100 pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/studio" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-stone-600" />
                    </Link>
                    <div className="text-center">
                        <h1 className="text-lg font-bold text-stone-900 flex items-center justify-center gap-2">
                            Cake Studio <ChefHat size={18} className="text-amber-500" />
                        </h1>
                        <p className="text-[10px] text-stone-500 font-bold tracking-widest uppercase">Diseñá tu antojo</p>
                    </div>
                    <div className="bg-stone-900 text-white px-4 py-2 rounded-full font-bold text-sm">
                        ${totalPrice}
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-4 space-y-6">

                {/* PREMIUM CAKE SHOWCASE */}
                <Cake3DViewer
                    baseId={currentBase.id}
                    fillingId={currentFilling.id}
                    fillingLabel={currentFilling.label}
                    fillingImage={currentFilling.image}
                    toppingId={currentTopping.id}
                    toppingLabel={currentTopping.label}
                />

                {/* STEP TABS */}
                <div className="flex bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm">
                    {SECTIONS.map((section, idx) => (
                        <button
                            key={section.id}
                            onClick













                            ={() => setStep(idx)}
                            className={cn(
                                "flex-1 px-3 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5",
                                step === idx
                                    ? "bg-stone-900 text-white shadow-lg"
                                    : "text-stone-400 hover:bg-stone-50"
                            )}
                        >
                            <span className="text-base">{section.icon}</span>
                            <span className="hidden sm:inline">{section.label}</span>
                        </button>
                    ))}
                </div>

                {/* OPTIONS */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {step === 0 && BASES.map((option) => (
                            <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={selection.base === option.id}
                                onClick={() => setSelection(prev => ({ ...prev, base: option.id }))}
                                type="image"
                            />
                        ))}
                        {step === 1 && FILLINGS.map((option) => (
                            <OptionCard
                                key={option.id}
                                option={option}
                                isSelected={selection.filling === option.id}
                                onClick={() => setSelection(prev => ({ ...prev, filling: option.id }))}
                                type="image"
                            />
                        ))}
                        {step === 2 && TOPPINGS.map((option) => (
                            <OptionCard
                                key={option.id}
                                option={{ ...option, image: '' }}
                                isSelected={selection.topping === option.id}
                                onClick={() => setSelection(prev => ({ ...prev, topping: option.id }))}
                                type="emoji"
                                emoji={option.emoji}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* EXTRAS */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-stone-400 uppercase flex items-center gap-2 mb-2">
                            <AlertCircle size={14} /> Alérgenos
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {ALLERGENS.map(allergen => (
                                <button
                                    key={allergen}
                                    onClick={() => toggleAllergen(allergen)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all",
                                        selection.allergens.includes(allergen)
                                            ? "bg-red-50 border-red-200 text-red-600"
                                            : "bg-stone-50 border-stone-100 text-stone-400 hover:border-stone-200"
                                    )}
                                >
                                    {allergen}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-stone-400 uppercase flex items-center gap-2 mb-2">
                            <Sparkles size={14} /> Dedicatoria
                        </label>
                        <textarea
                            value={selection.specialRequest}
                            onChange={(e) => setSelection(prev => ({ ...prev, specialRequest: e.target.value }))}
                            className="w-full bg-stone-50 border border-stone-100 rounded-xl p-3 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 placeholder:text-stone-300"
                            placeholder="Ej: 'Feliz Cumple Mamá' en chocolate..."
                        />
                    </div>
                </div>
            </main>

            {/* FOOTER CTA */}
            <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-lg border-t border-stone-200 p-4 pb-8 z-50">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-stone-900 text-white rounded-2xl h-14 font-bold text-base hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                        <ShoppingBag size={20} /> Agregar al Carrito · ${totalPrice}
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- OPTION CARD COMPONENT ---
function OptionCard({ option, isSelected, onClick, type, emoji }: { option: any; isSelected: boolean; onClick: () => void; type: 'image' | 'emoji'; emoji?: string }) {
    return (
        <motion.button
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-4 p-3 bg-white rounded-2xl border-2 transition-all text-left",
                isSelected
                    ? "border-amber-400 ring-4 ring-amber-100 shadow-lg"
                    : "border-stone-100 hover:border-stone-200 shadow-sm"
            )}
        >
            {/* Thumbnail */}
            {type === 'image' && option.image && (
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 shadow-inner">
                    <Image src={option.image} alt={option.label} fill className="object-cover" />
                </div>
            )}
            {type === 'emoji' && emoji && (
                <div className="w-16 h-16 rounded-xl bg-stone-100 flex items-center justify-center text-3xl shrink-0">
                    {emoji}
                </div>
            )}

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-900 text-sm">{option.label}</p>
                <p className="text-xs text-stone-400">
                    {option.price > 0 ? `+$${option.price}` : 'Incluido'}
                </p>
            </div>

            {/* Check */}
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shrink-0"
                >
                    <Check size={16} className="text-white" strokeWidth={3} />
                </motion.div>
            )}
        </motion.button>
    );
}
