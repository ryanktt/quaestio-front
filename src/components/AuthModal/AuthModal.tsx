import Auth from '@components/Auth/Auth.tsx';
import { AuthModalContext } from '@contexts/AuthModal.context';
import { Anchor, Group, Modal } from '@mantine/core';
import { useContext } from 'react';

export default function AuthModal() {
	const authModalContext = useContext(AuthModalContext);
	const { setType, setClosed: close, opened, type } = authModalContext.state;

	return (
		<Modal
			centered
			overlayProps={{ backgroundOpacity: 0.3, blur: 2 }}
			zIndex={500}
			opened={opened}
			onClose={close}
			withCloseButton={false}
		>
			<h2 className="mt-0 text-center">{type === 'SIGNUP' ? 'Sign Up' : 'Log In'}</h2>
			<Group fz={14} m={0} justify="center">
				<p className="text-gray-500 m-0">
					{type === 'SIGNUP' ? (
						<>
							Already have an account?{' '}
							<Anchor fw="bold" fz={15} onClick={() => setType('LOGIN')}>
								Log in
							</Anchor>
						</>
					) : (
						<>
							Does not have an account?{' '}
							<Anchor fw="bold" fz={15} onClick={() => setType('SIGNUP')}>
								Sign up
							</Anchor>
						</>
					)}
				</p>
			</Group>
			<Auth />
		</Modal>
	);
}
