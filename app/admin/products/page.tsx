"use client";

import { useState, useEffect } from "react";
import { CATEGORIES, type Product, type ProductCategory, EXPRESS_MENU } from "@/lib/data";
import { Plus, Search, Edit2, Trash2, Save, X, Image as ImageIcon, Loader2, UploadCloud, Filter, AlertCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner"; // Assuming sonner is installed, otherwise I'll use simple alerts or a custom toast

// Extended Mock Data for "More Products" feeling
const INITIAL_PRODUCTS: Product[] = [
    ...EXPRESS_MENU,
    {
        id: 'new-001',
        name: 'Tarta de Frutillas',
        description: 'Masa sablé con crema pastelera y frutillas frescas',
        price: 320,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop',
        isPopular: true
    },
    {
        id: 'new-002',
        name: 'Smoothie Verde',
        description: 'Espinaca, manzana, piña y jengibre',
        price: 240,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=400&fit=crop',
        tags: ['healthy', 'vegan']
    }
];

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Product>>({});
    const [uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Filter Logic
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState<ProductCategory | 'all'>('all');

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock URL (would be Supabase URL in production)
        const mockUrl = URL.createObjectURL(e.target.files[0]);
        setEditForm(prev => ({ ...prev, image: mockUrl }));
        setUploading(false);
    };

    const handleSave = async () => {
        if (!editForm.name || !editForm.price) {
            alert("Nombre y Precio son obligatorios");
            return;
        }

        const productData: Product = {
            id: isEditing === 'new' ? `prod-${Date.now()}` : isEditing!,
            name: editForm.name!,
            description: editForm.description || '',
            price: Number(editForm.price),
            category: editForm.category || 'bakery',
            image: editForm.image || '',
            isPopular: editForm.isPopular || false,
            // Preserve other fields if editing
            ...((isEditing !== 'new' && products.find(p => p.id === isEditing)) || {}) as any,
            // Override with form data
            ...editForm as any
        };

        if (isEditing === 'new') {
            setProducts([productData, ...products]);
        } else {
            setProducts(products.map(p => p.id === isEditing ? productData : p));
        }

        setIsEditing(null);
    };

    const handleDelete = (id: string) => {
        if (confirm("¿Seguro que deseas eliminar este producto?")) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleAddNew = () => {
        setIsEditing('new');
        setEditForm({ category: 'coffee', name: '', price: 0, description: '', image: '' });
    };

    const handleEdit = (product: Product) => {
        setIsEditing(product.id);
        setEditForm({ ...product });
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center px-1">
                <div>
                    <h2 className="text-3xl font-bold text-stone-800">Inventario</h2>
                    <p className="text-stone-500">Gestiona tus productos y precios</p>
                </div>
                <button onClick={handleAddNew} className="bg-stone-900 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0">
                    <Plus size={20} /> Nuevo Producto
                </button>
            </header>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                {/* Toolbar */}
                <div className="p-6 border-b border-stone-100 flex gap-4">
                    <div className="bg-stone-50 flex items-center gap-2 px-4 py-3 rounded-2xl text-stone-500 flex-1 hover:bg-stone-100 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="bg-transparent outline-none w-full font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-3 border border-stone-200 rounded-2xl text-stone-600 hover:bg-stone-50 outline-none font-bold"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value as any)}
                    >
                        <option value="all">Todas las Categorías</option>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center p-12"><Loader2 className="animate-spin text-emerald-500" /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-stone-50/50 text-stone-400 font-bold uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="px-8 py-5">Producto</th>
                                    <th className="px-6 py-5">Categoría</th>
                                    <th className="px-6 py-5">Precio</th>
                                    <th className="px-6 py-5 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-amber-50/30 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-2xl bg-stone-100 relative overflow-hidden shadow-sm border border-stone-100">
                                                    {product.image ? (
                                                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                                                    ) : <div className="flex items-center justify-center h-full text-stone-300"><ImageIcon size={20} /></div>}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-stone-900 text-lg">{product.name}</div>
                                                    <div className="text-xs text-stone-500 truncate max-w-[200px] font-medium">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-stone-100 rounded-full text-xs font-bold text-stone-600 uppercase tracking-wide border border-stone-200">
                                                {CATEGORIES.find(c => c.id === product.category)?.label || product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-stone-900 text-lg">${product.price}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(product)} className="p-2 bg-white border border-stone-200 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 rounded-xl transition-all shadow-sm"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDelete(product.id)} className="p-2 bg-white border border-stone-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 rounded-xl transition-all shadow-sm"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredProducts.length === 0 && (
                            <div className="p-12 text-center text-stone-400">
                                No se encontraron productos.
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Editor Modal Overlay */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5">
                        <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                            <div>
                                <h3 className="font-bold text-2xl text-stone-800">{isEditing === 'new' ? 'Nuevo Producto' : 'Editar Producto'}</h3>
                                <p className="text-stone-400 text-sm font-medium">Completa los detalles</p>
                            </div>
                            <button onClick={() => setIsEditing(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors"><X size={24} /></button>
                        </div>

                        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">

                            {/* Image Upload Big Area */}
                            <div className="w-full">
                                <label className="text-xs font-bold text-stone-400 uppercase mb-2 block">Foto del Producto</label>
                                <div className="flex gap-6">
                                    <div className="h-32 w-32 bg-stone-100 rounded-2xl border-2 border-stone-100 relative overflow-hidden shrink-0 shadow-inner">
                                        {editForm.image ? (
                                            <Image src={editForm.image} alt="Preview" fill className="object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-stone-300"><ImageIcon size={32} /></div>
                                        )}
                                        {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}
                                    </div>
                                    <label className="flex-1 cursor-pointer border-2 border-dashed border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/10 rounded-2xl flex flex-col items-center justify-center text-stone-400 hover:text-emerald-600 transition-all p-4 group">
                                        <div className="p-3 bg-stone-50 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                            <UploadCloud className="text-stone-400 group-hover:text-emerald-500" />
                                        </div>
                                        <span className="text-sm font-bold">Clic para subir imagen</span>
                                        <span className="text-[10px] opacity-70 mt-1">PNG, JPG hasta 5MB</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-stone-400 uppercase">Nombre</label>
                                    <input
                                        value={editForm.name}
                                        onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl px-4 py-3 font-bold text-stone-800 focus:border-stone-400 focus:bg-white transition-all outline-none"
                                        placeholder="Ej. Café Latte"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-stone-400 uppercase">Precio</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-3.5 text-stone-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            value={editForm.price}
                                            onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                                            className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl pl-8 pr-4 py-3 font-bold text-stone-800 focus:border-stone-400 focus:bg-white transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-stone-400 uppercase">Categoría</label>
                                <select
                                    value={editForm.category}
                                    onChange={e => setEditForm({ ...editForm, category: e.target.value as any })}
                                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl px-4 py-3 font-bold text-stone-600 outline-none focus:border-stone-400 cursor-pointer appearance-none"
                                >
                                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-stone-400 uppercase">Descripción</label>
                                <textarea
                                    value={editForm.description}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl px-4 py-3 text-sm min-h-[100px] outline-none resize-none focus:border-stone-400 focus:bg-white transition-all font-medium text-stone-600"
                                    placeholder="Descripción corta del producto..."
                                />
                            </div>

                        </div>

                        <div className="p-6 bg-stone-50 border-t border-stone-100 flex gap-3 justify-end sticky bottom-0 z-10">
                            <button onClick={() => setIsEditing(null)} className="px-6 py-4 rounded-xl font-bold text-stone-500 hover:bg-stone-200 transition-colors">Cancelar</button>
                            <button onClick={handleSave} className="px-8 py-4 rounded-xl font-bold bg-stone-900 text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2">
                                <Save size={20} /> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
