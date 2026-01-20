"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/lib/favorites-store";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
    productId: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function FavoriteButton({ productId, size = "md", className }: FavoriteButtonProps) {
    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const liked = isFavorite(productId);

    const sizes = {
        sm: 16,
        md: 20,
        lg: 24
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(productId);
    };

    return (
        <motion.button
            onClick={handleClick}
            className={cn(
                "p-2 rounded-full transition-all",
                liked
                    ? "bg-red-100 text-red-500 hover:bg-red-200"
                    : "bg-white/80 text-stone-400 hover:bg-white hover:text-red-400",
                className
            )}
            whileTap={{ scale: 0.8 }}
            aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={liked ? "filled" : "empty"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                    <Heart
                        size={sizes[size]}
                        fill={liked ? "currentColor" : "none"}
                        className={liked ? "drop-shadow-sm" : ""}
                    />
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
