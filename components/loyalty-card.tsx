"use client";

import { Coffee, Gift, ChevronRight, Crown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    getLevelForPoints,
    getProgressToNextLevel,
    getPointsToNextLevel,
    getNextLevel,
    formatPoints,
    getBonusMultiplier,
} from "@/lib/loyalty";

// Mock data - In production, get from auth/store
const MOCK_USER_POINTS = 245;

export function LoyaltyCard() {
    const currentPoints = MOCK_USER_POINTS;
    const currentLevel = getLevelForPoints(currentPoints);
    const nextLevel = getNextLevel(currentLevel.id);
    const progress = getProgressToNextLevel(currentPoints);
    const pointsToNext = getPointsToNextLevel(currentPoints);
    const bonusMultiplier = getBonusMultiplier();

    const totalStamps = 10;
    const currentStamps = Math.min(10, Math.floor(currentPoints / 25)); // Every 25 points = 1 stamp

    return (
        <Link href="/crumb-club" className="block">
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl border border-stone-100 relative overflow-hidden group cursor-pointer"
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Coffee size={120} />
                </div>

                {/* Bonus Day Badge */}
                {bonusMultiplier > 1 && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                        <Sparkles size={10} />
                        {bonusMultiplier}x PUNTOS HOY
                    </div>
                )}

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <h3 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                            <span className="text-2xl">{currentLevel.emoji}</span>
                            Crumb Club
                            <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold",
                                currentLevel.bgColor, currentLevel.color
                            )}>
                                {currentLevel.name}
                            </span>
                        </h3>
                        <p className="text-stone-500 text-sm mt-1">
                            <span className="font-bold text-amber-600">{formatPoints(currentPoints)}</span> puntos
                            {nextLevel && (
                                <span className="text-stone-400"> · {pointsToNext} para {nextLevel.name}</span>
                            )}
                        </p>
                    </div>
                    <div className="h-10 w-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-sm">
                        <ChevronRight size={20} />
                    </div>
                </div>

                {/* Progress Bar to Next Level */}
                {nextLevel && (
                    <div className="mb-4 relative z-10">
                        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                            />
                        </div>
                    </div>
                )}

                {/* Stamps Grid */}
                <div className="flex justify-between items-center gap-2 relative z-10">
                    {Array.from({ length: totalStamps }).map((_, index) => {
                        const isFilled = index < currentStamps;
                        const isNext = index === currentStamps;

                        return (
                            <div key={index} className="flex-1 aspect-square relative flex items-center justify-center">
                                {/* Connector Line */}
                                {index < totalStamps - 1 && (
                                    <div className={cn(
                                        "absolute right-[-50%] top-1/2 w-full h-[2px] z-0",
                                        index < currentStamps - 1 ? "bg-amber-300" : "bg-stone-100"
                                    )} />
                                )}

                                {/* Stamp Circle */}
                                <div className={cn(
                                    "relative z-10 w-full h-full rounded-full flex items-center justify-center transition-all duration-500 border-2",
                                    isFilled ? "bg-amber-500 border-amber-500 shadow-md scale-100" :
                                        isNext ? "bg-white border-amber-300 border-dashed animate-pulse" : "bg-stone-50 border-stone-200"
                                )}>
                                    {isFilled ? (
                                        <Coffee size={14} className="text-white" strokeWidth={3} />
                                    ) : index === totalStamps - 1 ? (
                                        <Gift size={14} className="text-stone-300" />
                                    ) : (
                                        <span className="text-[10px] text-stone-300 font-bold">{index + 1}</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Reward Text */}
                <div className="mt-4 flex justify-between items-center text-xs font-medium text-stone-400 relative z-10">
                    <span>Progreso</span>
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Gift size={12} /> Café Gratis
                    </span>
                </div>

                {/* Hover CTA */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-50 to-transparent h-12 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <span className="text-xs font-bold text-amber-700">Ver todos los beneficios →</span>
                </div>
            </motion.div>
        </Link>
    );
}
