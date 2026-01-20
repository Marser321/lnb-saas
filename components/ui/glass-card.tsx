import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export function GlassCard({
    children,
    className,
    hoverEffect = false,
    ...props
}: GlassCardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl transition-all duration-300",
                hoverEffect && "hover:bg-white/20 hover:scale-[1.02] hover:shadow-2xl cursor-pointer",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
