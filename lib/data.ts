// ==============================================================================
// La Nueva Brasil - Data Configuration
// ==============================================================================

// Helper to generate placeholders (fallback only)
const getPlaceholder = (text: string, bg: string, fg: string) =>
    `https://placehold.co/400x400/${bg}/${fg}?text=${encodeURIComponent(text)}`;

// ==========================================
// CAKE STUDIO DATA
// ==========================================
export const CAKE_SIZES = [
    { id: 'mini', label: 'Mini (4 porciones)', portions: 4, price: 800, subtitle: 'Ideal para eventos', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop' },
    { id: 'standard', label: 'Estándar (12 porciones)', portions: 12, price: 1500, subtitle: 'Ideal para eventos', image: 'https://images.unsplash.com/photo-1542826438-bd32fcf02d46?w=200&h=200&fit=crop' },
    { id: 'party', label: 'Fiesta (24 porciones)', portions: 24, price: 2800, subtitle: 'Ideal para eventos', image: 'https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?w=200&h=200&fit=crop' },
];

export const CAKE_FLAVORS = [
    { id: 'vanilla', label: 'Vainilla Clásica', color: 'bg-amber-100', image: getPlaceholder('Vainilla', 'fef3c7', '92400e'), preview: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop' },
    { id: 'chocolate', label: 'Chocolate Intenso', color: 'bg-amber-900', image: getPlaceholder('Chocolate', '451a03', 'fff'), preview: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop' },
    { id: 'carrot', label: 'Zanahoria & Nuez', color: 'bg-orange-300', image: getPlaceholder('Zanahoria', 'fdba74', '9a3412'), preview: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop' },
    { id: 'redvelvet', label: 'Red Velvet', color: 'bg-red-800', image: getPlaceholder('Red Velvet', '991b1b', 'fff'), preview: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=400&h=400&fit=crop' },
];


export const CAKE_FILLINGS = [
    { id: 'dulce-leche', label: 'Dulce de Leche', price: 200, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=100&h=100&fit=crop' },
    { id: 'choc-mousse', label: 'Mousse de Chocolate', price: 250, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=100&h=100&fit=crop' },
    { id: 'fruits', label: 'Frutas Frescas', price: 300, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=100&h=100&fit=crop' },
    { id: 'pastry-cream', label: 'Crema Pastelera', price: 150, image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=100&h=100&fit=crop' },
];

export const CAKE_TOPPINGS = [
    { id: 'buttercream', label: 'Buttercream', price: 100, image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=100&h=100&fit=crop' },
    { id: 'fondant', label: 'Fondant', price: 200, image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=100&h=100&fit=crop' },
    { id: 'merengue', label: 'Merengue Italiano', price: 180, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=100&h=100&fit=crop' },
    { id: 'naked', label: 'Naked Cake', price: 0, image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=100&h=100&fit=crop' },
];

// ==========================================
// BEACH EXPRESS DATA
// ==========================================

export type ProductCategory = 'coffee' | 'bakery' | 'lunch' | 'desserts' | 'drinks';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    image: string;
    isPopular?: boolean;
    tags?: string[]; // 'vegan', 'gluten-free', 'lactose-free', 'healthy'
    stock?: number; // undefined = unlimited, 0 = out of stock
    ingredients?: string[];
    nutritionalInfo?: {
        calories: number;
        protein: string;
        carbs: string;
        fat: string;
    };
    allergens?: string[];
}

export const CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
    { id: 'coffee', label: 'Cafetería', icon: '☕' },
    { id: 'bakery', label: 'Panadería', icon: '🥐' },
    { id: 'lunch', label: 'Almuerzo', icon: '🥪' },
    { id: 'desserts', label: 'Postres', icon: '🍰' },
    { id: 'drinks', label: 'Bebidas', icon: '🥤' },
];

export const EXPRESS_MENU: Product[] = [
    // CAFETERÍA
    {
        id: 'esp-001',
        name: 'Espresso Doble',
        description: 'Shot doble de café premium',
        price: 120,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop',
        isPopular: true,
        tags: ['vegan', 'gluten-free', 'lactose-free'],
        ingredients: ['Granos de café 100% Arábica', 'Agua filtrada'],
        nutritionalInfo: { calories: 5, protein: '1g', carbs: '0g', fat: '0g' },
        allergens: []
    },
    {
        id: 'lat-001',
        name: 'Café Latte',
        description: 'Espresso con leche texturizada',
        price: 180,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop',
        tags: ['gluten-free'],
        ingredients: ['Espresso', 'Leche entera vaporizada', 'Espuma de leche'],
        nutritionalInfo: { calories: 120, protein: '6g', carbs: '9g', fat: '6g' },
        allergens: ['Lácteos']
    },
    {
        id: 'cap-001',
        name: 'Cappuccino',
        description: 'Espresso, leche y espuma cremosa',
        price: 190,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop',
        isPopular: true,
        ingredients: ['Espresso', 'Leche entera', 'Espuma densa de leche', 'Cacao en polvo'],
        nutritionalInfo: { calories: 110, protein: '6g', carbs: '8g', fat: '5g' },
        allergens: ['Lácteos']
    },
    {
        id: 'ame-001',
        name: 'Americano',
        description: 'Espresso diluido en agua caliente',
        price: 140,
        category: 'coffee',
        image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?w=400&h=400&fit=crop',
        tags: ['vegan', 'gluten-free', 'lactose-free'],
        ingredients: ['Espresso', 'Agua caliente'],
        nutritionalInfo: { calories: 5, protein: '0g', carbs: '1g', fat: '0g' },
        allergens: []
    },

    // PANADERÍA
    {
        id: 'med-001',
        name: 'Medialunas (x3)',
        description: 'De manteca, recién horneadas',
        price: 180,
        category: 'bakery',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop',
        isPopular: true,
        ingredients: ['Harina de trigo', 'Manteca', 'Azúcar', 'Leche', 'Levadura', 'Huevos'],
        nutritionalInfo: { calories: 350, protein: '5g', carbs: '45g', fat: '18g' },
        allergens: ['Gluten', 'Lácteos', 'Huevos']
    },
    {
        id: 'biz-001',
        name: 'Docena de Bizcochos',
        description: 'Surtido dulce y salado',
        price: 480,
        category: 'bakery',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
        stock: 0, // Out of stock for testing
        ingredients: ['Harina', 'Grasa bovina', 'Azúcar/Sal', 'Levadura'],
        nutritionalInfo: { calories: 1200, protein: '20g', carbs: '150g', fat: '60g' },
        allergens: ['Gluten']
    },
    {
        id: 'pan-001',
        name: 'Pan Artesanal',
        description: 'Pan de masa madre (500g)',
        price: 320,
        category: 'bakery',
        image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop',
        ingredients: ['Harina integral', 'Masa madre natural', 'Agua', 'Sal marina'],
        nutritionalInfo: { calories: 250, protein: '8g', carbs: '48g', fat: '1g' },
        allergens: ['Gluten']
    },
    {
        id: 'fac-001',
        name: 'Factura Rellena',
        description: 'Dulce de leche o crema pastelera',
        price: 90,
        category: 'bakery',
        image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=400&fit=crop',
        ingredients: ['Harina', 'Manteca', 'Dulce de leche/Crema', 'Azúcar'],
        nutritionalInfo: { calories: 280, protein: '4g', carbs: '35g', fat: '14g' },
        allergens: ['Gluten', 'Lácteos', 'Huevos']
    },

    // ALMUERZO
    {
        id: 'san-001',
        name: 'Sandwich Olímpico',
        description: 'Jamón, queso, huevo, tomate, lechuga',
        price: 350,
        category: 'lunch',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop',
        isPopular: true,
        tags: ['healthy'],
        ingredients: ['Pan de miga', 'Jamón cocido', 'Queso dambo', 'Huevo duro', 'Tomate', 'Lechuga', 'Mayonesa'],
        nutritionalInfo: { calories: 450, protein: '18g', carbs: '40g', fat: '22g' },
        allergens: ['Gluten', 'Lácteos', 'Huevos']
    },
    {
        id: 'tos-001',
        name: 'Tostado Mixto',
        description: 'Jamón y queso en pan de molde',
        price: 220,
        category: 'lunch',
        image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=400&fit=crop',
        ingredients: ['Pan de molde', 'Jamón', 'Queso'],
        nutritionalInfo: { calories: 320, protein: '14g', carbs: '30g', fat: '16g' },
        allergens: ['Gluten', 'Lácteos']
    },
    {
        id: 'ens-001',
        name: 'Ensalada César',
        description: 'Lechuga, pollo, parmesano, croutons',
        price: 420,
        category: 'lunch',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=400&fit=crop',
        tags: ['healthy', 'gluten-free'],
        ingredients: ['Lechuga romana', 'Pechuga de pollo grillada', 'Croutons', 'Queso parmesano', 'Aderezo César'],
        nutritionalInfo: { calories: 380, protein: '28g', carbs: '12g', fat: '24g' },
        allergens: ['Lácteos', 'Huevos', 'Gluten', 'Pescado (anchoas)']
    },
    {
        id: 'emp-001',
        name: 'Empanadas (x3)',
        description: 'Carne, pollo o jamón y queso',
        price: 280,
        category: 'lunch',
        image: '/food/empanadas.png',
        ingredients: ['Masa de empanada', 'Carne picada/Pollo', 'Cebolla', 'Huevo', 'Aceitunas'],
        nutritionalInfo: { calories: 650, protein: '22g', carbs: '60g', fat: '35g' },
        allergens: ['Gluten', 'Huevos']
    },

    // POSTRES
    {
        id: 'tor-001',
        name: 'Porción Torta Chocolate',
        description: 'Ganache y dulce de leche',
        price: 280,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
        isPopular: true,
        ingredients: ['Chocolate semi-amargo', 'Harina', 'Huevos', 'Manteca', 'Dulce de leche', 'Crema de leche'],
        nutritionalInfo: { calories: 550, protein: '6g', carbs: '65g', fat: '30g' },
        allergens: ['Gluten', 'Lácteos', 'Huevos']
    },
    {
        id: 'che-001',
        name: 'Cheesecake',
        description: 'New York style con frutos rojos',
        price: 320,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop',
        ingredients: ['Queso crema', 'Galletitas', 'Manteca', 'Azúcar', 'Huevos', 'Frutos rojos'],
        nutritionalInfo: { calories: 480, protein: '8g', carbs: '45g', fat: '28g' },
        allergens: ['Gluten', 'Lácteos', 'Huevos']
    },
    {
        id: 'bro-001',
        name: 'Brownie con Helado',
        description: 'Brownie tibio + helado de vainilla',
        price: 350,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=400&fit=crop',
        ingredients: ['Chocolate', 'Nueces', 'Harina', 'Huevos', 'Helado de vainilla'],
        nutritionalInfo: { calories: 600, protein: '7g', carbs: '70g', fat: '32g' },
        allergens: ['Gluten', 'Lácteos', 'Huevos', 'Nueces']
    },
    {
        id: 'alf-001',
        name: 'Alfajor Artesanal',
        description: 'Maicena con dulce de leche',
        price: 120,
        category: 'desserts',
        image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=400&fit=crop',
        ingredients: ['Maicena', 'Dulce de leche', 'Coco rallado', 'Manteca'],
        nutritionalInfo: { calories: 280, protein: '3g', carbs: '42g', fat: '12g' },
        allergens: ['Lácteos', 'Huevos', 'Gluten']
    },

    // BEBIDAS
    {
        id: 'jug-001',
        name: 'Jugo Natural',
        description: 'Naranja, pomelo o mixto',
        price: 180,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
        tags: ['vegan', 'healthy', 'gluten-free'],
        ingredients: ['Fruta fresca exprimida'],
        nutritionalInfo: { calories: 110, protein: '2g', carbs: '26g', fat: '0g' },
        allergens: [],
        stock: 3 // Low stock for testing
    },
    {
        id: 'lic-001',
        name: 'Licuado de Frutas',
        description: 'Banana, frutilla o durazno',
        price: 220,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=400&fit=crop',
        tags: ['vegan', 'healthy'],
        ingredients: ['Fruta fresca', 'Agua o Leche', 'Azúcar (opcional)'],
        nutritionalInfo: { calories: 180, protein: '4g', carbs: '35g', fat: '2g' },
        allergens: ['Lácteos (si es con leche)']
    },
    {
        id: 'agua-001',
        name: 'Agua Mineral',
        description: 'Con o sin gas (500ml)',
        price: 80,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop',
        tags: ['vegan', 'gluten-free', 'lactose-free', 'healthy'],
        ingredients: ['Agua mineral natural'],
        nutritionalInfo: { calories: 0, protein: '0g', carbs: '0g', fat: '0g' },
        allergens: []
    },
];

// ==========================================
// MENÚ DEL DÍA
// ==========================================

export interface DailySpecial {
    id: string;
    title: string;
    description: string;
    originalPrice: number;
    promoPrice: number;
    validUntil: string;
    items: string[];
    image: string;
}

export const DAILY_SPECIAL: DailySpecial = {
    id: 'promo-001',
    title: 'Combo Desayuno Playa',
    description: 'Cappuccino + 3 Medialunas',
    originalPrice: 370,
    promoPrice: 299,
    validUntil: '12:00',
    items: ['cap-001', 'med-001'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop'
};
