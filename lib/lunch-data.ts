// ============================================
// LUNCH STUDIO - SMART CATERING DATA (EXPANDED)
// ============================================

// ============================================
// OCCASIONS
// ============================================

export interface Occasion {
    id: string;
    name: string;
    emoji: string;
    description: string;
    suggestedTiers: string[];
    color: string;
    gradient: string;
}

export const OCCASIONS: Occasion[] = [
    {
        id: 'trabajo',
        name: 'Trabajo',
        emoji: '💼',
        description: 'Reuniones, capacitaciones, almuerzos de equipo',
        suggestedTiers: ['express', 'office', 'executive'],
        color: 'text-blue-600',
        gradient: 'from-blue-600 to-indigo-700'
    },
    {
        id: 'familia',
        name: 'Familia',
        emoji: '👨‍👩‍👧‍👦',
        description: 'Cumpleaños, domingos, reuniones familiares',
        suggestedTiers: ['family', 'wellness'],
        color: 'text-rose-600',
        gradient: 'from-rose-500 to-pink-600'
    },
    {
        id: 'amigos',
        name: 'Amigos',
        emoji: '🎉',
        description: 'Juntadas, after office, celebraciones',
        suggestedTiers: ['asado-friends', 'express'],
        color: 'text-amber-600',
        gradient: 'from-amber-500 to-orange-600'
    },
    {
        id: 'evento',
        name: 'Evento',
        emoji: '🎊',
        description: 'Casamientos, inauguraciones, lanzamientos',
        suggestedTiers: ['executive', 'wellness'],
        color: 'text-purple-600',
        gradient: 'from-purple-600 to-fuchsia-600'
    }
];

// ============================================
// TIERS (EXPANDED)
// ============================================

export interface LunchTier {
    id: string;
    name: string;
    tagline: string;
    description: string;
    basePrice: number;
    image: string;
    features: string[];
    color: string;
    bgGradient: string;
    icon: string;
}

export const LUNCH_TIERS: LunchTier[] = [
    {
        id: 'express',
        name: 'Express Rápido',
        tagline: 'Para los que no pueden esperar',
        description: 'Sandwiches listos para servir. Ideal para reuniones cortas.',
        basePrice: 350,
        color: 'text-sky-700',
        bgGradient: 'from-sky-50 to-cyan-50',
        icon: '⚡',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=800&h=600&fit=crop',
        features: [
            'Sandwiches de miga surtidos',
            'Agua mineral 500ml',
            'Servilletas y cubiertos'
        ]
    },
    {
        id: 'office',
        name: 'Office Clásico',
        tagline: 'El favorito de las oficinas',
        description: 'Balance perfecto entre variedad y practicidad.',
        basePrice: 450,
        color: 'text-orange-700',
        bgGradient: 'from-orange-50 to-amber-50',
        icon: '🏢',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
        features: [
            'Sandwiches gourmet variados',
            'Wraps vegetarianos',
            'Refrescos línea premium',
            'Brownies artesanales'
        ]
    },
    {
        id: 'executive',
        name: 'Executive VIP',
        tagline: 'Para impresionar',
        description: 'Presentación premium para reuniones de alto nivel.',
        basePrice: 750,
        color: 'text-stone-100',
        bgGradient: 'from-stone-800 to-stone-900',
        icon: '👔',
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        features: [
            'Focaccias rellenas gourmet',
            'Ensaladas Caesar individuales',
            'Jugos naturales exprimidos',
            'Mini Patisserie francesa',
            'Vajilla premium descartable'
        ]
    },
    {
        id: 'family',
        name: 'Domingo en Casa',
        tagline: 'Como lo hace la abuela',
        description: 'Sabores caseros para compartir en familia.',
        basePrice: 400,
        color: 'text-rose-700',
        bgGradient: 'from-rose-50 to-pink-50',
        icon: '🏠',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop',
        features: [
            'Empanadas caseras surtidas',
            'Pizzetas artesanales',
            'Limonada casera (jarra)',
            'Torta del día (porción por persona)'
        ]
    },
    {
        id: 'asado-friends',
        name: 'Asado Club',
        tagline: 'Para los juntaderos',
        description: 'Todo lo que necesitás para una juntada épica.',
        basePrice: 650,
        color: 'text-red-700',
        bgGradient: 'from-red-50 to-orange-50',
        icon: '🔥',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&h=600&fit=crop',
        features: [
            'Tabla de fiambres premium',
            'Choripanes gourmet',
            'Provoleta',
            'Ensaladas frescas',
            'Helado artesanal'
        ]
    },
    {
        id: 'wellness',
        name: 'Wellness Detox',
        tagline: 'Light pero delicioso',
        description: 'Opciones saludables sin sacrificar sabor.',
        basePrice: 600,
        color: 'text-emerald-700',
        bgGradient: 'from-emerald-50 to-teal-50',
        icon: '🥗',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
        features: [
            'Bowls de Quinoa y Palta',
            'Wraps integrales',
            'Smoothies Detox',
            'Ensalada de frutas de estación'
        ]
    }
];

// ============================================
// ADDONS (EXPANDED)
// ============================================

export interface LunchAddon {
    id: string;
    name: string;
    description: string;
    pricePerPerson: number;
    flatPrice?: number; // Some addons have flat rate
    icon: string;
    category: 'bebidas' | 'dulces' | 'especiales' | 'servicios';
}

export const LUNCH_ADDONS: LunchAddon[] = [
    {
        id: 'coffee-service',
        name: 'Servicio de Café',
        description: 'Termos de café de especialidad + leches.',
        pricePerPerson: 120,
        icon: '☕',
        category: 'bebidas'
    },
    {
        id: 'premium-drinks',
        name: 'Bebidas Premium',
        description: 'Vinos, espumantes y jugos naturales.',
        pricePerPerson: 250,
        icon: '🍷',
        category: 'bebidas'
    },
    {
        id: 'ice-bar',
        name: 'Barra de Hielo',
        description: 'Cooler con hielo, refrescos y aguas saborizadas.',
        pricePerPerson: 80,
        icon: '🧊',
        category: 'bebidas'
    },
    {
        id: 'sweet-extra',
        name: 'Extra Dulce',
        description: 'Más variedad de masitas, tortas y postres.',
        pricePerPerson: 150,
        icon: '🍰',
        category: 'dulces'
    },
    {
        id: 'custom-cake',
        name: 'Torta Personalizada',
        description: 'Diseñá tu torta en nuestro Cake Studio.',
        pricePerPerson: 0,
        flatPrice: 2500,
        icon: '🎂',
        category: 'dulces'
    },
    {
        id: 'gluten-free',
        name: 'Opción Sin Gluten',
        description: 'Menú especial para celíacos.',
        pricePerPerson: 50,
        icon: '🌾',
        category: 'especiales'
    },
    {
        id: 'eco-packaging',
        name: 'Packaging Eco-Friendly',
        description: 'Envases 100% biodegradables.',
        pricePerPerson: 30,
        icon: '🌿',
        category: 'servicios'
    },
    {
        id: 'express-delivery',
        name: 'Delivery Express',
        description: 'Entrega en menos de 1 hora.',
        pricePerPerson: 0,
        flatPrice: 500,
        icon: '🚚',
        category: 'servicios'
    }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTiersForOccasion(occasionId: string): LunchTier[] {
    const occasion = OCCASIONS.find(o => o.id === occasionId);
    if (!occasion) return LUNCH_TIERS;
    return LUNCH_TIERS.filter(tier => occasion.suggestedTiers.includes(tier.id));
}

export function calculateTotal(
    tier: LunchTier | null,
    attendees: number,
    selectedAddonIds: string[]
): { base: number; addons: number; total: number; perPerson: number } {
    const base = tier ? tier.basePrice * attendees : 0;

    const addons = selectedAddonIds.reduce((acc, addonId) => {
        const addon = LUNCH_ADDONS.find(a => a.id === addonId);
        if (!addon) return acc;
        if (addon.flatPrice) return acc + addon.flatPrice;
        return acc + (addon.pricePerPerson * attendees);
    }, 0);

    const total = base + addons;
    const perPerson = attendees > 0 ? total / attendees : 0;

    return { base, addons, total, perPerson };
}
