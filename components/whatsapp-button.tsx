"use client";

import { MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "59899123456"; // TODO: Replace with real number

export function WhatsAppButton() {
    const { items, getTotal } = useCartStore();

    const generateMessage = () => {
        if (items.length === 0) {
            return "¡Hola! Quiero hacer un pedido en La Nueva Brasil 🥐";
        }

        let message = "¡Hola! Quiero hacer un pedido:\n\n";

        items.forEach(item => {
            message += `• ${item.quantity}x ${item.product.name} - $${item.product.price * item.quantity}\n`;
        });

        message += `\n💰 *Total: $${getTotal()}*`;
        message += "\n\n¿Pueden confirmarlo? 🙏";

        return encodeURIComponent(message);
    };

    const handleClick = () => {
        const message = generateMessage();
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <motion.button
            onClick={handleClick}
            className="fixed bottom-24 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-110 active:scale-95"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            aria-label="Pedir por WhatsApp"
        >
            <MessageCircle size={28} fill="white" />

            {/* Pulse Effect */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

            {/* Cart Badge */}
            <AnimatePresence>
                {items.length > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
                    >
                        {items.length}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
