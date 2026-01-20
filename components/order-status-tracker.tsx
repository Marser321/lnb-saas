"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, ChefHat, Timer, PackageCheck, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function OrderStatusTracker() {
    const [currentStep, setCurrentStep] = useState(1);

    // Simulate progress
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
        }, 4000); // Advance every 4 seconds for demo
        return () => clearInterval(timer);
    }, []);

    const steps = [
        { id: 1, title: "Recibido", icon: PackageCheck, desc: "Orden confirmada" },
        { id: 2, title: "Horneando", icon: ChefHat, desc: "El chef está en acción" },
        { id: 3, title: "Preparando", icon: UtensilsCrossed, desc: "Últimos toques y packaging" },
        { id: 4, title: "Listo", icon: CheckCircle2, desc: "¡Pasa a retirar!" },
    ];

    return (
        <div className="w-full bg-white rounded-3xl p-8 shadow-2xl border border-stone-100 max-w-sm mx-auto">
            <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-2 animate-pulse">
                    EN VIVO
                </div>
                <h2 className="text-2xl font-bold text-stone-900">Tu Pedido #4821</h2>
                <p className="text-stone-500 text-sm">Estimado en 8 min</p>
            </div>

            <div className="relative space-y-8 pl-4">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-stone-100 -z-10" />
                <motion.div
                    className="absolute left-[27px] top-2 w-0.5 bg-amber-500 -z-10"
                    initial={{ height: "0%" }}
                    animate={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />

                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex items-start gap-4 relaltive">
                            <div className={cn(
                                "w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 bg-white z-10 shrink-0",
                                isActive ? "border-amber-500 text-amber-500 scale-110 shadow-lg" :
                                    isCompleted ? "border-emerald-500 text-emerald-500" : "border-stone-100 text-stone-300"
                            )}>
                                <step.icon size={24} />
                            </div>
                            <div className={cn("pt-2 transition-opacity duration-500", isActive || isCompleted ? "opacity-100" : "opacity-40")}>
                                <h4 className="font-bold text-stone-900 leading-none mb-1">{step.title}</h4>
                                <p className="text-xs text-stone-500">{step.desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
