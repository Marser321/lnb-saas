import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './data';

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'confirmed' | 'cooking' | 'ready' | 'delivered' | 'cancelled';
    createdAt: string;
    customerName?: string;
    customerPhone?: string;
    notes?: string;
}

interface OrdersState {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
    getOrder: (id: string) => Order | undefined;
    updateOrderStatus: (id: string, status: Order['status']) => void;
    clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>()(
    persist(
        (set, get) => ({
            orders: [],

            addOrder: (orderData) => {
                const id = `ORD-${Date.now()}`;
                const newOrder: Order = {
                    ...orderData,
                    id,
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    orders: [newOrder, ...state.orders]
                }));

                return id;
            },

            getOrder: (id) => {
                return get().orders.find(o => o.id === id);
            },

            updateOrderStatus: (id, status) => {
                set((state) => ({
                    orders: state.orders.map(o =>
                        o.id === id ? { ...o, status } : o
                    )
                }));
            },

            clearOrders: () => {
                set({ orders: [] });
            }
        }),
        {
            name: 'lnb-orders',
        }
    )
);
