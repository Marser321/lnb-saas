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
                <div className="relative bg-stone-200 flex items-center justify-center p-8 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-hidden">
                    <div className="relative w-full max-w-4xl h-[700px] flex flex-col justify-end items-center perspective-1000 pb-12">
                        <AnimatePresence mode="popLayout">
                            {(() => {
                                let currentHeight = 0;
                                const elements = [];

                                // 1. Bottom Bun
                                elements.push(
                                    <motion.div
                                        key="bun-bottom"
                                        className="absolute w-[600px] h-[180px] z-10 mix-blend-multiply"
                                        style={{ bottom: 0 }}
                                        initial={{ y: 200, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    >
                                        <Image
                                            src={bun.bottomImage || '/images/studio/burger-bun-bottom.png'}
                                            alt="Bottom Bun"
                                            fill
                                            className="object-contain"
                                        />
                                    </motion.div>
                                );
                                currentHeight += 50; // Increased base height

                                // 2. Patty
                                elements.push(
                                    <motion.div
                                        key={patty.id}
                                        className="absolute w-[580px] h-[180px] z-20 mix-blend-multiply"
                                        style={{ bottom: currentHeight }}
                                        initial={{ y: -100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                    >
                                        <Image src={patty.image} alt={patty.label} fill className="object-contain" />
                                    </motion.div>
                                );
                                currentHeight += (patty.thickness ? patty.thickness * 1.8 : 45); // More vertical separation

                                // 3. Cheese
                                if (cheese.id !== 'none') {
                                    elements.push(
                                        <motion.div
                                            key={cheese.id}
                                            className="absolute w-[590px] h-[180px] z-30 pointer-events-none mix-blend-multiply"
                                            style={{ bottom: currentHeight - 20 }} // Overlap
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            {cheese.image && (
                                                <Image src={cheese.image} alt={cheese.label} fill className="object-contain" />
                                            )}
                                        </motion.div>
                                    );
                                    currentHeight += (cheese.thickness ? cheese.thickness * 1.8 : 20);
                                }

                                // 4. Extras
                                extras.forEach((extra, i) => {
                                    elements.push(
                                        <motion.div
                                            key={extra.id}
                                            className="absolute w-[580px] h-[180px] mix-blend-multiply"
                                            style={{
                                                bottom: currentHeight,
                                                zIndex: 40 + i
                                            }}
                                            initial={{ x: i % 2 === 0 ? -200 : 200, opacity: 0, rotate: i % 2 === 0 ? -10 : 10 }}
                                            animate={{ x: 0, opacity: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 120, damping: 15 }}
                                        >
                                            <Image src={extra.image} alt={extra.label} fill className="object-contain" />
                                        </motion.div>
                                    );
                                    currentHeight += (extra.thickness ? extra.thickness * 1.8 : 20);
                                });

                                // 5. Top Bun
                                elements.push(
                                    <motion.div
                                        key="bun-top"
                                        className="absolute w-[600px] h-[200px] mix-blend-multiply z-50"
                                        style={{
                                            bottom: currentHeight - 20,
                                        }}
                                        initial={{ y: -300, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ type: "spring", mass: 1.2, stiffness: 80 }}
                                    >
                                        <Image
                                            src={bun.image}
                                            alt={bun.label}
                                            fill
                                            className="object-contain"
                                        />
                                    </motion.div>
                                );

                                return elements;
                            })()}
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
