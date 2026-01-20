"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, CreditCard, User, MapPin, Phone, Mail, Truck, Store, Check } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useOrdersStore } from "@/lib/orders-store";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DeliveryMethod = 'pickup' | 'delivery';

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore();
    const { addOrder } = useOrdersStore();

    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('pickup');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState('');

    const total = getTotal();
    const deliveryFee = deliveryMethod === 'delivery' ? 80 : 0;
    const finalTotal = total + deliveryFee;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) return;

        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create order
        const newOrderId = addOrder({
            items: items.map(i => ({ product: i.product, quantity: i.quantity })),
            total: finalTotal,
            status: 'pending',
            customerName: formData.name,
            customerPhone: formData.phone,
            notes: formData.notes
        });

        setOrderId(newOrderId);
        setOrderComplete(true);
        clearCart();
        setIsProcessing(false);
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-stone-800 rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={40} className="text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">¡Pedido Confirmado!</h1>
                    <p className="text-stone-500 dark:text-stone-400 mb-4">Tu pedido ha sido recibido</p>
                    <p className="text-sm font-mono bg-stone-100 dark:bg-stone-700 px-4 py-2 rounded-lg inline-block mb-6">{orderId}</p>
                    <div className="space-y-3">
                        <Link
                            href="/orders"
                            className="block w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-3 rounded-xl font-bold hover:opacity-90 transition"
                        >
                            Ver Mis Pedidos
                        </Link>
                        <Link
                            href="/"
                            className="block w-full bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 py-3 rounded-xl font-bold hover:bg-stone-200 dark:hover:bg-stone-600 transition"
                        >
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 pb-32">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/express" className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-stone-600 dark:text-stone-400" />
                    </Link>
                    <h1 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                        <CreditCard size={20} /> Checkout
                    </h1>
                    <div className="w-10" />
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-4 space-y-6">
                {/* Order Summary */}
                <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-4 shadow-sm">
                    <h2 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <ShoppingBag size={18} /> Tu Pedido ({items.length})
                    </h2>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0">
                                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-stone-900 dark:text-white truncate">{item.product.name}</p>
                                    <p className="text-xs text-stone-500">{item.quantity} x ${item.product.price}</p>
                                </div>
                                <p className="font-bold text-stone-900 dark:text-white">${item.product.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Method */}
                <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-4 shadow-sm">
                    <h2 className="font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
                        <Truck size={18} /> Método de Entrega
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setDeliveryMethod('pickup')}
                            className={cn(
                                "p-4 rounded-xl border-2 transition-all text-left",
                                deliveryMethod === 'pickup'
                                    ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                                    : "border-stone-200 dark:border-stone-600 hover:border-stone-300"
                            )}
                        >
                            <Store size={24} className={deliveryMethod === 'pickup' ? "text-amber-500" : "text-stone-400"} />
                            <p className="font-bold text-stone-900 dark:text-white mt-2">Retiro en Local</p>
                            <p className="text-xs text-stone-500">Gratis</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => setDeliveryMethod('delivery')}
                            className={cn(
                                "p-4 rounded-xl border-2 transition-all text-left",
                                deliveryMethod === 'delivery'
                                    ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                                    : "border-stone-200 dark:border-stone-600 hover:border-stone-300"
                            )}
                        >
                            <Truck size={24} className={deliveryMethod === 'delivery' ? "text-amber-500" : "text-stone-400"} />
                            <p className="font-bold text-stone-900 dark:text-white mt-2">Delivery</p>
                            <p className="text-xs text-stone-500">+$80</p>
                        </button>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 p-4 shadow-sm space-y-4">
                    <h2 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                        <User size={18} /> Tus Datos
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Nombre</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Teléfono</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                                placeholder="099 123 456"
                            />
                        </div>
                        {deliveryMethod === 'delivery' && (
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Dirección</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                    className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400"
                                    placeholder="Calle, número, apto..."
                                />
                            </div>
                        )}
                        <div>
                            <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">Notas (opcional)</label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                                className="w-full bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-xl px-4 py-3 text-stone-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-400 min-h-[80px]"
                                placeholder="Instrucciones especiales..."
                            />
                        </div>
                    </div>
                </form>
            </main>

            {/* Fixed Footer */}
            <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-200 dark:border-stone-700 p-4 pb-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between mb-2 text-sm">
                        <span className="text-stone-500">Subtotal</span>
                        <span className="text-stone-900 dark:text-white">${total}</span>
                    </div>
                    {deliveryMethod === 'delivery' && (
                        <div className="flex justify-between mb-2 text-sm">
                            <span className="text-stone-500">Delivery</span>
                            <span className="text-stone-900 dark:text-white">${deliveryFee}</span>
                        </div>
                    )}
                    <div className="flex justify-between mb-4">
                        <span className="font-bold text-stone-900 dark:text-white">Total</span>
                        <span className="text-2xl font-bold text-stone-900 dark:text-white">${finalTotal}</span>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isProcessing || items.length === 0}
                        className="w-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                <CreditCard size={20} /> Confirmar Pedido
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
