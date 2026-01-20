"use client";

import { useState } from "react";
import { Plus, Upload, Wand2, Trash2, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock Ingredient Data
const initialIngredients = [
    { id: 1, name: "Vainilla Sponge", type: "Base", image: "/textures/texture_vanilla_sponge_1768692201503.png" },
    { id: 2, name: "Chocolate Sponge", type: "Base", image: "/textures/texture_chocolate_sponge_1768692215127.png" },
    { id: 3, name: "Red Velvet", type: "Base", image: "/textures/texture_red_velvet_sponge_1768692228599.png" },
    { id: 4, name: "Dulce de Leche", type: "Filling", image: "/textures/texture_dulce_de_leche_1768692255414.png" },
];

export default function AdminIngredientsPage() {
    const [ingredients, setIngredients] = useState(initialIngredients);
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState("");

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);

        // Mock AI Generation Delay
        setTimeout(() => {
            const newIngredient = {
                id: Date.now(),
                name: prompt,
                type: "Generado",
                image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop" // Mock result
            };
            setIngredients([newIngredient, ...ingredients]);
            setIsGenerating(false);
            setPrompt("");
            alert(`🍌 Nano Banana generó una textura para "${newIngredient.name}"!`);
        }, 3000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Ingredientes & Texturas</h2>
                    <p className="text-stone-500">Gestioná los assets visuales del Cake Studio.</p>
                </div>
                <button className="bg-stone-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-black transition-colors">
                    <Plus size={16} /> Subir Manual
                </button>
            </div>

            {/* AI GENERATOR PANEL */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-amber-600 font-bold uppercase text-xs tracking-widest">
                        <Wand2 size={16} /> Generador AI
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">Nano Banana 🍌</h3>
                    <p className="text-stone-600">
                        ¿No tenés foto del ingrediente? Describilo y nuestra inteligencia artificial generará una textura realista en segundos.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ej: Mousse de limón brillante..."
                            className="flex-1 bg-white border-none rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-amber-400 outline-none"
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className="bg-amber-500 text-stone-900 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                            {isGenerating ? "Cocinando..." : "Generar"}
                        </button>
                    </div>
                </div>
                {/* Visual Flair */}
                <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                    <div className="absolute inset-0 bg-amber-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                    <div className="relative z-10 w-full h-full bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl border-4 border-white transform rotate-3">
                        🍌
                    </div>
                </div>
            </div>

            {/* INGREDIENTS GRID */}
            <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {ingredients.map((ing) => (
                        <div key={ing.id} className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-all border border-stone-100">
                            <Image
                                src={ing.image}
                                alt={ing.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <p className="text-white font-bold text-sm truncate">{ing.name}</p>
                                <p className="text-white/60 text-xs">{ing.type}</p>
                            </div>
                            <button className="absolute top-2 right-2 bg-white/20 hover:bg-red-500 text-white p-1.5 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}

                    {/* Add Placeholder */}
                    <div className="border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400 gap-2 hover:bg-stone-50 hover:border-stone-300 transition-colors cursor-pointer aspect-square">
                        <Plus size={24} />
                        <span className="text-xs font-bold">Nuevo</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
