import { create } from "zustand";

interface SideNavProps {
	isSideNavOpen: boolean;
	toggleSideNav: () => void;
}

const useStore = create<SideNavProps>((set) => ({
	isSideNavOpen: false,
	toggleSideNav: () =>
		set((state) => ({ isSideNavOpen: !state.isSideNavOpen })),
}));

useStore.subscribe((state) => console.log("New state:", state));

export default useStore;
