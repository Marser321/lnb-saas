"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { OrderStatusTracker } from "@/components/order-status-tracker";

export default function KitchenLivePage() {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            {/* Header */}
            <header className="p-4 flex items-center justify-between">
                <Link href="/" className="p-2 bg-white rounded-full text-stone-600 hover:scale-105 transition-transform shadow-sm">
                    <ArrowLeft size={20} />
                </Link>
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src="/logo.png" alt="LNB" fill className="object-cover" />
                </div>
                <div className="w-10" /> {/* Spacer for balance */}
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <OrderStatusTracker />

                <div className="mt-8 text-center max-w-xs mx-auto text-stone-400 text-xs">
                    <p>Por favor mantén esta pantalla abierta. Te notificaremos cuando tu pedido esté listo para retirar en mostrador.</p>
                </div>
            </main>
        </div>
    );
}
