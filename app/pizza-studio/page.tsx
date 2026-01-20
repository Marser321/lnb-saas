"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ChevronRight, ShoppingBag, Info, Flame } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PIZZA_BASES, PIZZA_SAUCES, PIZZA_SIZES, PIZZA_TOPPINGS } from "@/lib/studio-data";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import Image from "next/image";

type Step = 'size' | 'base' | 'sauce' | 'toppings' | 'summary';

export default function PizzaStudioPage() {
    const [step, setStep] = useState<Step>('size');

    // Selections
    const [size, setSize] = useState(PIZZA_SIZES[0]);
    const [base, setBase] = useState(PIZZA_BASES[0]);
    const [sauce, setSauce] = useState(PIZZA_SAUCES[0]);
    const [toppings, setToppings] = useState<typeof PIZZA_TOPPINGS>([]);

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    // Calc Total
    const toppingsTotal = toppings.reduce((acc, t) => acc + t.price, 0);
    const totalPrice = size.basePrice + base.price + sauce.price + toppingsTotal;

    const toggleTopping = (topping: typeof PIZZA_TOPPINGS[0]) => {
        setToppings(prev =>
            prev.some(t => t.id === topping.id)
                ? prev.filter(t => t.id !== topping.id)
                : [...prev, topping]
        );
    };

    const handleAddToCart = () => {
        // Construct a product object manually
        const product = {
            id: `pizza-${Date.now()}`,
            name: `Pizza ${size.label.split(' ')[0]} Personalizada`,
            description: `${base.label}, ${sauce.label}, ${toppings.map(t => t.label).join(', ')}`,
            price: totalPrice,
            category: 'lunch' as const,
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=800&fit=crop",
            isPopular: false
        };

        addItem(product, 1);
        toast.success("¡Pizza agregada al carrito!");
        setCartOpen(true);
    };

    // Progress for step indicator
    const steps: Step[] = ['size', 'base', 'sauce', 'toppings', 'summary'];
    const currentStepIndex = steps.indexOf(step);
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setStep(steps[currentStepIndex + 1]);
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1]);
        }
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
                        <h1 className="font-bold text-lg">Pizza Studio</h1>
                        <p className="text-xs text-stone-500">Crea tu obra maestra</p>
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>
                {/* Progress Bar */}
                <div className="h-1 bg-stone-100 w-full">
                    <motion.div
                        className="h-full bg-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">

                {/* Pizza Visualizer (Top) */}
                <div className="relative h-72 w-72 mx-auto mb-8 flex items-center justify-center">
                    <motion.div
                        className="relative w-full h-full"
                        animate={{
                            scale: size.id === 'medium' ? 0.9 : size.id === 'large' ? 1.0 : 1.1,
                            rotate: step === 'toppings' ? 5 : 0 // Subtle rotation
                        }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        {/* Base Image Layer */}
                        <div className="absolute inset-0 rounded-full shadow-2xl overflow-hidden">
                            <Image
                                src={base.image} // This now points to high-res raw dough images
                                alt="Pizza Base"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Sauce Layer */}
                        {sauce.id !== 'none' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                            >
                                <Image
                                    src={sauce.image}
                                    alt={sauce.label}
                                    fill
                                    className="object-cover opacity-90 mix-blend-multiply p-4" // Added padding to simulate crust edge
                                />
                            </motion.div>
                        )}

                        {/* Toppings Layer */}
                        <div className="absolute inset-4 pointer-events-none z-10">
                            <AnimatePresence>
                                {toppings.map((t, i) => (
                                    <motion.div
                                        key={t.id + i}
                                        initial={{ opacity: 0, scale: 0, y: -20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="absolute w-12 h-12"
                                        style={{
                                            // Improved random positioning logic
                                            top: `${15 + (i * 17) % 65}%`,
                                            left: `${15 + (i * 23) % 65}%`,
                                            transform: `rotate(${i * 45}deg)`
                                        }}
                                    >
                                        <Image src={t.image} alt={t.label} width={48} height={48} className="object-contain drop-shadow-md" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        {/* Highlight/Shine */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 to-white/10 pointer-events-none" />
                    </motion.div>
                </div>

                {/* Steps Content */}
                <AnimatePresence mode="wait">
                    {step === 'size' && (
                        <motion.div
                            key="size"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-center mb-6">Elige el tamaño</h2>
                            <div className="grid gap-3">
                                {PIZZA_SIZES.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setSize(s)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border-2 transition-all relative overflow-hidden",
                                            size.id === s.id ? "border-red-500 bg-red-50" : "border-stone-200 bg-white hover:border-stone-300"
                                        )}
                                    >
                                        <div className="relative z-10 flex gap-4 items-center">
                                            <div className="w-16 h-16 rounded-full relative overflow-hidden bg-stone-200">
                                                <Image src={s.image} alt={s.label} fill className="object-cover" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-bold text-stone-900">{s.label}</div>
                                                <div className="text-xs text-stone-500">{s.diameter}</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-stone-900 relative z-10">${s.basePrice}</div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )
                    }

                    {
                        step === 'base' && (
                            <motion.div
                                key="base"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-center mb-6">Elige el tipo de masa</h2>
                                <div className="grid gap-3">
                                    {PIZZA_BASES.map(b => (
                                        <button
                                            key={b.id}
                                            onClick={() => setBase(b)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-xl border-2 transition-all overflow-hidden relative",
                                                base.id === b.id ? "border-red-500 bg-red-50" : "border-stone-200 bg-white hover:border-stone-300"
                                            )}
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="w-16 h-16 rounded-full relative overflow-hidden bg-stone-200">
                                                    <Image src={b.image} alt={b.label} fill className="object-cover" />
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-stone-900 flex items-center gap-2">
                                                        {b.label}
                                                        {b.price > 0 && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">+${b.price}</span>}
                                                    </div>
                                                    <div className="text-xs text-stone-500">{b.description}</div>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        step === 'sauce' && (
                            <motion.div
                                key="sauce"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-center mb-6">Elige la salsa</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {PIZZA_SAUCES.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => setSauce(s)}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all gap-3 relative overflow-hidden",
                                                sauce.id === s.id ? "border-red-500 bg-red-50" : "border-stone-200 bg-white hover:border-stone-300"
                                            )}
                                        >
                                            <div className="w-20 h-20 rounded-full shadow-inner relative overflow-hidden">
                                                <Image src={s.image} alt={s.label} fill className="object-cover" />
                                            </div>
                                            <div className="text-center relative z-10">
                                                <div className="font-bold text-stone-900 text-sm">{s.label}</div>
                                                {s.price > 0 && <div className="text-xs text-red-500 font-bold mt-1">+${s.price}</div>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        step === 'toppings' && (
                            <motion.div
                                key="toppings"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold text-center mb-6">Agrega tus ingredientes</h2>
                                <div className="grid grid-cols-3 gap-3">
                                    {PIZZA_TOPPINGS.map(t => {
                                        const isSelected = toppings.some(top => top.id === t.id);
                                        return (
                                            <button
                                                key={t.id}
                                                onClick={() => toggleTopping(t)}
                                                className={cn(
                                                    "flex flex-col items-center p-3 rounded-xl border-2 transition-all relative overflow-hidden",
                                                    isSelected ? "border-red-500 bg-red-50" : "border-stone-200 bg-white"
                                                )}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2 text-red-500 z-20">
                                                        <Check size={14} />
                                                    </div>
                                                )}
                                                <div className="w-16 h-16 rounded-full relative overflow-hidden bg-stone-100 mb-2">
                                                    <Image src={t.image} alt={t.label} fill className="object-cover" />
                                                </div>
                                                <div className="text-xs font-bold text-center leading-tight relative z-10">{t.label}</div>
                                                <div className="text-[10px] text-stone-500 mt-1 relative z-10">${t.price}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        step === 'summary' && (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-3xl p-6 shadow-xl border border-stone-100"
                            >
                                <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                                    <Flame className="text-red-500" /> ¡Lista para el horno!
                                </h2>

                                <div className="space-y-4 text-sm mb-6 border-b border-stone-100 pb-6">
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Tamaño</span>
                                        <span className="font-bold">{size.label}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Masa</span>
                                        <span className="font-bold">{base.label}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Salsa</span>
                                        <span className="font-bold">{sauce.label}</span>
                                    </div>
                                    <div className="pt-2">
                                        <span className="text-stone-500 block mb-2">Ingredientes ({toppings.length})</span>
                                        <div className="flex flex-wrap gap-1">
                                            {toppings.map(t => (
                                                <span key={t.id} className="bg-stone-100 px-2 py-1 rounded text-xs font-medium text-stone-700 flex items-center gap-1">
                                                    <div className="w-4 h-4 rounded-full relative overflow-hidden">
                                                        <Image src={t.image} alt={t.label} fill className="object-cover" />
                                                    </div>
                                                    {t.label}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-stone-500 font-medium">Total</span>
                                    <span className="text-3xl font-bold text-stone-900">${totalPrice}</span>
                                </div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>

            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-stone-200 z-50">
                <div className="max-w-3xl mx-auto flex gap-4">
                    {step !== 'size' && (
                        <button
                            onClick={prevStep}
                            className="px-4 py-3 rounded-xl font-bold text-stone-500 border-2 border-stone-200 hover:bg-stone-50"
                        >
                            Atrás
                        </button>
                    )}

                    {step === 'summary' ? (
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-stone-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-stone-800 transition shadow-lg flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={20} /> Agregar al Pedido (${totalPrice})
                        </button>
                    ) : (
                        <button
                            onClick={nextStep}
                            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-600 transition shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                        >
                            Siguiente <ChevronRight size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
