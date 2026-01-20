"use client";

import { Product } from "@/lib/data";
import { X, Flame, Scale, Wheat, Info, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setQuantity(1);
        onClose();
    };

    // Calculate dynamic color based on category (simplified, could be more complex extraction)
    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'coffee': return 'bg-amber-600';
            case 'bakery': return 'bg-orange-500';
            case 'lunch': return 'bg-emerald-600';
            case 'desserts': return 'bg-rose-500';
            case 'drinks': return 'bg-purple-500';
            default: return 'bg-stone-800';
        }
    };

    const accentColor = getCategoryColor(product.category);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-stone-50 rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
                        >
                            <div className="relative h-64 w-full shrink-0">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent"></div>

                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="absolute bottom-4 left-6 right-6">
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 ${accentColor}`}>
                                        {product.category.toUpperCase()}
                                    </div>
                                    <h2 className="text-3xl font-bold text-white leading-tight">{product.name}</h2>
                                    <p className="text-white/80 text-sm line-clamp-2 mt-1">{product.description}</p>
                                </div>
                            </div>

                            <div className="p-6 space-y-6 overflow-y-auto scrollbar-hide flex-1">
                                {/* Nutritional Info Cards */}
                                {product.nutritionalInfo && (
                                    <div className="grid grid-cols-4 gap-2">
                                        <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-stone-100">
                                            <Flame className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                                            <div className="text-xs text-stone-400 font-medium">Calorías</div>
                                            <div className="font-bold text-stone-800">{product.nutritionalInfo.calories}</div>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-stone-100">
                                            <Scale className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                                            <div className="text-xs text-stone-400 font-medium">Proteína</div>
                                            <div className="font-bold text-stone-800">{product.nutritionalInfo.protein}</div>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-stone-100">
                                            <Wheat className="w-5 h-5 mx-auto text-yellow-500 mb-1" />
                                            <div className="text-xs text-stone-400 font-medium">Carbos</div>
                                            <div className="font-bold text-stone-800">{product.nutritionalInfo.carbs}</div>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-stone-100">
                                            <Info className="w-5 h-5 mx-auto text-rose-500 mb-1" />
                                            <div className="text-xs text-stone-400 font-medium">Grasas</div>
                                            <div className="font-bold text-stone-800">{product.nutritionalInfo.fat}</div>
                                        </div>
                                    </div>
                                )}

                                {/* Allergens Info */}
                                {product.allergens && product.allergens.length > 0 && (
                                    <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-3">
                                        <Info className="text-rose-500 shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <h4 className="font-bold text-rose-700 text-sm">Contiene Alérgenos</h4>
                                            <p className="text-xs text-rose-600 mt-1">
                                                Este producto contiene: <span className="font-semibold">{product.allergens.join(", ")}</span>.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Ingredients */}
                                {product.ingredients && (
                                    <div>
                                        <h3 className="font-bold text-stone-800 mb-3 text-lg flex items-center gap-2">
                                            <Wheat size={18} className="text-stone-400" /> Ingredientes
                                        </h3>
                                        <ul className="space-y-2">
                                            {product.ingredients.map((ing, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-stone-600 bg-white p-3 rounded-xl border border-stone-100">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${accentColor}`}></div>
                                                    {ing}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 bg-white border-t border-stone-100 flex items-center gap-4 shrink-0">
                                <div className="flex items-center gap-3 bg-stone-100 px-4 py-3 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-stone-600 hover:text-stone-900 disabled:opacity-50"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-stone-600 hover:text-stone-900"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 ${accentColor} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95`}
                                >
                                    <ShoppingCart size={20} />
                                    <span>Agregar ${product.price * quantity}</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
