import { useState } from 'react';

export const useModal = (initialState = false) => {
	const [isOpen, setIsOpen] = useState(initialState);

	const toggle = () => setIsOpen(!isOpen);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return {
		isOpen,
		toggle,
		open,
		close,
	};
};
