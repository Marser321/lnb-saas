import { create } from 'zustand';
import { CAKE_SIZES, CAKE_FLAVORS, CAKE_FILLINGS, CAKE_TOPPINGS } from './data';

interface CakeState {
    step: number;
    config: {
        size: string;
        flavor: string;
        fillings: string[];
        topping: string;
        message: string;
    };
    totalPrice: number;
    setStep: (step: number) => void;
    setConfig: (key: string, value: any) => void;
    calculateTotal: () => void;
}

export const useCakeStore = create<CakeState>((set, get) => ({
    step: 1,
    config: {
        size: CAKE_SIZES[1].id, // Default standard
        flavor: CAKE_FLAVORS[0].id,
        fillings: [CAKE_FILLINGS[0].id],
        topping: CAKE_TOPPINGS[0].id,
        message: '',
    },
    totalPrice: CAKE_SIZES[1].price,

    setStep: (step) => set({ step }),

    setConfig: (key, value) => {
        set((state) => ({
            config: { ...state.config, [key]: value },
        }));
        get().calculateTotal();
    },

    calculateTotal: () => {
        const { config } = get();
        let total = 0;

        const sizeObj = CAKE_SIZES.find(s => s.id === config.size);
        if (sizeObj) total += sizeObj.price;

        config.fillings.forEach(fId => {
            const fObj = CAKE_FILLINGS.find(f => f.id === fId);
            if (fObj) total += fObj.price;
        });

        const topObj = CAKE_TOPPINGS.find(t => t.id === config.topping);
        if (topObj) total += topObj.price;

        set({ totalPrice: total });
    },
}));
