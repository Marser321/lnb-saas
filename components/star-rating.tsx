"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: "sm" | "md" | "lg";
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
    showValue?: boolean;
}

export function StarRating({
    rating,
    maxRating = 5,
    size = "md",
    interactive = false,
    onRatingChange,
    showValue = false
}: StarRatingProps) {
    const sizes = {
        sm: 14,
        md: 18,
        lg: 24
    };

    const handleClick = (index: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(index + 1);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {Array.from({ length: maxRating }).map((_, index) => {
                    const filled = index < Math.floor(rating);
                    const partial = !filled && index < rating;

                    return (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            disabled={!interactive}
                            className={cn(
                                "transition-transform",
                                interactive && "hover:scale-110 cursor-pointer",
                                !interactive && "cursor-default"
                            )}
                        >
                            <Star
                                size={sizes[size]}
                                className={cn(
                                    "transition-colors",
                                    filled ? "text-amber-400 fill-amber-400" :
                                        partial ? "text-amber-400 fill-amber-400/50" :
                                            "text-stone-300 dark:text-stone-600"
                                )}
                            />
                        </button>
                    );
                })}
            </div>
            {showValue && (
                <span className="text-sm font-medium text-stone-600 dark:text-stone-400 ml-1">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
