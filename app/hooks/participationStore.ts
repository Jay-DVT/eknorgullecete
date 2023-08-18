import { create } from "zustand";

interface ParticipationProps {
	// Modal management
	isParticipationOpen: boolean;
	openParticipation: () => void;
	closeParticipation: () => void;
	// Form information
	participationNumber: number;
	setParticipationNumber: (number: number) => void;
	mail: string;
	setMail: (mail: string) => void;
	phoneNumber: string;
	setPhoneNumber: (phoneNumber: string) => void;
	fullName: string;
	setFullName: (fullName: string) => void;
	//Image section
	imageFile: File | null;
	setImageFile: (file: File) => void;
}

const useParticipationStore = create<ParticipationProps>((set) => ({
	isParticipationOpen: false,
	participationNumber: 0,
	openParticipation: () => set({ isParticipationOpen: true }),
	closeParticipation: () => set({ isParticipationOpen: false }),
	mail: "",
	phoneNumber: "",
	fullName: "",
	imageFile: null,
	setParticipationNumber: (number: number) =>
		set({ participationNumber: number }),
	setMail: (mail: string) => set({ mail: mail }),
	setPhoneNumber: (phoneNumber: string) => set({ phoneNumber: phoneNumber }),
	setFullName: (fullName: string) => set({ fullName: fullName }),
	setImageFile: (file) => set({ imageFile: file }),
}));

export default useParticipationStore;
