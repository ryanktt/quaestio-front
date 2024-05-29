import Auth, { IAuthParams } from '@components/Auth/Auth.tsx';
import { Modal } from '@mantine/core';

interface IAuthModalParams extends IAuthParams {
	opened: boolean;
	close: () => void;
}

export default function AuthModal({ opened, close, type }: IAuthModalParams) {
	return (
		<Modal opened={opened} onClose={close} withCloseButton={false}>
			<h2 className="mt-0 text-center">{type === 'signup' ? 'Sign Up' : 'Log In'}</h2>
			<Auth type={type} />
		</Modal>
	);
}
