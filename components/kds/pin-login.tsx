"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ChefHat, Delete, ArrowRight } from "lucide-react";
import { validatePin, saveSession, StaffMember, ROLE_PERMISSIONS } from "@/lib/kds-auth";
import { cn } from "@/lib/utils";

interface PinLoginProps {
    onLogin: (staff: StaffMember) => void;
}

export function PinLogin({ onLogin }: PinLoginProps) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleDigit = (digit: string) => {
        if (pin.length < 4) {
            const newPin = pin + digit;
            setPin(newPin);
            setError(false);

            // Auto-submit on 4 digits
            if (newPin.length === 4) {
                setTimeout(() => {
                    const staff = validatePin(newPin);
                    if (staff) {
                        saveSession(staff);
                        onLogin(staff);
                    } else {
                        setError(true);
                        setShake(true);
                        setTimeout(() => {
                            setPin("");
                            setShake(false);
                        }, 500);
                    }
                }, 200);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
        setError(false);
    };

    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-sm"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber-500/30">
                        <ChefHat size={40} className="text-stone-900" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Kitchen Display</h1>
                    <p className="text-stone-400 text-sm">Ingresá tu PIN para acceder</p>
                </div>

                {/* PIN Display */}
                <motion.div
                    animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center gap-3 mb-8"
                >
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all",
                                pin.length > i
                                    ? error
                                        ? "bg-red-500/20 border-red-500 text-red-400"
                                        : "bg-amber-500/20 border-amber-500 text-amber-400"
                                    : "bg-white/5 border-white/20 text-white/30"
                            )}
                        >
                            {pin.length > i ? "•" : ""}
                        </div>
                    ))}
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-center text-sm mb-4"
                    >
                        PIN incorrecto. Intentá de nuevo.
                    </motion.p>
                )}

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3">
                    {digits.map((digit, i) => {
                        if (digit === "") return <div key={i} />;
                        if (digit === "⌫") {
                            return (
                                <button
                                    key={i}
                                    onClick={handleDelete}
                                    className="h-16 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
                                >
                                    <Delete size={24} />
                                </button>
                            );
                        }
                        return (
                            <button
                                key={i}
                                onClick={() => handleDigit(digit)}
                                className="h-16 rounded-2xl bg-white/10 border border-white/10 text-white text-2xl font-bold hover:bg-white/20 active:scale-95 transition-all"
                            >
                                {digit}
                            </button>
                        );
                    })}
                </div>

                {/* Hint */}
                <p className="text-center text-stone-500 text-xs mt-6">
                    Demo: 1234 (Cocina) | 5678 (Mostrador) | 0000 (Admin)
                </p>
            </motion.div>
        </div>
    );
}
