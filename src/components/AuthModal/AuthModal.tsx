import Auth, { IAuthParams } from '@components/Auth/Auth.tsx';
import { Modal } from '@mantine/core';

export type IAuthType = 'login' | 'signup';
interface IAuthModalParams extends IAuthParams {
	opened: boolean;
	close: () => void;
}

export default function AuthModal({ opened, close, type }: IAuthModalParams) {
	return (
		<Modal opened={opened} onClose={close} withCloseButton={false}>
			<h3>{type === 'signup' ? 'Sign Up' : 'Log In'}</h3>
			<Auth type={type} />
		</Modal>
	);
}
