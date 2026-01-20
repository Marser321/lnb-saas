"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Trash2, ShoppingBag, Plus } from "lucide-react";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useCartStore } from "@/lib/cart-store";
import { EXPRESS_MENU } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPage() {
    const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();
    const { addItem } = useCartStore();

    // Get actual products from favorites
    const favoriteProducts = EXPRESS_MENU.filter(p => favorites.includes(p.id));

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pb-20">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-stone-600 dark:text-stone-400" />
                    </Link>
                    <h1 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                        <Heart size={20} className="text-red-500" fill="currentColor" /> Mis Favoritos
                    </h1>
                    {favorites.length > 0 && (
                        <button
                            onClick={clearFavorites}
                            className="text-xs text-stone-500 hover:text-red-500 transition-colors"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-4">
                {favoriteProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                            <Heart size={32} className="text-stone-300 dark:text-stone-600" />
                        </div>
                        <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-2">No tenés favoritos aún</h2>
                        <p className="text-stone-500 dark:text-stone-400 mb-6">Explorá el menú y guardá tus productos preferidos</p>
                        <Link
                            href="/express"
                            className="inline-flex items-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
                        >
                            <ShoppingBag size={18} /> Ver Menú
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {favoriteProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-4 flex gap-4 shadow-sm"
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden relative shrink-0">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-stone-900 dark:text-white truncate">{product.name}</h3>
                                        <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-1">{product.description}</p>
                                        <p className="text-lg font-bold text-stone-900 dark:text-white mt-1">${product.price}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => addItem(product)}
                                            className="p-2 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-xl hover:opacity-90 transition"
                                        >
                                            <Plus size={18} />
                                        </button>
                                        <button
                                            onClick={() => removeFavorite(product.id)}
                                            className="p-2 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
