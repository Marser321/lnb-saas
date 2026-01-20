"use client";

import { useCartStore } from "@/lib/cart-store";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CartButton() {
    const { getItemCount, toggleCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const itemCount = mounted ? getItemCount() : 0;

    return (
        <button
            onClick={toggleCart}
            className="relative p-2.5 bg-white/10 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/20 transition-all duration-300 group border border-white/10"
            aria-label="Abrir carrito"
        >
            <ShoppingBag size={22} className="text-white group-hover:scale-110 transition-transform" />

            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200 px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                </span>
            )}

            {/* Pulse animation when items exist */}
            {itemCount > 0 && (
                <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-75" />
            )}
        </button>
    );
}
