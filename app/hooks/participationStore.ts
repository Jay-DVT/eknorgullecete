import { create } from "zustand";

interface ParticipationProps {
	isParticipationOpen: boolean;
	openParticipation: () => void;
	closeParticipation: () => void;
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
	openParticipation: () => set({ isParticipationOpen: true }),
	closeParticipation: () => set({ isParticipationOpen: false }),
	mail: "",
	phoneNumber: "",
	setParticipationNumber: (number: number) =>
		set({ participationNumber: number }),
	setMail: (mail: string) => set({ mail: mail }),
	setPhoneNumber: (phoneNumber: string) => set({ phoneNumber: phoneNumber }),
}));

export default useParticipationStore;
