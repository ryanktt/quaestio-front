import Auth from '@components/Auth/Auth.tsx';
import { AuthModalContext } from '@contexts/AuthModal.context';
import { Modal } from '@mantine/core';
import { useContext } from 'react';

export default function AuthModal() {
	const { setClosed: close, opened, type } = useContext(AuthModalContext).state;

	return (
		<Modal
			centered
			overlayProps={{ backgroundOpacity: 0.3, blur: 2 }}
			zIndex={500}
			opened={opened}
			onClose={close}
			withCloseButton={false}
		>
			<h2 className="mt-0 text-center">{type === 'signup' ? 'Sign Up' : 'Log In'}</h2>
			<Auth type={type} />
		</Modal>
	);
}
