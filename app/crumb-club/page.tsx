"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Gift,
    Star,
    Coffee,
    ChevronRight,
    Sparkles,
    Crown,
    Check,
    Lock,
    Info,
    Calendar,
    TrendingUp,
    HeartPulse,
    Stethoscope,
    MapPin
} from "lucide-react";
import {
    LOYALTY_LEVELS,
    REWARDS_CATALOG,
    getLevelForPoints,
    getNextLevel,
    getProgressToNextLevel,
    getPointsToNextLevel,
    formatPoints,
    getAvailableRewards,
    getBonusMultiplier,
    type Reward,
} from "@/lib/loyalty";
import { cn } from "@/lib/utils";

// Mock user data - In production, this would come from auth/database
const MOCK_USER = {
    name: "María",
    points: 245,
    totalSpent: 2450,
    memberSince: new Date(2024, 5, 15),
    purchases: 12,
};

function RewardCard({ reward, userPoints }: { reward: Reward; userPoints: number }) {
    const canRedeem = userPoints >= reward.pointsCost;
    const pointsNeeded = reward.pointsCost - userPoints;

    return (
        <motion.div
            whileHover={{ scale: canRedeem ? 1.02 : 1 }}
            className={cn(
                "bg-white rounded-2xl overflow-hidden shadow-sm border transition-all",
                canRedeem ? "border-amber-200 hover:shadow-lg cursor-pointer" : "border-stone-100 opacity-75"
            )}
        >
            <div className="relative h-36">
                <Image src={reward.image} alt={reward.name} fill className="object-cover" />
                {!canRedeem && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Lock className="text-white" size={24} />
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/10">
                    {reward.pointsCost} pts
                </div>
                {reward.id.includes('pack') && (
                    <div className="absolute bottom-2 left-2 bg-emerald-500 px-2 py-0.5 rounded-md text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                        RECOMENDADO
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-stone-800 text-sm leading-tight mb-1">{reward.name}</h3>
                <p className="text-[10px] text-stone-500 leading-snug min-h-[2.5em]">{reward.description}</p>
                {canRedeem ? (
                    <button className="mt-3 w-full bg-stone-900 text-white py-2 rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md">
                        <Gift size={14} /> Canjear
                    </button>
                ) : (
                    <p className="mt-3 text-[10px] text-center text-stone-400 font-medium">
                        Te faltan <span className="font-bold text-amber-600">{pointsNeeded}</span> pts
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export default function CrumbClubPage() {
    const [activeTab, setActiveTab] = useState<'rewards' | 'levels' | 'history'>('rewards');

    const userPoints = MOCK_USER.points;
    const currentLevel = getLevelForPoints(userPoints);
    const nextLevel = getNextLevel(currentLevel.id);
    const progress = getProgressToNextLevel(userPoints);
    const pointsToNext = getPointsToNextLevel(userPoints);
    const availableRewards = getAvailableRewards(userPoints);
    const bonusMultiplier = getBonusMultiplier();

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
                <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-stone-600" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                            Club LNB <Crown size={20} className="text-amber-500" />
                        </h1>
                        <p className="text-xs text-stone-500">Tu tarjeta, tus premios</p>
                    </div>
                </div>
            </header>

            <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
                {/* User Level Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden ring-4 ring-stone-900/10"
                >
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <p className="text-stone-300 text-xs font-medium uppercase tracking-wider mb-1">Bienvenido</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl filter drop-shadow-md">{currentLevel.emoji}</span>
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold leading-none">{MOCK_USER.name}</span>
                                        <span className="text-xs text-stone-400 font-medium">{currentLevel.name} Member</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-amber-400 text-xs uppercase font-bold tracking-widest">PUNTOS LNB</p>
                                <p className="text-4xl font-bold tracking-tight">{formatPoints(userPoints)}</p>
                            </div>
                        </div>

                        {/* Progress to next level */}
                        {nextLevel && (
                            <div className="mt-6">
                                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-2">
                                    <span>Nivel actual</span>
                                    <span>Próximo: {nextLevel.name}</span>
                                </div>
                                <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full box-shadow-glow"
                                    />
                                </div>
                                <p className="text-right text-[10px] text-stone-400 mt-1">
                                    Faltan {pointsToNext} pts para subir
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Health Staff Perk Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 flex items-center gap-4 relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                    <div className="bg-emerald-50 p-2.5 rounded-full text-emerald-600 shrink-0">
                        <HeartPulse size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-stone-800 text-sm flex items-center gap-1">
                            ¿Sos Personal de Salud? <Stethoscope size={14} className="text-stone-400" />
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                            Si trabajás en <span className="font-bold text-emerald-700">Cantegril</span> o <span className="font-bold text-emerald-700">Roosevelt</span>, presentá tu ID y accedé a un <span className="font-bold text-emerald-600">5% OFF EXTRA</span> en Combos de Guardia.
                        </p>
                    </div>
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-stone-100">
                        <Coffee size={20} className="mx-auto text-amber-500 mb-2" />
                        <p className="text-xl font-bold text-stone-900">{MOCK_USER.purchases}</p>
                        <p className="text-[10px] text-stone-500 font-bold uppercase">Visitas</p>
                    </div>
                    <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-stone-100">
                        <TrendingUp size={20} className="mx-auto text-emerald-500 mb-2" />
                        <p className="text-xl font-bold text-stone-900">${MOCK_USER.totalSpent}</p>
                        <p className="text-[10px] text-stone-500 font-bold uppercase">Ahorrado</p>
                    </div>
                    <div className="bg-white rounded-2xl p-3 text-center shadow-sm border border-stone-100">
                        <Calendar size={20} className="mx-auto text-blue-500 mb-2" />
                        <p className="text-sm font-bold text-stone-900 mt-1">
                            {MOCK_USER.memberSince.toLocaleDateString('es-UY', { month: 'short', year: '2-digit' })}
                        </p>
                        <p className="text-[10px] text-stone-500 font-bold uppercase mt-1">Socio Desde</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-stone-100 shadow-sm sticky top-20 z-30">
                    {[
                        { id: 'rewards', label: 'Catálogo', icon: Gift },
                        { id: 'levels', label: 'Beneficios', icon: Star },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                                activeTab === tab.id
                                    ? "bg-stone-900 text-white shadow-md transform scale-[1.02]"
                                    : "text-stone-500 hover:bg-stone-50"
                            )}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'rewards' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 pb-20"
                    >
                        <div className="flex items-center justify-between px-1">
                            <h2 className="font-bold text-stone-800 flex items-center gap-2">
                                <Sparkles size={16} className="text-amber-500" /> Premios Disponibles
                            </h2>
                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-bold border border-amber-100">
                                {availableRewards.length} opciones
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {REWARDS_CATALOG.map((reward) => (
                                <RewardCard key={reward.id} reward={reward} userPoints={userPoints} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'levels' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 pb-20"
                    >
                        <div className="flex items-center justify-between px-1">
                            <h2 className="font-bold text-stone-800">Tu Crecimiento</h2>
                            <span className="text-xs text-stone-400">Desbloqueá más poder</span>
                        </div>

                        <div className="space-y-3">
                            {LOYALTY_LEVELS.map((level, index) => {
                                const isCurrentLevel = level.id === currentLevel.id;
                                const isUnlocked = userPoints >= level.minPoints;

                                return (
                                    <motion.div
                                        key={level.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={cn(
                                            "bg-white rounded-2xl p-5 border-2 transition-all relative overflow-hidden",
                                            isCurrentLevel
                                                ? "border-amber-400 shadow-lg"
                                                : isUnlocked
                                                    ? "border-stone-200"
                                                    : "border-stone-100 opacity-60 grayscale-[0.5]"
                                        )}
                                    >
                                        {isCurrentLevel && (
                                            <div className="absolute right-0 top-0 bg-amber-400 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">
                                                ESTÁS ACÁ
                                            </div>
                                        )}
                                        <div className="flex items-start gap-4">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-stone-100",
                                                level.bgColor
                                            )}>
                                                {isUnlocked ? level.emoji : <Lock size={20} className="text-stone-300" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className={cn("font-bold text-lg", level.color)}>{level.name}</h3>
                                                </div>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">
                                                    {level.maxPoints === Infinity
                                                        ? `+${level.minPoints} PTS`
                                                        : `${level.minPoints} - ${level.maxPoints} PTS`
                                                    }
                                                </p>
                                                <ul className="space-y-1.5">
                                                    {level.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs font-medium text-stone-600">
                                                            <div className="mt-0.5 bg-emerald-100 text-emerald-600 rounded-full p-0.5">
                                                                <Check size={10} strokeWidth={3} />
                                                            </div>
                                                            {benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
