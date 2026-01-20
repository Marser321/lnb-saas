import { Croissant, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
    className?: string;
    variant?: "light" | "dark" | "color";
    size?: "sm" | "md" | "lg" | "xl";
    showText?: boolean;
}

export function BrandLogo({
    className,
    variant = "color",
    size = "md",
    showText = false
}: BrandLogoProps) {

    // Size configurations
    const sizes = {
        sm: { icon: 20, container: "w-8 h-8", text: "text-lg" },
        md: { icon: 32, container: "w-12 h-12", text: "text-2xl" },
        lg: { icon: 48, container: "w-20 h-20", text: "text-4xl" },
        xl: { icon: 80, container: "w-32 h-32", text: "text-6xl" }
    };

    const currentSize = sizes[size];

    // Color configurations
    const colors = {
        light: "text-white",
        dark: "text-stone-900",
        color: "text-amber-500"
    };

    return (
        <div className={cn("flex flex-col items-center justify-center relative", className)}>
            <div className={cn("relative flex items-center justify-center", currentSize.container)}>
                {/* Main Icon Composition */}
                <div className="relative z-10">
                    <Croissant
                        size={currentSize.icon}
                        className={cn(
                            "absolute -top-1 -left-1 rotate-[-15deg] drop-shadow-sm transition-transform group-hover:rotate-[-25deg]",
                            variant === "color" ? "text-amber-400" : colors[variant]
                        )}
                        strokeWidth={1.5}
                    />
                    <Coffee
                        size={currentSize.icon}
                        className={cn(
                            "absolute top-2 left-2 rotate-[15deg] drop-shadow-md transition-transform group-hover:rotate-[5deg]",
                            variant === "color" ? "text-stone-800" : colors[variant]
                        )}
                        strokeWidth={1.5}
                    />
                </div>

                {/* Optional Glow for 'color' variant */}
                {variant === "color" && (
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
            </div>

            {showText && (
                <div className={cn("text-center mt-2 font-serif font-bold tracking-tight leading-none", currentSize.text, variant === "light" ? "text-white" : "text-stone-900")}>
                    <span className="block">La Nueva</span>
                    <span className="block text-amber-500">Brasil</span>
                </div>
            )}
        </div>
    );
}
