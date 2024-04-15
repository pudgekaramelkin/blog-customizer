import { useEffect } from 'react';

type useCloseType = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: useCloseType) {
	useEffect(() => {
		if (!isOpen) return;
		const closeOverlay = (event: MouseEvent) => {
			event.stopPropagation();
			const { target } = event;
			const isClicked =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isClicked) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', closeOverlay);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', closeOverlay);
		};
	}, [isOpen, onClose, rootRef]);
}
