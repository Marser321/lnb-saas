"use client";

import { useCartStore, CartItem } from "@/lib/cart-store";
import { X, Plus, Minus, ShoppingBag, Tag, ArrowRight, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

function CartItemCard({ item }: { item: CartItem }) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-stone-100 group"
        >
            {/* Image */}
            <div className="h-16 w-16 bg-stone-100 rounded-xl relative overflow-hidden shrink-0 shadow-sm">
                <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-stone-800 text-sm truncate">{item.product.name}</h4>
                <p className="text-emerald-600 font-bold text-sm">
                    ${item.product.price * item.quantity}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-stone-100 rounded-full px-2 py-1">
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-red-500 transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-emerald-600 transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>
                <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </motion.div>
    );
}

export function CartDrawer() {
    const {
        items,
        isCartOpen,
        setCartOpen,
        discountCode,
        getSubtotal,
        getDiscount,
        getTotal,
        getPointsToEarn,
        applyDiscountCode,
        removeDiscountCode,
        clearCart,
    } = useCartStore();

    const [discountInput, setDiscountInput] = useState("");
    const [discountMessage, setDiscountMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleApplyDiscount = async () => {
        if (!discountInput.trim()) return;

        setIsApplying(true);
        const result = await applyDiscountCode(discountInput);
        setDiscountMessage({
            type: result.success ? 'success' : 'error',
            text: result.message,
        });
        setIsApplying(false);

        if (result.success) {
            setDiscountInput("");
        }

        setTimeout(() => setDiscountMessage(null), 3000);
    };

    if (!mounted) return null;

    const subtotal = getSubtotal();
    const discount = getDiscount();
    const total = getTotal();
    const pointsToEarn = getPointsToEarn();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-stone-50 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 bg-white border-b border-stone-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-stone-100 rounded-xl">
                                    <ShoppingBag size={20} className="text-stone-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-stone-900">Tu Carrito</h2>
                                    <p className="text-xs text-stone-500">
                                        {items.length} {items.length === 1 ? 'producto' : 'productos'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                            >
                                <X size={24} className="text-stone-500" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                    <div className="p-4 bg-stone-100 rounded-full mb-4">
                                        <ShoppingBag size={48} className="text-stone-300" />
                                    </div>
                                    <p className="text-stone-500 font-medium">Tu carrito está vacío</p>
                                    <p className="text-stone-400 text-sm mt-1">¡Explorá nuestro menú!</p>
                                    <Link
                                        href="/express"
                                        onClick={() => setCartOpen(false)}
                                        className="mt-4 px-6 py-2 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors"
                                    >
                                        Ver Menú
                                    </Link>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <CartItemCard key={item.id} item={item} />
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white border-t border-stone-100 space-y-4">
                                {/* Discount Code */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase flex items-center gap-1">
                                        <Tag size={12} /> Código de Descuento
                                    </label>
                                    {discountCode ? (
                                        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
                                            <span className="text-emerald-700 font-bold text-sm">
                                                {discountCode.code} (-{discountCode.type === 'percentage' ? `${discountCode.value}%` : `$${discountCode.value}`})
                                            </span>
                                            <button
                                                onClick={removeDiscountCode}
                                                className="text-emerald-600 hover:text-red-500 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={discountInput}
                                                onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                                                placeholder="Ej: BIENVENIDO10"
                                                className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-stone-900"
                                            />
                                            <button
                                                onClick={handleApplyDiscount}
                                                disabled={isApplying || !discountInput.trim()}
                                                className="px-4 py-2 bg-stone-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors disabled:opacity-50"
                                            >
                                                {isApplying ? '...' : 'Aplicar'}
                                            </button>
                                        </div>
                                    )}
                                    {discountMessage && (
                                        <p className={`text-xs font-medium ${discountMessage.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                                            {discountMessage.text}
                                        </p>
                                    )}
                                </div>

                                {/* Summary */}
                                <div className="space-y-2 pt-2 border-t border-stone-100">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-500">Subtotal</span>
                                        <span className="text-stone-700">${subtotal}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-emerald-600">Descuento</span>
                                            <span className="text-emerald-600 font-medium">-${discount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-end pt-2 border-t border-stone-100">
                                        <span className="text-stone-700 font-medium">Total</span>
                                        <span className="text-2xl font-bold text-stone-900">${total}</span>
                                    </div>
                                </div>

                                {/* Crumb Club Points */}
                                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
                                    <Sparkles size={18} className="text-amber-600" />
                                    <div>
                                        <p className="text-xs text-amber-800 font-medium">
                                            Ganás <span className="font-bold">{pointsToEarn} puntos</span> Crumb Club
                                        </p>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link
                                    href="/checkout"
                                    onClick={() => setCartOpen(false)}
                                    className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
                                >
                                    Finalizar Compra
                                    <ArrowRight size={20} />
                                </Link>

                                {/* Clear Cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full text-center text-sm text-stone-400 hover:text-red-500 transition-colors py-2"
                                >
                                    Vaciar carrito
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
