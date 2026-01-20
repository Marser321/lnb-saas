import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
    id: string;
    productId: string;
    rating: number; // 1-5
    comment: string;
    authorName: string;
    createdAt: string;
}

interface ReviewsState {
    reviews: Review[];
    addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
    getProductReviews: (productId: string) => Review[];
    getAverageRating: (productId: string) => number;
    getReviewCount: (productId: string) => number;
}

export const useReviewsStore = create<ReviewsState>()(
    persist(
        (set, get) => ({
            reviews: [
                // Some mock reviews
                { id: 'r1', productId: 'esp-001', rating: 5, comment: '¡El mejor espresso de Punta!', authorName: 'María G.', createdAt: '2026-01-15T10:00:00Z' },
                { id: 'r2', productId: 'esp-001', rating: 4, comment: 'Muy rico, siempre consistente.', authorName: 'Carlos R.', createdAt: '2026-01-14T15:30:00Z' },
                { id: 'r3', productId: 'med-001', rating: 5, comment: 'Las medialunas son increíbles, siempre calentitas.', authorName: 'Ana P.', createdAt: '2026-01-13T09:00:00Z' },
                { id: 'r4', productId: 'cap-001', rating: 5, comment: 'Cappu perfecto, la espuma genial.', authorName: 'Diego M.', createdAt: '2026-01-12T11:00:00Z' },
                { id: 'r5', productId: 'tor-001', rating: 5, comment: 'La torta de chocolate es para morirse.', authorName: 'Laura S.', createdAt: '2026-01-10T16:00:00Z' },
            ],

            addReview: (reviewData) => {
                const newReview: Review = {
                    ...reviewData,
                    id: `r-${Date.now()}`,
                    createdAt: new Date().toISOString(),
                };

                set((state) => ({
                    reviews: [newReview, ...state.reviews]
                }));
            },

            getProductReviews: (productId) => {
                return get().reviews.filter(r => r.productId === productId);
            },

            getAverageRating: (productId) => {
                const productReviews = get().getProductReviews(productId);
                if (productReviews.length === 0) return 0;

                const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
                return sum / productReviews.length;
            },

            getReviewCount: (productId) => {
                return get().getProductReviews(productId).length;
            }
        }),
        {
            name: 'lnb-reviews',
        }
    )
);
