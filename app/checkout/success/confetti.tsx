"use client";

import { useEffect, useState } from "react";

export default function Confetti() {
    const [particles, setParticles] = useState<Array<{
        id: number;
        x: number;
        delay: number;
        duration: number;
        color: string;
        size: number;
    }>>([]);

    useEffect(() => {
        const colors = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 6 + Math.random() * 8,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute animate-confetti"
                    style={{
                        left: `${particle.x}%`,
                        top: '-20px',
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                .animate-confetti {
                    animation: confetti-fall linear forwards;
                }
            `}</style>
        </div>
    );
}
