"use client";

import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { QuickReorder } from "@/components/quick-reorder";
import { LoyaltyCard } from "@/components/loyalty-card";
import { Cake, Coffee, MapPin, Clock, Star, Instagram, Utensils, Crown, ChevronRight } from "lucide-react";
import { COMPANY_INFO, SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
    return (
        <main className="min-h-screen relative overflow-hidden">

            {/* Background Image - Cafetería/Bakery vibe */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&h=1080&fit=crop"
                    alt="Bakery Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Warm overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-950/80 via-amber-900/70 to-stone-900/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">

                {/* Hero Section */}
                <div className="text-center mb-10 space-y-3">
                    {/* Logo with Glow */}
                    {/* Logo with Glow */}
                    <div className="mx-auto w-36 h-36 relative mb-6 group hover:scale-105 transition-transform duration-500 flex items-center justify-center rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                        {/* Outer glow layer */}
                        <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-3xl scale-150 animate-pulse"></div>
                        {/* Inner glow layer */}
                        <div className="absolute inset-0 bg-amber-500/40 rounded-full blur-xl scale-110"></div>


                        <Image
                            src="/logo.png"
                            alt="La Nueva Brasil"
                            fill
                            className="object-contain relative z-10 drop-shadow-xl"
                            priority
                        />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight font-serif drop-shadow-lg">
                        {COMPANY_INFO.name}
                    </h1>
                    <p className="text-amber-200/80 text-sm font-light tracking-widest uppercase flex items-center justify-center gap-2">
                        <MapPin size={14} /> {COMPANY_INFO.location}
                    </p>

                    {/* Quick Info */}
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-white/90 text-xs flex items-center gap-1.5">
                            <Clock size={12} /> {COMPANY_INFO.hours}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-white/90 text-xs flex items-center gap-1.5">
                            <Star size={12} className="text-amber-300" /> 4.8
                        </span>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-white/90 text-xs flex items-center gap-1.5 hover:bg-white/30 transition">
                            <Instagram size={12} /> @lanuevabrasil.pde
                        </a>
                    </div>
                </div>

                {/* Smart Suggestion (AI) */}
                <QuickReorder />

                {/* Loyalty Program */}
                <div className="mb-8 w-full max-w-2xl">
                    <LoyaltyCard />
                </div>


                {/* LNB Pass Banner */}
                <Link href="/subscription" className="mb-8 w-full max-w-2xl block relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-stone-900/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-xl shadow-lg shadow-amber-500/20">
                                <Crown size={20} className="text-stone-900" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-none mb-1">LNB Pass</h3>
                                <p className="text-amber-200/80 text-xs">Café ilimitado desde $15.000/mes</p>
                            </div>
                        </div>
                        <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
                            <ChevronRight className="text-white" size={20} />
                        </div>
                    </div>
                </Link>

                {/* Main Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">


                    <div>
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 drop-shadow-md">
                            <Utensils className="text-amber-500" /> Craving Studios
                        </h2>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:grid md:grid-cols-3 md:mx-0 md:px-0 md:overflow-visible">
                            <Link href="/pizza-studio" className="min-w-[200px] block group">
                                <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg border border-white/10 mb-2">
                                    <Image src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop" alt="Pizza" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <h3 className="font-bold text-white flex items-center gap-1">🍕 Pizza Studio</h3>
                                <p className="text-xs text-amber-200/80">Diseñá tu masa ideal</p>
                            </Link>

                            <Link href="/burger-studio" className="min-w-[200px] block group">
                                <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg border border-white/10 mb-2">
                                    <Image src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop" alt="Burger" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <h3 className="font-bold text-white flex items-center gap-1">🍔 Burger Studio</h3>
                                <p className="text-xs text-amber-200/80">Stack builder premium</p>
                            </Link>

                            <Link href="/empanada-studio" className="min-w-[200px] block group">
                                <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg border border-white/10 mb-2">
                                    <Image src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop" alt="Empanadas" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <h3 className="font-bold text-white flex items-center gap-1">🥟 Empanada Studio</h3>
                                <p className="text-xs text-amber-200/80">Armá tu caja</p>
                            </Link>
                        </div>
                    </div>

                    {/* Cake Studio Card */}
                    <Link href="/studio" className="group">
                        <div className="relative h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop"
                                alt="Cake Studio"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-emerald-600 text-white">
                                        <Cake size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">The Cake Studio</h2>
                                        <p className="text-white/70 text-xs">Diseñá tu torta perfecta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Beach Express Card */}
                    <Link href="/express" className="group">
                        <div className="relative h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <Image
                                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop"
                                alt="Beach Express"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-amber-500 text-white">
                                        <Coffee size={20} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Beach Express</h2>
                                        <p className="text-white/70 text-xs">Pedí y retirá sin filas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Lunch Studio Card (NEW) */}
                    <Link href="/lunch-studio" className="group md:col-span-2">
                        <div className="relative h-40 md:h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/20 transition-all hover:scale-[1.01] hover:shadow-3xl">
                            <Image
                                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=600&fit=crop"
                                alt="Lunch Studio"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Light Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-stone-100/95 via-stone-100/50 to-transparent" />

                            <div className="absolute top-0 bottom-0 left-0 p-5 md:p-8 flex flex-col justify-center max-w-md">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 text-stone-900 shadow-lg">
                                        <Utensils size={24} />
                                    </div>
                                    <h2 className="text-xl md:text-3xl font-bold text-stone-900">Lunch Studio</h2>
                                </div>
                                <p className="text-stone-600 font-medium text-sm md:text-base leading-relaxed">
                                    Catering inteligente. Cotizá tu reunión en segundos.
                                </p>
                            </div>
                        </div>
                    </Link>

                </div>

                {/* Value Props - Simplified */}
                <div className="mt-10 flex justify-center gap-8 text-center">
                    <div>
                        <div className="text-2xl font-bold text-white">15<span className="text-amber-400 text-lg">min</span></div>
                        <p className="text-white/50 text-xs">Retiro</p>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div>
                        <div className="text-2xl font-bold text-white">+50</div>
                        <p className="text-white/50 text-xs">Productos</p>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div>
                        <div className="text-2xl font-bold text-white">0</div>
                        <p className="text-white/50 text-xs">Filas</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-white/40 text-xs">
                    {COMPANY_INFO.shortDescription}
                </div>

                {/* DEMO ONLY: Floating Button to view Live Kitchen */}
                <Link href="/kitchen-live" className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-110 transition-transform hover:bg-stone-800">
                    <Utensils size={20} />
                    <span className="font-bold text-xs">Monitor Cocina</span>
                </Link>

            </div>
        </main>
    );
}
