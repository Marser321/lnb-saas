"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CakeShowcaseProps {
    baseId: string;
    fillingId: string;
    fillingLabel: string;
    fillingImage: string;
    toppingId: string;
    toppingLabel: string;
}

// Map base IDs to their premium images
const CAKE_IMAGES: Record<string, string> = {
    vanilla: '/cakes/cake_vanilla_premium_1768693258745.png',
    chocolate: '/cakes/cake_chocolate_premium_1768693272400.png',
    redvelvet: '/cakes/cake_redvelvet_premium_1768693285364.png',
};

// Topping visual configurations - BIGGER SIZES
const TOPPING_VISUALS: Record<string, { emoji: string; count: number; size: string }> = {
    merengue: { emoji: '🍦', count: 5, size: 'text-5xl' },
    chocolate_shavings: { emoji: '🍫', count: 6, size: 'text-4xl' },
    macarons: { emoji: '🧁', count: 4, size: 'text-5xl' },
    flowers: { emoji: '🌸', count: 5, size: 'text-5xl' },
    strawberries: { emoji: '🍓', count: 6, size: 'text-5xl' },
};

export function Cake3DViewer({ baseId, fillingId, fillingLabel, fillingImage, toppingId, toppingLabel }: CakeShowcaseProps) {
    const currentImage = CAKE_IMAGES[baseId] || CAKE_IMAGES.vanilla;
    const toppingConfig = TOPPING_VISUALS[toppingId] || TOPPING_VISUALS.merengue;

    return (
        <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-50 via-stone-50 to-stone-100 shadow-inner">

            {/* Ambient Light Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-200/80 to-transparent pointer-events-none" />

            {/* Main Cake Image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={baseId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative w-[85%] aspect-square"
                >
                    <Image
                        src={currentImage}
                        alt="Tu torta personalizada"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />

                    {/* === FILLING OVERLAY - BIGGER PILL === */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`filling-${fillingId}`}
                            initial={{ opacity: 0, scale: 0.5, x: -30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 30 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute left-[8%] top-[40%] w-24 h-14 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80"
                            style={{ transform: 'rotate(-8deg)' }}
                        >
                            <Image
                                src={fillingImage}
                                alt={fillingLabel}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                            <div className="absolute bottom-1 left-2 text-[8px] font-bold text-white drop-shadow-md uppercase tracking-wide">
                                {fillingLabel}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* === TOPPINGS OVERLAY - BIGGER === */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`topping-${toppingId}`}
                            initial={{ opacity: 0, y: -50, scale: 0.3 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.5 }}
                            transition={{ type: "spring", stiffness: 180, damping: 12 }}
                            className="absolute top-[2%] left-1/2 -translate-x-1/2 flex gap-0"
                        >
                            {Array.from({ length: toppingConfig.count }).map((_, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: -80, opacity: 0, rotate: -20 }}
                                    animate={{ y: 0, opacity: 1, rotate: (i - toppingConfig.count / 2) * 12 }}
                                    transition={{ delay: i * 0.06, type: "spring", stiffness: 250, damping: 12 }}
                                    className={`${toppingConfig.size} drop-shadow-lg`}
                                >
                                    {toppingConfig.emoji}
                                </motion.span>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Bottom Labels */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center flex-wrap">
                <motion.div
                    layout
                    key={fillingLabel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-100 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-amber-800 shadow-md border border-amber-200"
                >
                    🍯 {fillingLabel}
                </motion.div>
                <motion.div
                    layout
                    key={toppingLabel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-rose-100 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-rose-800 shadow-md border border-rose-200"
                >
                    {TOPPING_VISUALS[toppingId]?.emoji} {toppingLabel}
                </motion.div>
            </div>

            {/* Decorative Label */}
            <div className="absolute top-4 left-4 text-xs font-bold text-stone-400 uppercase tracking-widest">
                Vista Previa
            </div>
        </div>
    );
}
