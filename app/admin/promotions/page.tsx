"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Save,
    Percent,
    DollarSign,
    Calendar,
    Tag,
    ToggleLeft,
    ToggleRight,
    Image as ImageIcon,
    Loader2,
    Eye,
    Clock,
    TrendingUp,
    Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

interface Promotion {
    id: string;
    name: string;
    description: string;
    type: 'percentage' | 'fixed' | 'combo' | 'bogo';
    discountValue: number;
    comboPrice?: number;
    productIds: string[];
    minPurchase: number;
    validDays: number[];
    startDate: string;
    endDate: string;
    imageUrl: string;
    isActive: boolean;
    usageCount: number;
    createdAt: string;
}

// ============================================
// MOCK DATA
// ============================================

const MOCK_PROMOTIONS: Promotion[] = [
    {
        id: '1',
        name: 'Combo Desayuno',
        description: 'Cappuccino + 3 Medialunas',
        type: 'combo',
        discountValue: 0,
        comboPrice: 299,
        productIds: ['cap-001', 'med-001'],
        minPurchase: 0,
        validDays: [0, 1, 2, 3, 4, 5, 6],
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop',
        isActive: true,
        usageCount: 145,
        createdAt: '2024-01-15',
    },
    {
        id: '2',
        name: 'Verano 20%',
        description: '20% OFF en toda la panadería',
        type: 'percentage',
        discountValue: 20,
        productIds: [],
        minPurchase: 500,
        validDays: [1, 2, 3, 4, 5],
        startDate: '2024-01-01',
        endDate: '2024-03-31',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=200&fit=crop',
        isActive: true,
        usageCount: 89,
        createdAt: '2024-01-20',
    },
    {
        id: '3',
        name: 'Happy Hour Café',
        description: '2x1 en cafés de 15 a 18hs',
        type: 'bogo',
        discountValue: 0,
        productIds: ['esp-001', 'lat-001', 'cap-001', 'ame-001'],
        minPurchase: 0,
        validDays: [1, 2, 3, 4, 5],
        startDate: '2024-01-01',
        endDate: '2024-06-30',
        imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=200&fit=crop',
        isActive: false,
        usageCount: 234,
        createdAt: '2024-02-01',
    },
];

const PROMO_TYPES = [
    { id: 'percentage', label: 'Descuento %', icon: Percent },
    { id: 'fixed', label: 'Descuento $', icon: DollarSign },
    { id: 'combo', label: 'Combo', icon: Tag },
    { id: 'bogo', label: '2x1', icon: Zap },
];

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// ============================================
// COMPONENT
// ============================================

export default function AdminPromotionsPage() {
    const [promotions, setPromotions] = useState<Promotion[]>(MOCK_PROMOTIONS);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Promotion>>({});
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'expired'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPromotions = promotions.filter(promo => {
        const matchesSearch = promo.name.toLowerCase().includes(searchQuery.toLowerCase());
        const now = new Date();
        const endDate = new Date(promo.endDate);
        const isExpired = endDate < now;

        switch (filter) {
            case 'active': return matchesSearch && promo.isActive && !isExpired;
            case 'inactive': return matchesSearch && !promo.isActive;
            case 'expired': return matchesSearch && isExpired;
            default: return matchesSearch;
        }
    });

    const handleAddNew = () => {
        setIsEditing('new');
        setEditForm({
            name: '',
            description: '',
            type: 'percentage',
            discountValue: 10,
            minPurchase: 0,
            validDays: [0, 1, 2, 3, 4, 5, 6],
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            imageUrl: '',
            isActive: true,
            productIds: [],
        });
    };

    const handleEdit = (promo: Promotion) => {
        setIsEditing(promo.id);
        setEditForm(promo);
    };

    const handleSave = () => {
        if (!editForm.name) {
            alert('El nombre es obligatorio');
            return;
        }

        if (isEditing === 'new') {
            const newPromo: Promotion = {
                id: Date.now().toString(),
                name: editForm.name || '',
                description: editForm.description || '',
                type: editForm.type as any || 'percentage',
                discountValue: editForm.discountValue || 0,
                comboPrice: editForm.comboPrice,
                productIds: editForm.productIds || [],
                minPurchase: editForm.minPurchase || 0,
                validDays: editForm.validDays || [0, 1, 2, 3, 4, 5, 6],
                startDate: editForm.startDate || '',
                endDate: editForm.endDate || '',
                imageUrl: editForm.imageUrl || '',
                isActive: editForm.isActive ?? true,
                usageCount: 0,
                createdAt: new Date().toISOString(),
            };
            setPromotions([newPromo, ...promotions]);
        } else {
            setPromotions(promotions.map(p =>
                p.id === isEditing ? { ...p, ...editForm } as Promotion : p
            ));
        }
        setIsEditing(null);
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Eliminar esta promoción?')) {
            setPromotions(promotions.filter(p => p.id !== id));
        }
    };

    const handleToggleActive = (id: string) => {
        setPromotions(promotions.map(p =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
    };

    const getTypeInfo = (type: string) => {
        return PROMO_TYPES.find(t => t.id === type) || PROMO_TYPES[0];
    };

    const getPromoStatus = (promo: Promotion) => {
        const now = new Date();
        const endDate = new Date(promo.endDate);
        const startDate = new Date(promo.startDate);

        if (endDate < now) return { label: 'Expirada', color: 'bg-red-100 text-red-700' };
        if (startDate > now) return { label: 'Programada', color: 'bg-blue-100 text-blue-700' };
        if (!promo.isActive) return { label: 'Inactiva', color: 'bg-stone-100 text-stone-600' };
        return { label: 'Activa', color: 'bg-emerald-100 text-emerald-700' };
    };

    return (
        <>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-stone-800">Promociones</h2>
                    <p className="text-stone-500">Gestiona ofertas y descuentos</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-stone-900 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-black transition-all shadow-xl hover:-translate-y-1"
                >
                    <Plus size={20} /> Nueva Promoción
                </button>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Activas', value: promotions.filter(p => p.isActive).length, color: 'text-emerald-600' },
                    { label: 'Total Usos', value: promotions.reduce((sum, p) => sum + p.usageCount, 0), color: 'text-blue-600' },
                    { label: 'Expiradas', value: promotions.filter(p => new Date(p.endDate) < new Date()).length, color: 'text-red-600' },
                    { label: 'Programadas', value: promotions.filter(p => new Date(p.startDate) > new Date()).length, color: 'text-amber-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100">
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-stone-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 mb-6">
                <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-xl px-4 py-2">
                        <Search size={18} className="text-stone-400" />
                        <input
                            type="text"
                            placeholder="Buscar promociones..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none w-full"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'active', 'inactive', 'expired'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                                    filter === f
                                        ? "bg-stone-900 text-white"
                                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                                )}
                            >
                                {f === 'all' ? 'Todas' : f === 'active' ? 'Activas' : f === 'inactive' ? 'Inactivas' : 'Expiradas'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Promotions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPromotions.map((promo) => {
                    const typeInfo = getTypeInfo(promo.type);
                    const status = getPromoStatus(promo);

                    return (
                        <div
                            key={promo.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-lg transition-all"
                        >
                            {/* Image */}
                            <div className="relative h-32">
                                {promo.imageUrl ? (
                                    <Image src={promo.imageUrl} alt={promo.name} fill className="object-cover" />
                                ) : (
                                    <div className="h-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                                        <Tag size={40} className="text-white/50" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                {/* Status Badge */}
                                <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold ${status.color}`}>
                                    {status.label}
                                </span>

                                {/* Type Badge */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-stone-700">
                                    <typeInfo.icon size={12} />
                                    {promo.type === 'percentage' && `${promo.discountValue}% OFF`}
                                    {promo.type === 'fixed' && `$${promo.discountValue} OFF`}
                                    {promo.type === 'combo' && `Combo $${promo.comboPrice}`}
                                    {promo.type === 'bogo' && '2x1'}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-stone-800">{promo.name}</h3>
                                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{promo.description}</p>

                                <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(promo.endDate).toLocaleDateString('es-UY', { day: 'numeric', month: 'short' })}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TrendingUp size={12} />
                                        {promo.usageCount} usos
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                                    <button
                                        onClick={() => handleToggleActive(promo.id)}
                                        className={cn(
                                            "flex items-center gap-1 text-sm font-medium transition-colors",
                                            promo.isActive ? "text-emerald-600" : "text-stone-400"
                                        )}
                                    >
                                        {promo.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                        {promo.isActive ? 'Activa' : 'Inactiva'}
                                    </button>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(promo)}
                                            className="p-2 bg-stone-100 hover:bg-emerald-100 hover:text-emerald-700 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(promo.id)}
                                            className="p-2 bg-stone-100 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Editor Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                            <h3 className="font-bold text-xl text-stone-800">
                                {isEditing === 'new' ? 'Nueva Promoción' : 'Editar Promoción'}
                            </h3>
                            <button onClick={() => setIsEditing(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 overflow-y-auto">
                            {/* Name */}
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Nombre *</label>
                                <input
                                    type="text"
                                    value={editForm.name || ''}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900"
                                    placeholder="Ej: Combo Desayuno"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Descripción</label>
                                <textarea
                                    value={editForm.description || ''}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900 min-h-[80px] resize-none"
                                    placeholder="Descripción corta de la promoción"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-2">Tipo de Promoción</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {PROMO_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setEditForm({ ...editForm, type: type.id as any })}
                                            className={cn(
                                                "p-3 rounded-xl border-2 text-center transition-all",
                                                editForm.type === type.id
                                                    ? "border-stone-900 bg-stone-50"
                                                    : "border-stone-200 hover:border-stone-300"
                                            )}
                                        >
                                            <type.icon size={20} className={cn("mx-auto mb-1", editForm.type === type.id ? "text-stone-900" : "text-stone-400")} />
                                            <span className="text-xs font-medium">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Value (conditional) */}
                            {(editForm.type === 'percentage' || editForm.type === 'fixed') && (
                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase block mb-1">
                                        {editForm.type === 'percentage' ? 'Porcentaje de Descuento' : 'Monto de Descuento'}
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
                                            {editForm.type === 'percentage' ? '%' : '$'}
                                        </span>
                                        <input
                                            type="number"
                                            value={editForm.discountValue || ''}
                                            onChange={(e) => setEditForm({ ...editForm, discountValue: Number(e.target.value) })}
                                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-stone-900"
                                        />
                                    </div>
                                </div>
                            )}

                            {editForm.type === 'combo' && (
                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Precio del Combo</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">$</span>
                                        <input
                                            type="number"
                                            value={editForm.comboPrice || ''}
                                            onChange={(e) => setEditForm({ ...editForm, comboPrice: Number(e.target.value) })}
                                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-stone-900"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Fecha Inicio</label>
                                    <input
                                        type="date"
                                        value={editForm.startDate || ''}
                                        onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase block mb-1">Fecha Fin</label>
                                    <input
                                        type="date"
                                        value={editForm.endDate || ''}
                                        onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900"
                                    />
                                </div>
                            </div>

                            {/* Valid Days */}
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-2">Días Válidos</label>
                                <div className="flex gap-2">
                                    {DAYS.map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                const currentDays = editForm.validDays || [];
                                                const newDays = currentDays.includes(index)
                                                    ? currentDays.filter(d => d !== index)
                                                    : [...currentDays, index];
                                                setEditForm({ ...editForm, validDays: newDays });
                                            }}
                                            className={cn(
                                                "flex-1 py-2 rounded-lg text-xs font-bold transition-colors",
                                                (editForm.validDays || []).includes(index)
                                                    ? "bg-stone-900 text-white"
                                                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                                            )}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="text-xs font-bold text-stone-500 uppercase block mb-1">URL de Imagen (opcional)</label>
                                <input
                                    type="url"
                                    value={editForm.imageUrl || ''}
                                    onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-stone-900"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="p-6 bg-stone-50 border-t border-stone-100 flex gap-3 justify-end">
                            <button
                                onClick={() => setIsEditing(null)}
                                className="px-6 py-3 rounded-xl font-bold text-stone-500 hover:bg-stone-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 rounded-xl font-bold bg-stone-900 text-white hover:bg-black shadow-lg transition-all flex items-center gap-2"
                            >
                                <Save size={18} /> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
