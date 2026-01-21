
// ==========================================
// STUDIO DATA CONFIGURATION
// Multi-vertical customization data
// ==========================================

// ------------------------------------------
// 🍕 PIZZA STUDIO
// ------------------------------------------

export const PIZZA_SIZES = [
    { id: 'medium', label: 'Mediana (6 porciones)', basePrice: 450, diameter: '30cm', image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'large', label: 'Grande (8 porciones)', basePrice: 600, diameter: '36cm', image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 'extra', label: 'Familiar (10 porciones)', basePrice: 800, diameter: '42cm', image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=300' },
];

export const PIZZA_BASES = [
    { id: 'traditional', label: 'Masa Tradicional', price: 0, description: 'Estilo media masa, crocante por fuera.', image: '/images/studio/pizza-dough-traditional.png' },
    { id: 'stone', label: 'A la Piedra', price: 50, description: 'Fina y crocante.', image: '/images/studio/pizza-dough-stone.png' },
    { id: 'sourdough', label: 'Masa Madre', price: 100, description: 'Fermentación lenta (24hs), más digestiva.', image: '/images/studio/pizza-dough-sourdough.png' },
];

export const PIZZA_SAUCES = [
    { id: 'tomato', label: 'Salsa de Tomate', price: 0, color: 'bg-red-600', image: '/images/studio/sauce-tomato.png' },
    { id: 'spicy', label: 'Salsa Picante', price: 20, color: 'bg-red-800', image: '/images/studio/sauce-spicy.png' },
    { id: 'bbq', label: 'Barbacoa', price: 40, color: 'bg-amber-900', image: '/images/studio/sauce-bbq.png' },
    { id: 'none', label: 'Sin Salsa (Bianca)', price: 0, color: 'transparent', image: '/images/studio/pizza-dough-traditional.png' }, // Valid image for thumbnail
];

export const PIZZA_TOPPINGS = [
    // Cheeses
    { id: 'mozzarella', label: 'Mozzarella', price: 0, category: 'cheese', image: '/images/studio/topping-mozzarella-black.png' },
    { id: 'provolone', label: 'Provolone', price: 80, category: 'cheese', image: '/images/studio/topping-mozzarella-black.png' }, // Reusing mozz for now
    { id: 'blue', label: 'Roquefort', price: 90, category: 'cheese', image: '/images/studio/topping-mozzarella-black.png' }, // Reusing

    // Meats
    { id: 'ham', label: 'Jamón Cocido', price: 60, category: 'meat', image: '/images/studio/topping-ham-black.png' },
    { id: 'pepperoni', label: 'Pepperoni', price: 80, category: 'meat', image: '/images/studio/topping-pepperoni-black.png' },
    { id: 'bacon', label: 'Panceta', price: 90, category: 'meat', image: '/images/studio/topping-ham-black.png' }, // Reusing ham

    // Veggies
    { id: 'onion', label: 'Cebolla', price: 30, category: 'veggie', image: '/images/studio/topping-onion.png' },
    { id: 'peppers', label: 'Morrones', price: 40, category: 'veggie', image: '/images/studio/topping-onion.png' },
    { id: 'olives', label: 'Aceitunas', price: 40, category: 'veggie', image: '/images/studio/topping-olives.png' },
    { id: 'mushrooms', label: 'Hongos', price: 60, category: 'veggie', image: '/images/studio/topping-olives.png' },
    { id: 'arugula', label: 'Rúcula', price: 50, category: 'veggie', image: '/images/studio/topping-arugula.png' },
];

// ------------------------------------------
// 🥟 EMPANADA STUDIO
// ------------------------------------------

export const EMPANADA_PACKS = [
    { id: 'half-dozen', label: 'Media Docena', quantity: 6, price: 500, image: 'https://images.pexels.com/photos/5718036/pexels-photo-5718036.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'dozen', label: 'Docena', quantity: 12, price: 900, image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 'party', label: 'Fiesta (24)', quantity: 24, price: 1700, image: 'https://images.pexels.com/photos/7426867/pexels-photo-7426867.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export const EMPANADA_FLAVORS = [
    { id: 'meat-classic', label: 'Carne Clásica', type: 'traditional', image: 'https://images.pexels.com/photos/6210959/pexels-photo-6210959.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'meat-knife', label: 'Carne a Cuchillo', type: 'traditional', image: 'https://images.pexels.com/photos/5718036/pexels-photo-5718036.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'meat-spicy', label: 'Carne Picante', type: 'traditional', image: 'https://images.pexels.com/photos/7426867/pexels-photo-7426867.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'chicken', label: 'Pollo', type: 'traditional', image: 'https://images.pexels.com/photos/6210760/pexels-photo-6210760.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'ham-cheese', label: 'Jamón y Queso', type: 'classic', image: 'https://images.pexels.com/photos/5718025/pexels-photo-5718025.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'cheese-onion', label: 'Queso y Cebolla', type: 'classic', image: 'https://images.pexels.com/photos/4109890/pexels-photo-4109890.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'caprese', label: 'Caprese', type: 'veggie', image: 'https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'corn', label: 'Humita', type: 'veggie', image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'spinach', label: 'Verdura', type: 'veggie', image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: 'blue-cheese', label: 'Roquefort', type: 'gourmet', image: 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=100' },
];

// ------------------------------------------
// 🍔 BURGER STUDIO
// ------------------------------------------

// Note: Stacking order is significant for the visualizer.
// Using generated isometric images for realistic stacking.

export const BURGER_BUNS = [
    { id: 'brioche', label: 'Brioche', price: 0, image: '/images/studio/burger-bun-top.png', bottomImage: '/images/studio/burger-bun-bottom.png', thickness: 40 }, // Top height
    { id: 'potato', label: 'Pan de Papa', price: 30, image: '/images/studio/burger-bun-top.png', bottomImage: '/images/studio/burger-bun-bottom.png', thickness: 40 },
    { id: 'gluten-free', label: 'Sin Gluten', price: 50, image: '/images/studio/burger-bun-top.png', bottomImage: '/images/studio/burger-bun-bottom.png', thickness: 40 },
];

export const BURGER_PATTIES = [
    { id: 'beef-180', label: 'Carne 180g', price: 350, image: '/images/studio/burger-patty-beef.png', thickness: 25 },
    { id: 'beef-double', label: 'Doble Carne', price: 550, image: '/images/studio/burger-patty-beef.png', thickness: 50 }, // Simulated double thickness
    { id: 'chicken-crispy', label: 'Pollo Crispy', price: 320, image: '/images/studio/burger-patty-beef.png', thickness: 28 }, // Placeholder for chicken
    { id: 'veggie', label: 'NotBurger (Veggie)', price: 380, image: '/images/studio/burger-patty-beef.png', thickness: 22 }, // Placeholder
];

export const BURGER_CHEESES = [
    { id: 'cheddar', label: 'Cheddar', price: 40, color: 'bg-yellow-400', image: '/images/studio/burger-cheese-cheddar.png', thickness: 8 },
    { id: 'dambo', label: 'Dambo', price: 40, color: 'bg-yellow-100', image: '/images/studio/burger-cheese-cheddar.png', thickness: 8 }, // Placeholder
    { id: 'blue', label: 'Roquefort', price: 60, color: 'bg-stone-200', image: '/images/studio/burger-cheese-cheddar.png', thickness: 10 }, // Placeholder
    { id: 'none', label: 'Sin Queso', price: 0, color: 'transparent', image: null, thickness: 0 },
];

export const BURGER_EXTRAS = [
    { id: 'bacon', label: 'Panceta', price: 60, image: '/images/studio/burger-bacon.png', thickness: 6 },
    { id: 'egg', label: 'Huevo Frito', price: 50, image: '/images/studio/burger-cheese-cheddar.png', thickness: 12 }, // Placeholder
    { id: 'onion-caramel', label: 'Cebolla Caramelizada', price: 40, image: '/images/studio/burger-bacon.png', thickness: 8 },
    { id: 'pickles', label: 'Pepinillos', price: 30, image: '/images/studio/burger-lettuce.png', thickness: 5 },
    { id: 'lettuce', label: 'Lechuga', price: 20, image: '/images/studio/burger-lettuce.png', thickness: 15 },
    { id: 'tomato', label: 'Tomate', price: 20, image: '/images/studio/burger-tomato.png', thickness: 10 },
    { id: 'avocado', label: 'Palta', price: 80, image: '/images/studio/burger-lettuce.png', thickness: 12 },
];
