import { Modal } from '@mantine/core';

export type IAuthType = 'login' | 'signup';
interface IAuthParams {
	opened: boolean;
	close: () => void;
	type: IAuthType;
}

export default function AuthModal({ opened, close, type }: IAuthParams) {
	return (
		<Modal opened={opened} onClose={close} title="Authentication" centered>
			{type === 'login' ? 'Login' : 'SignUp'}
		</Modal>
	);
}
