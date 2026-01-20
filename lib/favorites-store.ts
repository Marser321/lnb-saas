import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './data';

interface FavoritesState {
    favorites: string[]; // Array of product IDs
    addFavorite: (productId: string) => void;
    removeFavorite: (productId: string) => void;
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (productId) => {
                set((state) => ({
                    favorites: [...state.favorites, productId]
                }));
            },

            removeFavorite: (productId) => {
                set((state) => ({
                    favorites: state.favorites.filter(id => id !== productId)
                }));
            },

            toggleFavorite: (productId) => {
                const { favorites } = get();
                if (favorites.includes(productId)) {
                    get().removeFavorite(productId);
                } else {
                    get().addFavorite(productId);
                }
            },

            isFavorite: (productId) => {
                return get().favorites.includes(productId);
            },

            clearFavorites: () => {
                set({ favorites: [] });
            }
        }),
        {
            name: 'lnb-favorites',
        }
    )
);
