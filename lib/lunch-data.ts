// Lunch Studio - Smart Catering Data

export interface LunchTier {
    id: string;
    name: string;
    description: string;
    basePrice: number; // Price per person
    image: string;
    features: string[];
    color: string;
}

export interface LunchAddon {
    id: string;
    name: string;
    description: string;
    pricePerPerson: number;
    icon: string;
}

export const LUNCH_TIERS: LunchTier[] = [
    {
        id: 'office-casual',
        name: 'Office Casual',
        description: 'Ideal para reuniones de equipo y almuerzos relajados.',
        basePrice: 450,
        color: 'bg-orange-100 border-orange-200 text-orange-900',
        image: 'https://images.unsplash.com/photo-1554434932-d29ea4b42b62?w=800&h=600&fit=crop',
        features: [
            'Sandwiches surtidos (Jamón y Queso, Pollo)',
            'Wraps vegetarianos',
            'Refrescos línea Coca-Cola (600ml)',
            'Brownies de postre'
        ]
    },
    {
        id: 'executive',
        name: 'Executive Premium',
        description: 'Para impresionar a clientes y directivos.',
        basePrice: 750,
        color: 'bg-stone-900 border-stone-800 text-white',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
        features: [
            'Focaccias rellenas (Bondiola, Rúcula)',
            'Ensaladas Caesar individuales',
            'Jugos naturales exprimidos en el momento',
            'Mini Patisserie (Macarons, Eclairs)',
            'Servicio de vajilla descartable premium'
        ]
    },
    {
        id: 'wellness',
        name: 'Wellness & Healthy',
        description: 'Opciones frescas y livianas para mantener la energía.',
        basePrice: 600,
        color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
        features: [
            'Bowls de Quinoa y Palta',
            'Wraps de Salmón Ahumado',
            'Smoothies Detox (Verde, Frutos Rojos)',
            'Ensalada de Frutas de estación'
        ]
    }
];

export const LUNCH_ADDONS: LunchAddon[] = [
    {
        id: 'coffee-service',
        name: 'Servicio de Café',
        description: 'Termos de café de especialidad y leches.',
        pricePerPerson: 120,
        icon: '☕'
    },
    {
        id: 'sweet-extra',
        name: 'Extra Dulce',
        description: 'Más variedad de masitas y tortas.',
        pricePerPerson: 150,
        icon: '🍰'
    },
    {
        id: 'gluten-free-pack',
        name: 'Opción Sin Gluten',
        description: 'Menú especial para celíacos (por persona).',
        pricePerPerson: 0, // Free swap usually, or add cost
        icon: '🌾'
    }
];
