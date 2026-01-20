"use client";

import { useEffect, useState } from "react";
import { Coffee, Sun, Moon, Utensils, ArrowRight, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/cart-store";
import { EXPRESS_MENU, Product } from "@/lib/data";

interface SuggestionItem {
    title: string;
    description: string;
    icon: typeof Coffee;
    price: string;
    productIds: string[]; // IDs of products to add
}

export function QuickReorder() {
    const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening">("morning");
    const [greeting, setGreeting] = useState("");
    const [suggestion, setSuggestion] = useState<SuggestionItem>({
        title: "",
        description: "",
        icon: Coffee,
        price: "",
        productIds: []
    });
    const [isAdded, setIsAdded] = useState(false);

    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setTimeOfDay("morning");
            setGreeting("Buen día, Mario");
            setSuggestion({
                title: "Tu Ritual Matutino",
                description: "Cappuccino + 2 Medialunas",
                icon: Sun,
                price: "$280",
                productIds: ["cap-001", "med-001"] // Cappuccino + Medialuna
            });
        } else if (hour >= 12 && hour < 19) {
            setTimeOfDay("afternoon");
            setGreeting("Buenas tardes, Mario");
            setSuggestion({
                title: "Pausa de la Tarde",
                description: "Latte + Factura",
                icon: Utensils,
                price: "$240",
                productIds: ["lat-001", "fac-001"] // Latte + Factura
            });
        } else {
            setTimeOfDay("evening");
            setGreeting("Buenas noches, Mario");
            setSuggestion({
                title: "Un gusto para cerrar",
                description: "Cheesecake de Frutos Rojos",
                icon: Moon,
                price: "$320",
                productIds: ["che-001"] // Cheesecake
            });
        }
    }, []);

    const handleAddToCart = () => {
        if (isAdded) return;

        // Find and add each product
        suggestion.productIds.forEach((productId) => {
            const product = EXPRESS_MENU.find(p => p.id === productId);
            if (product) {
                // Add 2 medialunas for morning ritual, 1 for everything else
                const quantity = productId === "medialuna" && timeOfDay === "morning" ? 2 : 1;
                addItem(product, quantity);
            }
        });

        setIsAdded(true);

        // Open cart after a short delay
        setTimeout(() => {
            setCartOpen(true);
        }, 500);

        // Reset after 3 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 3000);
    };

    return (
        <div
            className="w-full max-w-2xl mb-8 relative group cursor-pointer"
            onClick={handleAddToCart}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

            <div className={cn(
                "relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-between overflow-hidden transition-all duration-300",
                isAdded && "bg-emerald-500/20 border-emerald-400/50"
            )}>
                {/* Decorative background icon */}
                <suggestion.icon className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32 rotate-12" />

                <div className="flex items-center gap-4">
                    <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                        isAdded ? "bg-emerald-500 text-white" :
                            timeOfDay === "morning" ? "bg-amber-100 text-amber-600" :
                                timeOfDay === "afternoon" ? "bg-orange-100 text-orange-600" : "bg-indigo-900 text-indigo-300"
                    )}>
                        {isAdded ? <Check size={24} /> : <suggestion.icon size={24} />}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={cn(
                                "text-xs font-bold uppercase tracking-wider flex items-center gap-1",
                                isAdded ? "text-emerald-300" : "text-amber-300"
                            )}>
                                <Sparkles size={10} /> {isAdded ? "¡Agregado!" : "Sugerencia IA"}
                            </span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-none mb-1">{greeting}</h3>
                        <p className="text-white/70 text-sm">{suggestion.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                    <div className="text-right hidden sm:block">
                        <div className="text-white font-bold">{suggestion.price}</div>
                        <div className="text-white/40 text-[10px]">{isAdded ? "En tu carrito" : "Pedir ya"}</div>
                    </div>
                    <div className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl",
                        isAdded
                            ? "bg-emerald-500 text-white scale-110"
                            : "bg-white text-stone-900 hover:scale-110 active:scale-95"
                    )}>
                        {isAdded ? <Check size={20} /> : <ArrowRight size={20} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
