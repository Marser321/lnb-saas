"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Coffee, Crown, Sparkles, Zap, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
    {
        id: "start",
        name: "LNB Start",
        price: 15000,
        period: "mes",
        description: "Ideal para los que disfrutan un buen café ocasional.",
        icon: Coffee,
        color: "bg-stone-900",
        textColor: "text-stone-900",
        features: [
            "5 Cafés de Especialidad al mes",
            "10% OFF en Pastelería",
            "Sin filas (Express Line)",
        ],
        popular: false
    },
    {
        id: "club",
        name: "LNB Club",
        price: 45000,
        period: "mes",
        description: "Tu rutina diaria, elevada al siguiente nivel.",
        icon: Star,
        color: "bg-amber-500",
        textColor: "text-amber-600",
        features: [
            "1 Café de Especialidad por día",
            "20% OFF en Pastelería",
            "Refill de Café del Día (Drip)",
            "Acceso anticipado a productos nuevos"
        ],
        popular: true
    },
    {
        id: "pro",
        name: "LNB Pro",
        price: 80000,
        period: "mes",
        description: "La experiencia definitiva para los verdaderos amantes del café.",
        icon: Crown,
        color: "bg-stone-900", // Will use gradient
        textColor: "text-stone-900",
        features: [
            "Café Ilimitado (cualquier estilo)",
            "1 Item de Comida por día",
            "Descuento en Catering (15%)",
            "Merchandising exclusivo",
            "Soporte VIP"
        ],
        popular: false
    }
];

export default function SubscriptionPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition">
                        <ArrowLeft size={20} />
                        <span className="font-bold">Volver</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-amber-500 p-1.5 rounded-lg text-stone-900">
                            <Crown size={16} fill="currentColor" />
                        </div>
                        <span className="font-bold tracking-tight">LNB Pass</span>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-12">

                {/* Hero */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <Sparkles size={12} /> Nuevo Lanzamiento
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900"
                    >
                        Nunca más pagues <br /> por un café individual.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-stone-500 max-w-2xl mx-auto"
                    >
                        Unite al club exclusivo de La Nueva Brasil. Disfrutá de tu café favorito todos los días por una suscripción mensual simple.
                    </motion.p>
                </div>

                {/* Switch */}
                <div className="flex justify-center mb-12">
                    <div className="bg-stone-200 p-1 rounded-full flex relative">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10",
                                billingCycle === "monthly" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                            )}
                        >
                            Mensual
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 flex items-center gap-2",
                                billingCycle === "yearly" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                            )}
                        >
                            Anual <span className="text-[10px] bg-emerald-500 text-white px-1.5 rounded-full">-20%</span>
                        </button>
                    </div>
                </div>

                {/* Tiers Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {TIERS.map((tier, index) => {
                        const price = billingCycle === "yearly" ? tier.price * 12 * 0.8 : tier.price;
                        const isPro = tier.id === 'pro';
                        const isSelected = selectedTier === tier.id;

                        return (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                                onClick={() => setSelectedTier(tier.id)}
                                className={cn(
                                    "relative rounded-3xl p-8 border-2 transition-all cursor-pointer group flex flex-col",
                                    isSelected ? "ring-2 ring-stone-900 transform scale-[1.02]" : "hover:border-stone-300",
                                    isPro ? "bg-stone-900 text-white border-stone-900" : "bg-white border-stone-100",
                                    tier.popular && !isPro && "border-amber-400 shadow-xl shadow-amber-500/10"
                                )}
                            >
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                                        MÁS ELEGIDO
                                    </div>
                                )}

                                <div className="mb-6">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                                        isPro ? "bg-white/10 text-white" : "bg-stone-100 text-stone-900",
                                        tier.popular && !isPro && "bg-amber-100 text-amber-600"
                                    )}>
                                        <tier.icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                    <p className={cn("text-sm leading-relaxed", isPro ? "text-stone-400" : "text-stone-500")}>
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold tracking-tight">${price.toLocaleString()}</span>
                                        <span className={cn("text-sm", isPro ? "text-stone-500" : "text-stone-400")}>/{billingCycle === 'monthly' ? 'mes' : 'año'}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-1">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <Check size={16} className={cn("mt-0.5 shrink-0", isPro ? "text-emerald-400" : "text-emerald-600")} />
                                            <span className={isPro ? "text-stone-300" : "text-stone-600"}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={cn(
                                    "w-full py-4 rounded-xl font-bold transition-all relative overflow-hidden group-hover:scale-[1.02]",
                                    isPro
                                        ? "bg-white text-stone-900 hover:bg-stone-100"
                                        : tier.popular
                                            ? "bg-amber-500 text-white hover:bg-amber-400 shadow-lg shadow-amber-500/25"
                                            : "bg-stone-100 text-stone-900 hover:bg-stone-200"
                                )}>
                                    <span className="relative z-10">Elegir {tier.name}</span>
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* FAQ / Guarantee */}
                <div className="mt-20 max-w-3xl mx-auto text-center space-y-8">
                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
                        <ShieldCheck size={40} className="text-emerald-500" />
                        <div>
                            <h3 className="text-lg font-bold mb-1">Garantía de Satisfacción</h3>
                            <p className="text-stone-500 text-sm">Cancelá cuando quieras. Sin preguntas, sin contratos a largo plazo.</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
