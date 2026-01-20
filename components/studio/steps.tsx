import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepsProps {
    currentStep: number;
    totalSteps: number;
}

export function Steps({ currentStep, totalSteps }: StepsProps) {
    return (
        <div className="flex w-full items-center justify-between px-8">
            {Array.from({ length: totalSteps }).map((_, i) => {
                const stepNum = i + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                return (
                    <div key={stepNum} className="flex flex-col items-center gap-2">
                        <div
                            className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                                isActive
                                    ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-200"
                                    : isCompleted
                                        ? "border-emerald-600 bg-white text-emerald-600"
                                        : "border-gray-300 bg-transparent text-gray-300"
                            )}
                        >
                            {isCompleted ? <Check size={14} strokeWidth={3} /> : <span className="text-xs font-bold">{stepNum}</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
