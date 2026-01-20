
// ============================================
// CLUB LNB - LOYALTY PROGRAM LOGIC
// ============================================

export type LoyaltyLevel = 'nuevo' | 'bronze' | 'silver' | 'gold';

export interface LevelInfo {
    id: LoyaltyLevel;
    name: string;
    emoji: string;
    minPoints: number;
    maxPoints: number;
    discountPercent: number;
    benefits: string[];
    color: string;
    bgColor: string;
}

export interface Reward {
    id: string;
    name: string;
    description: string;
    pointsCost: number;
    image: string;
    category: 'product' | 'discount' | 'experience';
    available: boolean;
}

// ============================================
// LEVEL DEFINITIONS
// ============================================

export const LOYALTY_LEVELS: LevelInfo[] = [
    {
        id: 'nuevo',
        name: 'Socio LNB',
        emoji: '☕',
        minPoints: 0,
        maxPoints: 99,
        discountPercent: 0,
        benefits: [
            'Bienvenido al club',
            'Sumá puntos con cada sorbo',
        ],
        color: 'text-stone-600',
        bgColor: 'bg-stone-100',
    },
    {
        id: 'bronze',
        name: 'Fan LNB',
        emoji: '🥐',
        minPoints: 100,
        maxPoints: 299,
        discountPercent: 5,
        benefits: [
            '5% OFF en tu cumpleaños',
            'Acceso a promos secretas',
            'Notificaciones VIP',
        ],
        color: 'text-amber-700',
        bgColor: 'bg-amber-100',
    },
    {
        id: 'silver',
        name: 'LNB Lover',
        emoji: '🍰',
        minPoints: 300,
        maxPoints: 599,
        discountPercent: 10,
        benefits: [
            '10% OFF siempre',
            'Delivery sin cargo (1/semana)',
            'Probá primero lo nuevo',
            'Regalo dulce en tu cumple',
        ],
        color: 'text-slate-600',
        bgColor: 'bg-slate-100',
    },
    {
        id: 'gold',
        name: 'LNB Elite',
        emoji: '👑',
        minPoints: 600,
        maxPoints: Infinity,
        discountPercent: 15,
        benefits: [
            '15% OFF en todo',
            'Envíos gratis ilimitados',
            'Acceso a eventos exclusivos',
            'Torta de regalo en tu cumple',
            'Prioridad en reservas (Fechas especiales)',
            'Atención personalizada por WhatsApp',
        ],
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
    },
];

// ============================================
// REWARDS CATALOG
// ============================================

export const REWARDS_CATALOG: Reward[] = [
    {
        id: 'reward-cafe',
        name: 'Café de la Casa',
        description: 'Tu café favorito, invito yo.',
        pointsCost: 100,
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop',
        category: 'product',
        available: true,
    },
    {
        id: 'pack-guardia',
        name: 'Pack Guardia 🚑',
        description: 'Café Doble + Tostado (Para héroes de turno)',
        pointsCost: 350,
        image: 'https://images.unsplash.com/photo-1559466273-d95e71deb586?w=400&h=400&fit=crop',
        category: 'product',
        available: true,
    },
    {
        id: 'reward-medialunas',
        name: 'Trío de Medialunas',
        description: 'Recién salidas del horno (Manteca/Grasa)',
        pointsCost: 150,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
        category: 'product',
        available: true,
    },
    {
        id: 'reward-torta',
        name: 'Slice de Torta',
        description: 'Una porción de felicidad a elección',
        pointsCost: 250,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
        category: 'product',
        available: true,
    },
    {
        id: 'pack-visita',
        name: 'Pack Visita Hospital 🏥',
        description: 'Caja de 6 Bizcochos para compartir',
        pointsCost: 300,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
        category: 'product',
        available: true,
    },
    {
        id: 'reward-descuento-10',
        name: '10% OFF Extra',
        description: 'Acumulable con otros beneficios',
        pointsCost: 200,
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=400&fit=crop',
        category: 'discount',
        available: true,
    },
    {
        id: 'reward-torta-completa',
        name: 'Torta de Cumple',
        description: 'Diseñá tu propia torta en el Studio',
        pointsCost: 800,
        image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop',
        category: 'experience',
        available: true,
    },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate points earned from a purchase
 * $100 = 10 points (10% of purchase in points)
 */
export function calculatePointsFromPurchase(totalAmount: number): number {
    return Math.floor(totalAmount / 10);
}

/**
 * Get the loyalty level for a given point total
 */
export function getLevelForPoints(points: number): LevelInfo {
    // Find the highest level the user qualifies for
    for (let i = LOYALTY_LEVELS.length - 1; i >= 0; i--) {
        if (points >= LOYALTY_LEVELS[i].minPoints) {
            return LOYALTY_LEVELS[i];
        }
    }
    return LOYALTY_LEVELS[0];
}

/**
 * Get the next level info (for progress display)
 */
export function getNextLevel(currentLevel: LoyaltyLevel): LevelInfo | null {
    const currentIndex = LOYALTY_LEVELS.findIndex(l => l.id === currentLevel);
    if (currentIndex < LOYALTY_LEVELS.length - 1) {
        return LOYALTY_LEVELS[currentIndex + 1];
    }
    return null; // Already at max level
}

/**
 * Calculate progress to next level (0-100)
 */
export function getProgressToNextLevel(points: number): number {
    const currentLevel = getLevelForPoints(points);
    const nextLevel = getNextLevel(currentLevel.id);

    if (!nextLevel) return 100; // Already at max

    const pointsInCurrentLevel = points - currentLevel.minPoints;
    const pointsNeededForNext = nextLevel.minPoints - currentLevel.minPoints;

    return Math.min(100, Math.round((pointsInCurrentLevel / pointsNeededForNext) * 100));
}

/**
 * Get points needed for next level
 */
export function getPointsToNextLevel(points: number): number {
    const currentLevel = getLevelForPoints(points);
    const nextLevel = getNextLevel(currentLevel.id);

    if (!nextLevel) return 0;

    return nextLevel.minPoints - points;
}

/**
 * Get available rewards based on user's points
 */
export function getAvailableRewards(points: number): Reward[] {
    return REWARDS_CATALOG.filter(reward => reward.available && reward.pointsCost <= points);
}

/**
 * Convert points to discount amount
 * 100 points = $50 discount
 */
export function pointsToDiscount(points: number): number {
    return Math.floor(points / 2);
}

/**
 * Calculate how many points needed for a reward
 */
export function getPointsNeededForReward(reward: Reward, currentPoints: number): number {
    return Math.max(0, reward.pointsCost - currentPoints);
}

/**
 * Check if today is a bonus day (e.g., Saturdays = 2x points)
 */
export function getBonusMultiplier(): number {
    const today = new Date().getDay();
    // Saturday = 6 → 2x points
    if (today === 6) return 2;
    return 1;
}

/**
 * Format points with proper styling
 */
export function formatPoints(points: number): string {
    return points.toLocaleString('es-UY');
}
