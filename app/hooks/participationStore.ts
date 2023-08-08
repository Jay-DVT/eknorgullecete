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
	fullName: string;
	setFullName: (fullName: string) => void;
}

const useParticipationStore = create<ParticipationProps>((set) => ({
	isParticipationOpen: false,
	participationNumber: 0,
	openParticipation: () => set({ isParticipationOpen: true }),
	closeParticipation: () => set({ isParticipationOpen: false }),
	mail: "",
	phoneNumber: "",
	fullName: "",
	setParticipationNumber: (number: number) =>
		set({ participationNumber: number }),
	setMail: (mail: string) => set({ mail: mail }),
	setPhoneNumber: (phoneNumber: string) => set({ phoneNumber: phoneNumber }),
	setFullName: (fullName: string) => set({ fullName: fullName }),
}));

export default useParticipationStore;
