import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from './data';

// ============================================
// TYPES
// ============================================

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    customizations?: string[]; // For future cake studio integration
}

export interface DiscountCode {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minPurchase: number;
}

interface CartState {
    // State
    items: CartItem[];
    discountCode: DiscountCode | null;
    isCartOpen: boolean;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };

    // Computed (called as functions)
    getItemCount: () => number;
    getSubtotal: () => number;
    getDiscount: () => number;
    getTotal: () => number;
    getPointsToEarn: () => number;

    // Actions
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    setCartOpen: (open: boolean) => void;
    toggleCart: () => void;
    applyDiscountCode: (code: string) => Promise<{ success: boolean; message: string }>;
    removeDiscountCode: () => void;
    setCustomerInfo: (info: Partial<CartState['customerInfo']>) => void;
}

// ============================================
// MOCK DISCOUNT CODES (Replace with API later)
// ============================================

const VALID_DISCOUNT_CODES: DiscountCode[] = [
    { code: 'BIENVENIDO10', type: 'percentage', value: 10, minPurchase: 0 },
    { code: 'VERANO20', type: 'percentage', value: 20, minPurchase: 500 },
    { code: 'CAFE50', type: 'fixed', value: 50, minPurchase: 200 },
];

// ============================================
// STORE
// ============================================

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            // Initial State
            items: [],
            discountCode: null,
            isCartOpen: false,
            customerInfo: {
                name: '',
                email: '',
                phone: '',
            },

            // Computed Values
            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },

            getDiscount: () => {
                const { discountCode } = get();
                const subtotal = get().getSubtotal();

                if (!discountCode) return 0;
                if (subtotal < discountCode.minPurchase) return 0;

                if (discountCode.type === 'percentage') {
                    return Math.round((subtotal * discountCode.value) / 100);
                }
                return Math.min(discountCode.value, subtotal);
            },

            getTotal: () => {
                return get().getSubtotal() - get().getDiscount();
            },

            getPointsToEarn: () => {
                // $100 = 10 points
                return Math.floor(get().getTotal() / 10);
            },

            // Actions
            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);

                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { id: product.id, product, quantity }],
                    };
                });
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => {
                set({
                    items: [],
                    discountCode: null,
                    customerInfo: { name: '', email: '', phone: '' },
                });
            },

            setCartOpen: (open) => {
                set({ isCartOpen: open });
            },

            toggleCart: () => {
                set((state) => ({ isCartOpen: !state.isCartOpen }));
            },

            applyDiscountCode: async (code) => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 500));

                const upperCode = code.toUpperCase().trim();
                const validCode = VALID_DISCOUNT_CODES.find((c) => c.code === upperCode);

                if (!validCode) {
                    return { success: false, message: 'Código inválido o expirado' };
                }

                const subtotal = get().getSubtotal();
                if (subtotal < validCode.minPurchase) {
                    return {
                        success: false,
                        message: `Compra mínima de $${validCode.minPurchase} requerida`,
                    };
                }

                set({ discountCode: validCode });
                return {
                    success: true,
                    message:
                        validCode.type === 'percentage'
                            ? `¡${validCode.value}% de descuento aplicado!`
                            : `¡$${validCode.value} de descuento aplicado!`,
                };
            },

            removeDiscountCode: () => {
                set({ discountCode: null });
            },

            setCustomerInfo: (info) => {
                set((state) => ({
                    customerInfo: { ...state.customerInfo, ...info },
                }));
            },
        }),
        {
            name: 'lnb-cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                items: state.items,
                customerInfo: state.customerInfo,
                // Don't persist discount codes or cart open state
            }),
        }
    )
);
