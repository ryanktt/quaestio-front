import { useSignInMutation, useSignUpMutation } from '@utils/generated/graphql.ts';
import { TextInput, Button, Center } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { AuthModalContext } from '@contexts/AuthModal.context.tsx';
import { GlobalContext } from '@contexts/Global/Global.context.tsx';
import { useCookies } from 'react-cookie';
import { IAuthData } from '@contexts/Global/Global.types.ts';
import Password from './Password/Password.tsx';

export default function Auth() {
	const globalContext = useContext(GlobalContext);
	const { type } = useContext(AuthModalContext).state;

	const [, setCookie] = useCookies(['authData']);

	const [signUpMutation, { data: signUpData }] = useSignUpMutation();
	const [logInMutation, { data: logInData }] = useSignInMutation();

	const [password, setPassword] = useState('');

	const form = useForm({
		mode: 'controlled',
		initialValues: { email: '', name: '' },
		validate: {
			name: hasLength({ min: 3, max: 255 }, 'Name must be 3-255 characters long'),
			email: isEmail('Invalid email'),
		},
	});

	const handlePasswordChange = (pass: string) => {
		setPassword(pass);
	};

	const handleFormSubmit = async () => {
		const { email, name } = form.getValues();
		if (type === 'LOGIN') {
			await logInMutation({ variables: { email, password } });
		} else {
			await signUpMutation({ variables: { name, email, password } });
		}
	};

	useEffect(() => {
		form.reset();
		if (type === 'LOGIN') form.setFieldValue('name', '---');
	}, [type]);

	const authenticateUser = (authResponse: IAuthData) => {
		const { session, user, authToken } = authResponse;

		setCookie('authData', authResponse, {
			path: '/',
			httpOnly: import.meta.env.VITE_MODE === 'production',
			expires: new Date(session.expiresAt),
			sameSite: 'strict',
			secure: true,
		});
		globalContext.state.login(user, session, authToken);
	};

	useEffect(() => {
		if (!logInData) return;
		authenticateUser(logInData.publicSignIn);
	}, [logInData]);

	useEffect(() => {
		if (!signUpData) return;
		authenticateUser(signUpData.publicSignUp);
	}, [signUpData]);

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)}>
			{type === 'SIGNUP' ? (
				<TextInput {...form.getInputProps('name')} required label="Name" placeholder="your name" mt="sm" />
			) : null}
			<TextInput
				{...form.getInputProps('email')}
				placeholder="youremail@hotmail.com"
				label="Email"
				required
				mt="sm"
			/>
			<Password onPasswordChange={handlePasswordChange} comfirmPassword={type === 'SIGNUP'} />
			<Center>
				<Button style={{ width: '100%' }} justify="center" size="sm" mt="xl" type="submit" variant="gradient">
					{type === 'SIGNUP' ? 'Sign Up' : 'Log In'}
				</Button>
			</Center>
		</form>
	);
}
