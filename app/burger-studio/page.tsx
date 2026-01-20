"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Plus, Sparkles, ChefHat } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BURGER_BUNS, BURGER_CHEESES, BURGER_EXTRAS, BURGER_PATTIES } from "@/lib/studio-data";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import Image from "next/image";

export default function BurgerStudioPage() {
    // Selections
    const [bun, setBun] = useState(BURGER_BUNS[0]);
    const [patty, setPatty] = useState(BURGER_PATTIES[0]);
    const [cheese, setCheese] = useState(BURGER_CHEESES[0]);
    const [extras, setExtras] = useState<typeof BURGER_EXTRAS>([]);

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    // Calc Total
    const extrasTotal = extras.reduce((acc, e) => acc + e.price, 0);
    const totalPrice = bun.price + patty.price + cheese.price + extrasTotal;

    const toggleExtra = (extra: typeof BURGER_EXTRAS[0]) => {
        setExtras(prev =>
            prev.some(e => e.id === extra.id)
                ? prev.filter(e => e.id !== extra.id)
                : [...prev, extra]
        );
    };

    const handleAddToCart = () => {
        const product = {
            id: `burger-${Date.now()}`,
            name: `Burger Custom: ${patty.label}`,
            description: `${bun.label}, ${cheese.label}, ${extras.map(e => e.label).join(', ')}`,
            price: totalPrice,
            category: 'lunch' as const,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=800&fit=crop",
            isPopular: false
        };

        addItem(product, 1);
        toast.success("¡Hamburguesa creada!");
        setCartOpen(true);
    };

    // Animation variants for the stack
    const stackItem = {
        hidden: { opacity: 0, y: -50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
        exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 pb-40 lg:pb-0">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="text-center">
                        <h1 className="font-bold text-lg">Burger Studio</h1>
                        <p className="text-xs text-stone-500">The Stack Builder</p>
                    </div>
                    <div className="font-bold text-amber-600">${totalPrice}</div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">

                {/* Left: Visual Builder (Sticky) */}
                <div className="relative bg-stone-100 flex items-center justify-center p-8 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-hidden">
                    <div className="relative w-64 h-96 flex flex-col-reverse justify-start items-center perspective-1000 pb-12">
                        <AnimatePresence>
                            {/* Bottom Bun */}
                            <motion.div key={bun.id + '-bottom'} variants={stackItem} initial="hidden" animate="visible" className="w-[180px] h-[50px] relative z-10 drop-shadow-lg scale-y-75 cursor-pointer">
                                <Image src={bun.image} alt={bun.label} fill className="object-cover rounded-b-[40px] rounded-t-lg" style={{ objectPosition: 'bottom' }} />
                            </motion.div>

                            {/* Patty */}
                            <motion.div key={patty.id} variants={stackItem} initial="hidden" animate="visible" className="w-[170px] h-[35px] relative z-20 drop-shadow-xl -mt-4 cursor-pointer">
                                <Image src={patty.image} alt={patty.label} fill className="object-cover rounded-lg" />
                            </motion.div>

                            {/* Cheese */}
                            {cheese.id !== 'none' && (
                                <motion.div key={cheese.id} variants={stackItem} initial="hidden" animate="visible" className="w-[180px] h-[10px] relative z-30 drop-shadow-md -mt-2">
                                    {cheese.image ? (
                                        <Image src={cheese.image} alt={cheese.label} fill className="object-cover rounded" />
                                    ) : (
                                        <div className={cn("w-full h-full rounded shadow-sm", cheese.color)} />
                                    )}
                                </motion.div>
                            )}

                            {/* Extras */}
                            {extras.map((extra, i) => (
                                <motion.div
                                    key={extra.id}
                                    variants={stackItem}
                                    initial="hidden"
                                    animate="visible"
                                    className="w-[150px] h-[20px] relative z-40 drop-shadow-md -mt-1"
                                    style={{ zIndex: 40 + i }}
                                >
                                    <Image src={extra.image} alt={extra.label} fill className="object-cover rounded" />
                                </motion.div>
                            ))}

                            {/* Top Bun */}
                            <motion.div key={bun.id + '-top'} variants={stackItem} initial="hidden" animate="visible" className="w-[190px] h-[70px] relative z-50 drop-shadow-2xl -mt-4 cursor-pointer">
                                <Image src={bun.image} alt={bun.label} fill className="object-cover rounded-t-[50px] rounded-b-lg" style={{ objectPosition: 'top' }} />
                                {/* Highlight */}
                                <div className="absolute top-2 left-6 w-12 h-6 bg-white/20 blur-md rounded-full -rotate-12 pointer-events-none" />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Controls (Scrollable) */}
                <div className="p-6 pb-32 lg:pb-8 space-y-10 bg-white">

                    {/* Buns */}
                    <section>
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            1. El Pan
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {BURGER_BUNS.map(b => (
                                <button
                                    key={b.id}
                                    onClick={() => setBun(b)}
                                    className={cn(
                                        "p-3 rounded-xl border-2 transition-all text-left relative overflow-hidden group",
                                        bun.id === b.id ? "border-amber-500 bg-amber-50" : "border-stone-100 hover:border-stone-200"
                                    )}
                                >
                                    <div className="flex justify-center mb-2 h-16 relative">
                                        <Image src={b.image} alt={b.label} width={80} height={60} className="object-contain drop-shadow transition-transform group-hover:scale-110" />
                                    </div>
                                    <div className="font-bold text-sm leading-tight mb-1">{b.label}</div>
                                    <div className="text-xs text-stone-500">
                                        {b.price === 0 ? 'Incluido' : `+$${b.price}`}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Patties */}
                    <section>
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            2. La Carne
                        </h2>
                        <div className="grid gap-3">
                            {BURGER_PATTIES.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setPatty(p)}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-xl border-2 transition-all relative overflow-hidden group",
                                        patty.id === p.id ? "border-amber-500 bg-amber-50" : "border-stone-100 hover:border-stone-200"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 relative">
                                            <Image src={p.image} alt={p.label} fill className="object-contain drop-shadow-md" />
                                        </div>
                                        <div className="font-bold text-stone-900">{p.label}</div>
                                    </div>
                                    <div className="font-bold text-stone-900">${p.price}</div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Cheese */}
                    <section>
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            3. El Queso
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {BURGER_CHEESES.map(c => (
                                <button
                                    key={c.id}
                                    onClick={() => setCheese(c)}
                                    className={cn(
                                        "px-4 py-3 rounded-xl border-2 transition-all font-medium text-sm flex items-center gap-3",
                                        cheese.id === c.id ? "border-amber-500 bg-amber-50 text-amber-900" : "border-stone-200 text-stone-600 hover:border-stone-300"
                                    )}
                                >
                                    {c.image ? (
                                        <div className="w-8 h-8 relative shrink-0">
                                            <Image src={c.image} alt={c.label} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center bg-stone-50 text-xs">
                                            🚫
                                        </div>
                                    )}
                                    <div className="text-left">
                                        <div className="font-bold">{c.label}</div>
                                        {c.price > 0 && <div className="text-xs text-amber-600">+${c.price}</div>}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Extras */}
                    <section>
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            4. Extras
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {BURGER_EXTRAS.map(e => {
                                const isSelected = extras.some(ex => ex.id === e.id);
                                return (
                                    <button
                                        key={e.id}
                                        onClick={() => toggleExtra(e)}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-xl border-2 transition-all group",
                                            isSelected ? "border-green-500 bg-green-50" : "border-stone-100 hover:border-stone-200"
                                        )}
                                    >
                                        <div className="w-12 h-12 relative shrink-0">
                                            <Image src={e.image} alt={e.label} fill className="object-contain transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="text-left flex-1">
                                            <div className="font-bold text-sm text-stone-900">{e.label}</div>
                                            <div className="text-xs text-stone-500">+${e.price}</div>
                                        </div>
                                        {isSelected && <div className="w-2 h-2 rounded-full bg-green-500" />}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                </div>
            </main>

            {/* Mobile Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 z-50 lg:hidden">
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl"
                >
                    <ShoppingBag size={20} /> Agregar (${totalPrice})
                </button>
            </div>

            {/* Desktop Action (Floating) */}
            <div className="hidden lg:block fixed bottom-8 right-8 z-50">
                <button
                    onClick={handleAddToCart}
                    className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-xl flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform"
                >
                    <ShoppingBag size={24} /> <span>Agregar al Pedido</span> <span className="bg-white/20 px-2 py-0.5 rounded text-base">${totalPrice}</span>
                </button>
            </div>

        </div>
    );
}
