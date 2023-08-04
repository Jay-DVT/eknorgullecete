import { create } from "zustand";

interface ParticipationProps {
	isParticipationOpen: boolean;
	toggleParticipation: () => void;
	participationNumber: number;
	setParticipationNumber: (number: number) => void;
	mail: string;
	setMail: (mail: string) => void;
	phoneNumber: string;
	setPhoneNumber: (phoneNumber: string) => void;
}

const useParticipationStore = create<ParticipationProps>((set) => ({
	isParticipationOpen: false,
	participationNumber: 0,
	mail: "",
	phoneNumber: "",
	toggleParticipation: () =>
		set((state) => ({ isParticipationOpen: !state.isParticipationOpen })),
	setParticipationNumber: (number: number) =>
		set({ participationNumber: number }),
	setMail: (mail: string) => set({ mail: mail }),
	setPhoneNumber: (phoneNumber: string) => set({ phoneNumber: phoneNumber }),
}));

useParticipationStore.subscribe((state) => console.log("New state:", state));

export default useParticipationStore;
