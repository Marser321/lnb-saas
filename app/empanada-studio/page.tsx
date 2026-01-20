"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Plus, Minus, CheckCircle2, ChevronRight, Package, Box } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { EMPANADA_FLAVORS, EMPANADA_PACKS } from "@/lib/studio-data";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import Image from "next/image";

export default function EmpanadaStudioPage() {
    const [selectedPack, setSelectedPack] = useState(EMPANADA_PACKS[0]);
    const [counts, setCounts] = useState<Record<string, number>>({});

    // Derived state
    const currentCount = Object.values(counts).reduce((a, b) => a + b, 0);
    const remaining = selectedPack.quantity - currentCount;
    const isComplete = remaining === 0;

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    const updateCount = (flavorId: string, delta: number) => {
        const current = counts[flavorId] || 0;
        const newCount = current + delta;

        if (newCount < 0) return;
        if (delta > 0 && remaining <= 0) {
            toast.error("¡Caja llena! Sacá una para agregar otra.");
            return;
        }

        setCounts(prev => ({
            ...prev,
            [flavorId]: newCount
        }));
    };

    const handleAddToCart = () => {
        if (!isComplete) return;

        const description = Object.entries(counts)
            .filter(([_, count]) => count > 0)
            .map(([id, count]) => {
                const flavor = EMPANADA_FLAVORS.find(f => f.id === id);
                return `${count}x ${flavor?.label}`;
            })
            .join(', ');

        const product = {
            id: `empanadas-${Date.now()}`,
            name: `Caja de ${selectedPack.quantity} Empanadas`,
            description: description,
            price: selectedPack.price,
            category: 'lunch' as const,
            image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&h=800&fit=crop",
            isPopular: false
        };

        addItem(product, 1);
        toast.success("¡Empanadas agregadas!");
        setCartOpen(true);
    };

    // Group flavors by type
    const groupedFlavors = {
        traditional: EMPANADA_FLAVORS.filter(f => f.type === 'traditional'),
        classic: EMPANADA_FLAVORS.filter(f => f.type === 'classic'),
        veggie: EMPANADA_FLAVORS.filter(f => f.type === 'veggie'),
        gourmet: EMPANADA_FLAVORS.filter(f => f.type === 'gourmet'),
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pb-32">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="text-center">
                        <h1 className="font-bold text-lg">Empanada Studio</h1>
                        <p className="text-xs text-stone-500">Armá tu caja a gusto</p>
                    </div>

                    {/* Counter Badge */}
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-sm border",
                        isComplete
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                    )}>
                        <Package size={16} />
                        <span>{currentCount} / {selectedPack.quantity}</span>
                    </div>
                </div>

                {/* Progress Bar (Visual Filler) */}
                <div className="h-1.5 w-full bg-stone-100 relative overflow-hidden">
                    <motion.div
                        className={cn("h-full absolute left-0 top-0", isComplete ? "bg-emerald-500" : "bg-amber-500")}
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentCount / selectedPack.quantity) * 100}%` }}
                    />
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">

                {/* Pack Selection */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">1</span>
                        Elegí tu Pack
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {EMPANADA_PACKS.map(pack => (
                            <button
                                key={pack.id}
                                onClick={() => {
                                    if (pack.quantity < currentCount) {
                                        setCounts({});
                                        toast.info("Pack cambiado. ¡Empezá de nuevo!");
                                    }
                                    setSelectedPack(pack);
                                }}
                                className={cn(
                                    "group relative overflow-hidden rounded-2xl transition-all text-left h-48",
                                    selectedPack.id === pack.id
                                        ? "ring-4 ring-amber-500 ring-offset-2 shadow-xl"
                                        : "hover:shadow-lg opacity-90 hover:opacity-100"
                                )}
                            >
                                <Image src={pack.image} alt={pack.label} fill className="object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <div className="text-4xl font-black mb-1">{pack.quantity}</div>
                                    <div className="text-sm font-bold opacity-90 mb-2 uppercase tracking-wide">{pack.label}</div>
                                    <div className="inline-block bg-amber-500 text-stone-900 font-bold px-3 py-1 rounded-full text-sm">
                                        ${pack.price}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Flavor Selection */}
                <section>
                    <div className="flex items-center justify-between mb-6 sticky top-20 z-40 bg-stone-50 py-4 border-b border-stone-200">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">2</span>
                            Elegí los Sabores
                        </h2>
                        {!isComplete && (
                            <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 animate-pulse">
                                Faltan {remaining}
                            </span>
                        )}
                    </div>

                    <div className="space-y-8">
                        {Object.entries(groupedFlavors).map(([type, flavors]) => flavors.length > 0 && (
                            <div key={type}>
                                <h3 className="text-sm font-black text-stone-400 uppercase tracking-widest mb-4 pl-1 border-l-4 border-stone-300 pl-3">
                                    {type === 'traditional' ? 'Clásicas de Carne' :
                                        type === 'classic' ? 'Clásicas' :
                                            type === 'veggie' ? 'Veggie' : 'Gourmet'}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {flavors.map(flavor => {
                                        const count = counts[flavor.id] || 0;
                                        return (
                                            <div
                                                key={flavor.id}
                                                className={cn(
                                                    "bg-white rounded-xl p-2 pr-4 flex items-center justify-between border-2 transition-all",
                                                    count > 0 ? "border-amber-400 bg-amber-50 shadow-md transform scale-[1.01]" : "border-stone-100 hover:border-stone-200"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-16 h-16 rounded-lg relative overflow-hidden bg-stone-100 shrink-0">
                                                        <Image src={flavor.image} alt={flavor.label} fill className="object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-stone-800 leading-tight">{flavor.label}</div>
                                                        {count > 0 && <div className="text-xs font-medium text-amber-600 mt-1">{count} en caja</div>}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-stone-100 shadow-sm">
                                                    <button
                                                        onClick={() => updateCount(flavor.id, -1)}
                                                        disabled={count === 0}
                                                        className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                            count > 0 ? "bg-stone-100 hover:bg-stone-200 text-stone-600" : "bg-stone-50 text-stone-300 cursor-not-allowed"
                                                        )}
                                                    >
                                                        <Minus size={14} />
                                                    </button>

                                                    <span className="w-6 text-center font-bold text-stone-900">
                                                        {count}
                                                    </span>

                                                    <button
                                                        onClick={() => updateCount(flavor.id, 1)}
                                                        disabled={isComplete}
                                                        className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                            isComplete
                                                                ? "bg-stone-100 text-stone-300 cursor-not-allowed"
                                                                : "bg-stone-900 text-white hover:bg-stone-700"
                                                        )}
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 z-50">
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={handleAddToCart}
                        disabled={!isComplete}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg",
                            isComplete
                                ? "bg-stone-900 text-white hover:bg-stone-800 scale-[1.01] active:scale-100"
                                : "bg-stone-200 text-stone-400 cursor-not-allowed"
                        )}
                    >
                        {isComplete ? (
                            <>
                                <CheckCircle2 size={24} className="text-emerald-400" />
                                <span>Agregar Pack al Pedido</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-base">${selectedPack.price}</span>
                            </>
                        ) : (
                            <>
                                <Box size={20} />
                                Completá la caja ({currentCount}/{selectedPack.quantity})
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
