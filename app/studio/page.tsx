"use client";

import { BrandLogo } from "@/components/brand-logo";
import { ArrowLeft, ArrowRight, ChefHat, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CakeStudioLanding() {
    return (
        <div className="min-h-screen bg-stone-900 relative overflow-hidden flex flex-col">
            {/* Background */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920&h=1080&fit=crop"
                    alt="Cake Studio Background"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-stone-900/50" />

            {/* Header */}
            <header className="relative z-10 p-6 flex justify-between items-center">
                <Link href="/" className="text-white/50 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                {/* Note: User requested original logo usage but for new features strict adherence to modern design might prefer the icon. 
                I'll use the image to be safe as per "restore original logo" instruction. */}
                <div className="relative w-10 h-10">
                    <Image src="/logo.png" alt="LNB" fill className="object-contain" />
                </div>
            </header>

            {/* Hero Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-6 bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-emerald-500/30 flex items-center gap-2">
                    <Sparkles size={12} /> Nuevo
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400 mb-4 tracking-tighter">
                    The Cake Studio
                </h1>
                <p className="text-stone-400 max-w-md text-lg mb-10 leading-relaxed">
                    Diseñá la torta de tus sueños capa por capa. Elegí el bizcochuelo, el relleno y la decoración. Nosotros la hacemos realidad.
                </p>

                <Link
                    href="/studio/customize"
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-stone-900 transition-all duration-200 bg-white font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 hover:scale-105 active:scale-95"
                >
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-stone-200"></span>
                    <span className="relative flex items-center gap-2">
                        Comenzar a Diseñar <ArrowRight size={20} />
                    </span>
                </Link>

                <div className="mt-12 flex gap-8 text-stone-500 text-xs">
                    <div className="flex flex-col items-center gap-2">
                        <ChefHat size={20} />
                        <span>Pasteleros Expertos</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Sparkles size={20} />
                        <span>Ingredientes Premium</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
