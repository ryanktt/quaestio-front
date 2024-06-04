import Auth from '@components/Auth/Auth.tsx';
import { Modal } from '@mantine/core';
import { useContext } from 'react';
import AuthModalContext from '../../contexts/AuthModal.context.ts';

export default function AuthModal() {
	const {
		setAuthModalClosed: close,
		authModalOpened: opened,
		authModalType: type,
	} = useContext(AuthModalContext).state;

	return (
		<Modal centered zIndex={500} opened={opened} onClose={close} withCloseButton={false}>
			<h2 className="mt-0 text-center">{type === 'signup' ? 'Sign Up' : 'Log In'}</h2>
			<Auth type={type} />
		</Modal>
	);
}
