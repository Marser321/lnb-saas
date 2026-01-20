"use client";

import { CheckCircle2, Download, Printer } from "lucide-react";

interface InvoiceReceiptProps {
    orderId: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    customerName: string;
    onClose: () => void;
}

export function InvoiceReceipt({ orderId, items, total, customerName, onClose }: InvoiceReceiptProps) {
    const today = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    return (
        <div className="bg-white p-6 rounded-3xl shadow-xl max-w-sm mx-auto border border-stone-100 relative overflow-hidden">
            {/* Receipt Zigzag Top */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-stone-900 flex">
                {/* Visual decoration only */}
            </div>

            <div className="text-center mb-6 pt-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 animate-bounce">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-stone-900">¡Pedido Enviado!</h2>
                <p className="text-stone-500 text-sm">Pronto nos pondremos en contacto.</p>
            </div>

            {/* Receipt Paper */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 font-mono text-sm shadow-inner mb-6">
                <div className="flex justify-between items-center border-b border-stone-200 pb-2 mb-2">
                    <span className="font-bold text-stone-900">LA NUEVA BRASIL</span>
                    <span className="text-stone-400">#{orderId.slice(0, 6)}</span>
                </div>
                <div className="space-y-1 mb-2 text-stone-500 text-xs">
                    <div className="flex justify-between">
                        <span>Cliente:</span>
                        <span className="text-stone-800 font-bold">{customerName || 'Consumidor Final'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Fecha:</span>
                        <span>{today} {time}</span>
                    </div>
                </div>

                <div className="border-t border-dashed border-stone-300 my-2 pt-2 space-y-2">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-bold">${item.price * item.quantity}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-stone-900 pt-2 mt-4 flex justify-between items-center text-lg font-bold text-stone-900">
                    <span>TOTAL</span>
                    <span>${total}</span>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onClose}
                    className="flex-1 bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-stone-800 transition-colors"
                >
                    Aceptar
                </button>
                <button className="p-3 bg-stone-100 rounded-xl text-stone-600 hover:bg-stone-200 transition-colors">
                    <Download size={20} />
                </button>
            </div>
        </div>
    );
}
