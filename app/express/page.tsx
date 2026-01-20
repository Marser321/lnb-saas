"use client";

import { EXPRESS_MENU, CATEGORIES, DAILY_SPECIAL, Product } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Search, ShoppingBag, Plus, ChevronRight, Sparkles, ChefHat, Star, Heart, Package } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductModal } from "@/components/product-modal";
import { useCartStore } from "@/lib/cart-store";
import { BrandLogo } from "@/components/brand-logo";
import { FavoriteButton } from "@/components/favorite-button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function BeachExpress() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>(EXPRESS_MENU);
    const [addedProductId, setAddedProductId] = useState<string | null>(null);

    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const setCartOpen = useCartStore((state) => state.setCartOpen);

    useEffect(() => {
        const fetchRealProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data && data.length > 0) {
                const realProducts: Product[] = data.map((d: any) => ({
                    id: d.id,
                    name: d.name,
                    description: d.description,
                    price: Number(d.price),
                    category: d.category,
                    image: d.image_url || 'https://placehold.co/400x300/e2e8f0/475569?text=Sin+Imagen',
                    isPopular: d.is_popular,
                    tags: d.tags || []
                }));
                setProducts(realProducts);
            }
        };
        fetchRealProducts();
    }, []);

    // Diet filter options
    const DIET_FILTERS = [
        { id: 'vegan', label: 'Vegano', icon: '🌱' },
        { id: 'gluten-free', label: 'Sin Gluten', icon: '🌾' },
        { id: 'lactose-free', label: 'Sin Lactosa', icon: '🥛' },
    ];

    const [activeDietFilters, setActiveDietFilters] = useState<string[]>([]);

    const toggleDietFilter = (filterId: string) => {
        setActiveDietFilters(prev =>
            prev.includes(filterId)
                ? prev.filter(f => f !== filterId)
                : [...prev, filterId]
        );
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === "all" || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDiet = activeDietFilters.length === 0 ||
            activeDietFilters.every(filter => p.tags?.includes(filter));
        return matchesCategory && matchesSearch && matchesDiet;
    });

    const suggestions = products.filter(p => p.isPopular).slice(0, 3);

    const handleAddToCart = (product: Product, quantity = 1) => {
        addItem(product, quantity);
        setAddedProductId(product.id);
        setTimeout(() => setAddedProductId(null), 1000);
    };

    const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
        e.stopPropagation();
        handleAddToCart(product, 1);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const cartItemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

    return (
        <div className="min-h-screen bg-stone-50 pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.href = '/'}>
                        <div className="scale-90 origin-left">
                            <BrandLogo variant="color" />
                        </div>
                        <div>
                            <h1 className="font-bold text-stone-900 text-lg leading-none">LNB Express</h1>
                            <p className="text-xs text-stone-500 font-medium">Punta del Este</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">

                        <ThemeToggle />
                        <Link href="/favorites" className="p-2.5 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-all">
                            <Heart size={20} className="text-stone-600 dark:text-stone-400" />
                        </Link>
                        <Link href="/orders" className="p-2.5 bg-stone-100 dark:bg-stone-800 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-all">
                            <Package size={20} className="text-stone-600 dark:text-stone-400" />
                        </Link>
                        <div
                            onClick={() => setCartOpen(true)}
                            className="relative p-2.5 bg-stone-100 dark:bg-stone-800 rounded-full cursor-pointer hover:bg-stone-900 dark:hover:bg-white hover:text-white dark:hover:text-stone-900 transition-all group"
                        >
                            <ShoppingBag size={20} />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white group-hover:border-stone-900">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="border-t border-stone-100/50 bg-white/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 overflow-x-auto py-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <div className="flex gap-2 w-max mx-auto md:mx-0">
                            <button
                                onClick={() => setActiveCategory("all")}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                                    activeCategory === "all" ? "bg-stone-900 text-white shadow-md scale-105" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400 hover:text-stone-900"
                                )}
                            >
                                Todo
                            </button>
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-bold transition-all gap-2 flex items-center whitespace-nowrap",
                                        activeCategory === cat.id ? "bg-stone-900 text-white shadow-md scale-105" : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400 hover:text-stone-900"
                                    )}
                                >
                                    <span>{cat.icon}</span> {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Search Bar & Diet Filters */}
                <div className="border-t border-stone-100/50 bg-stone-50/80 backdrop-blur-sm py-3">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col sm:flex-row gap-3 items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            {/* Diet Filters */}
                            <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
                                {DIET_FILTERS.map(filter => (
                                    <button
                                        key={filter.id}
                                        onClick={() => toggleDietFilter(filter.id)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border",
                                            activeDietFilters.includes(filter.id)
                                                ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                                                : "bg-white text-stone-600 border-stone-200 hover:border-emerald-400 hover:text-emerald-600"
                                        )}
                                    >
                                        <span>{filter.icon}</span>
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active filters summary */}
                        {(searchQuery || activeDietFilters.length > 0) && (
                            <div className="mt-2 flex items-center gap-2 text-xs text-stone-500">
                                <span>Mostrando {filteredProducts.length} productos</span>
                                {(searchQuery || activeDietFilters.length > 0) && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setActiveDietFilters([]);
                                        }}
                                        className="text-amber-600 hover:text-amber-700 font-medium"
                                    >
                                        Limpiar filtros
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

                {/* Left Column: Content */}
                <div className="space-y-8">

                    {/* Hero Banner (Desktop Only) */}
                    <div className="hidden md:block relative h-64 rounded-3xl overflow-hidden shadow-2xl group">
                        <Image src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop" alt="Coffee Banner" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                            <div className="bg-amber-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit mb-4">Temporada 2026</div>
                            <h2 className="text-4xl font-bold mb-2">Despertate con LNB</h2>
                            <p className="text-stone-200 max-w-md">El mejor café de especialidad de Punta del Este, ahora en la puerta de tu casa.</p>
                        </div>
                    </div>

                    {/* Daily Promo (Mobile & Desktop) */}
                    <AnimatePresence>
                        {activeCategory === "all" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div
                                    className="relative rounded-3xl overflow-hidden shadow-xl aspect-[2/1] md:aspect-[3/1] group cursor-pointer border border-stone-100"
                                    onClick={() => {
                                        const promoProducts = DAILY_SPECIAL.items
                                            .map(id => EXPRESS_MENU.find(p => p.id === id))
                                            .filter(Boolean) as Product[];
                                        promoProducts.forEach(p => handleAddToCart(p, 1));
                                    }}
                                >
                                    <Image src={DAILY_SPECIAL.image} alt={DAILY_SPECIAL.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex justify-between items-end">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="bg-amber-500 text-xs font-bold px-2 py-1 rounded text-stone-900 uppercase">
                                                    OFERTA DEL DÍA
                                                </div>
                                                <div className="bg-stone-900/50 backdrop-blur-md text-xs font-bold px-2 py-1 rounded border border-white/20">
                                                    Hasta las {DAILY_SPECIAL.validUntil}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold mb-1">{DAILY_SPECIAL.title}</h3>
                                            <p className="text-stone-300 text-sm md:text-base">{DAILY_SPECIAL.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-baseline gap-2 justify-end">
                                                <span className="text-3xl font-bold text-amber-400">${DAILY_SPECIAL.promoPrice}</span>
                                                <span className="text-sm text-stone-400 line-through Decoration-2">${DAILY_SPECIAL.originalPrice}</span>
                                            </div>
                                            <button className="mt-2 text-xs bg-white text-stone-900 px-3 py-1.5 rounded-full font-bold hover:bg-stone-200 transition-colors">
                                                Agregar Combo +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Product Grid */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                                {activeCategory === 'all' ? 'Menú Completo' : CATEGORIES.find(c => c.id === activeCategory)?.label}
                                <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2 py-1 rounded-full">{filteredProducts.length}</span>
                            </h2>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {filteredProducts.map(product => {
                                const isOutOfStock = product.stock === 0;
                                const isLowStock = product.stock !== undefined && product.stock > 0 && product.stock <= 5;

                                return (
                                    <motion.div
                                        key={product.id}
                                        variants={itemVariants}
                                        onClick={() => !isOutOfStock && setSelectedProduct(product)}
                                        className={cn(
                                            "bg-white rounded-[1.5rem] p-4 shadow-sm border border-stone-100 relative group cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 overflow-hidden",
                                            addedProductId === product.id && "ring-2 ring-emerald-500 ring-offset-2",
                                            isOutOfStock && "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-sm"
                                        )}
                                    >
                                        <div className="flex sm:flex-col gap-4 h-full">
                                            {/* Image */}
                                            <div className="h-28 w-28 sm:w-full sm:h-48 rounded-2xl relative shadow-inner shrink-0 overflow-hidden">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className={cn(
                                                        "object-cover transition-transform duration-500 group-hover:scale-110",
                                                        isOutOfStock && "grayscale"
                                                    )}
                                                />
                                                {/* Out of Stock Overlay */}
                                                {isOutOfStock && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                            AGOTADO
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Tags */}
                                                <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                                                    {product.isPopular && !isOutOfStock && (
                                                        <div className="bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                                                            <Sparkles size={10} /> TOP
                                                        </div>
                                                    )}
                                                    {isLowStock && (
                                                        <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                                                            ¡Últimas {product.stock}!
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Favorite Button */}
                                                <div className="absolute top-2 right-2">
                                                    <FavoriteButton productId={product.id} size="sm" className="shadow-md" />
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col">
                                                <h3 className={cn(
                                                    "font-bold text-lg leading-tight mb-1",
                                                    isOutOfStock ? "text-stone-400" : "text-stone-900"
                                                )}>{product.name}</h3>
                                                <p className="text-stone-400 text-xs line-clamp-2 mb-3 flex-1">{product.description}</p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className={cn(
                                                        "font-bold text-xl",
                                                        isOutOfStock ? "text-stone-400" : "text-stone-900"
                                                    )}>${product.price}</div>
                                                    <button
                                                        onClick={(e) => !isOutOfStock && handleQuickAdd(e, product)}
                                                        disabled={isOutOfStock}
                                                        className={cn(
                                                            "h-9 w-9 rounded-full flex items-center justify-center transition-all shadow-sm",
                                                            isOutOfStock
                                                                ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                                                                : addedProductId === product.id
                                                                    ? "bg-emerald-500 text-white scale-110"
                                                                    : "bg-stone-100 text-stone-900 hover:bg-stone-900 hover:text-white"
                                                        )}
                                                    >
                                                        <Plus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: Sidebar (Desktop Only) */}
                <div className="hidden lg:flex flex-col gap-6 h-fit sticky top-24">
                    {/* Chef's Suggestions */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
                        <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                            <ChefHat size={20} className="text-amber-500" /> Sugerencias
                        </h3>
                        <div className="space-y-4">
                            {suggestions.map((product, idx) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-3 group cursor-pointer hover:bg-stone-50 p-2 rounded-xl transition-colors -mx-2"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="w-16 h-16 rounded-xl relative overflow-hidden shrink-0">
                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-amber-600 font-bold mb-0.5">#{idx + 1} Más Pedido</p>
                                        <h4 className="font-bold text-stone-900 text-sm truncate">{product.name}</h4>
                                        <p className="text-stone-400 text-xs">${product.price}</p>
                                    </div>
                                    <button
                                        onClick={(e) => handleQuickAdd(e, product)}
                                        className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50 transition-colors">
                            Ver Todos los Favoritos
                        </button>
                    </div>

                    {/* Mini Banner */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                        <Star size={24} className="text-yellow-400 mb-4 fill-yellow-400" />
                        <h3 className="font-bold text-lg mb-2">Unite al Club LNB</h3>
                        <p className="text-indigo-100 text-xs mb-4">Sumá puntos con cada café y canjealos por premios.</p>
                        <button onClick={() => window.location.href = '/crumb-club'} className="bg-white text-indigo-700 w-full py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
                            Ver Beneficios
                        </button>
                    </div>
                </div>
            </main>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
            />

            {/* Mobile Footer Cart Floating Button */}
            <AnimatePresence>
                {cartItemCount > 0 && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-6 left-4 right-4 md:hidden z-40"
                    >
                        <div
                            onClick={() => setCartOpen(true)}
                            className="bg-stone-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between cursor-pointer hover:bg-stone-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                                    {cartItemCount}
                                </div>
                                <span className="font-medium text-sm">Ver mi pedido</span>
                            </div>
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <span className="text-stone-300 font-normal">Total:</span> $ {items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)}
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
