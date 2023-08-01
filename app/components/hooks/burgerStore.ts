import { create } from "zustand";

const useStore = create((set) => ({
	isBurgerOpen: false,
	toggleBurger: () =>
		set((state: any) => ({ isBurgerOpen: !state.isBurgerOpen })),
}));
