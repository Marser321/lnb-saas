"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Zap, Moon, Sun, Heart, Smile, CloudRain, Flame, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXPRESS_MENU, Product } from "@/lib/data";
import { useCartStore } from "@/lib/cart-store";
import Image from "next/image";

// Mood Configuration
const MOODS = [
    { id: "tired", label: "Cansado", icon: Zap, color: "bg-amber-100 text-amber-600", productId: "esp-001" }, // Espresso
    { id: "happy", label: "Feliz", icon: Smile, color: "bg-yellow-100 text-yellow-600", productId: "che-001" }, // Cheesecake
    { id: "cold", label: "Con Frío", icon: CloudRain, color: "bg-blue-100 text-blue-600", productId: "lat-001" }, // Latte
    { id: "hungry", label: "Voraz", icon: Flame, color: "bg-red-100 text-red-600", productId: "san-001" }, // Sandwich
    { id: "romantic", label: "Romántico", icon: Heart, color: "bg-pink-100 text-pink-600", productId: "bro-001" }, // Brownie
    { id: "chill", label: "Relax", icon: Moon, color: "bg-purple-100 text-purple-600", productId: "cap-001" }, // Cappuccino
];

export function MoodSelector() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [recommendation, setRecommendation] = useState<Product | null>(null);
    const [isThinking, setIsThinking] = useState(false);

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    const handleMoodSelect = (moodId: string) => {
        if (selectedMood === moodId) return;

        setSelectedMood(moodId);
        setRecommendation(null);
        setIsThinking(true);

        const mood = MOODS.find(m => m.id === moodId);

        // Simulate "AI Thinking"
        setTimeout(() => {
            if (mood) {
                const product = EXPRESS_MENU.find(p => p.id === mood.productId);
                if (product) {
                    setRecommendation(product);
                }
            }
            setIsThinking(false);
        }, 1500);
    };

    const handleAccept = () => {
        if (recommendation) {
            addItem(recommendation);
            setCartOpen(true);
            setSelectedMood(null);
            setRecommendation(null);
        }
    };

    return (
        <div className="w-full">
            <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <SparklesIcon />
                ¿Cómo te sentís hoy?
            </h3>

            {/* Mood Scroller */}
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {MOODS.map((mood) => {
                    const Icon = mood.icon;
                    const isSelected = selectedMood === mood.id;

                    return (
                        <button
                            key={mood.id}
                            onClick={() => handleMoodSelect(mood.id)}
                            className={cn(
                                "flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-2xl transition-all border-2",
                                isSelected
                                    ? "bg-white border-stone-900 shadow-md scale-105"
                                    : "bg-white border-transparent hover:bg-stone-50 hover:border-stone-200"
                            )}
                        >
                            <div className={cn("p-2 rounded-full transition-colors", mood.color)}>
                                <Icon size={20} />
                            </div>
                            <span className={cn("text-xs font-bold", isSelected ? "text-stone-900" : "text-stone-500")}>
                                {mood.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Recommendation Card */}
            <AnimatePresence mode="wait">
                {isThinking ? (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-stone-100 rounded-2xl p-6 text-center"
                    >
                        <div className="animate-spin w-6 h-6 border-2 border-stone-400 border-t-stone-900 rounded-full mx-auto mb-2" />
                        <p className="text-stone-500 text-sm font-medium">Buscando el match perfecto...</p>
                    </motion.div>
                ) : recommendation ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-1 shadow-xl overflow-hidden mt-2 relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => { setSelectedMood(null); setRecommendation(null); }}
                            className="absolute top-3 right-3 z-20 bg-black/20 text-white p-1 rounded-full hover:bg-black/40 transition"
                        >
                            <X size={16} />
                        </button>

                        <div className="bg-stone-900 rounded-[22px] overflow-hidden flex flex-col sm:flex-row relative">
                            {/* Glow Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative w-full sm:w-1/3 h-32 sm:h-auto">
                                <Image
                                    src={recommendation?.image || ""}
                                    alt={recommendation?.name || ""}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5 sm:w-2/3 flex flex-col justify-center">
                                <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    Recomendado para vos
                                </p>
                                <h4 className="text-white text-xl font-bold mb-1">{recommendation.name}</h4>
                                <p className="text-stone-400 text-sm line-clamp-2 mb-4">
                                    {recommendation.description}
                                </p>

                                <div className="flex items-center gap-3">
                                    <span className="text-white font-bold text-lg">
                                        ${recommendation.price}
                                    </span>
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 bg-white text-stone-900 py-2.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-100 transition shadow-lg active:scale-95"
                                    >
                                        <ShoppingBag size={16} />
                                        Lo quiero
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

function SparklesIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
    );
}

