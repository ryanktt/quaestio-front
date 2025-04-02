import { AuthModalContext } from '@contexts/AuthModal.context.tsx';
import { GlobalContext } from '@contexts/Global/Global.context.tsx';
import { IAuthData } from '@contexts/Global/Global.types.ts';
import { useSignInMutation, useSignUpMutation } from '@gened/graphql.ts';
import { Button, Center, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Password from './Password/Password.tsx';

export default function Auth() {
	const globalContext = useContext(GlobalContext);
	const { type, setClosed: setModalClosed } = useContext(AuthModalContext).state;

	const [, setCookie] = useCookies(['authData']);

	const [signupMutation, { data: signupData, reset: resetSignup }] = useSignUpMutation();
	const [loginMutation, { data: loginData, reset: resetLogin }] = useSignInMutation();

	const [password, setPassword] = useState('');
	const navigate = useNavigate();

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
			await loginMutation({ variables: { email, password } });
		} else {
			await signupMutation({ variables: { name, email, password } });
		}
		setModalClosed();
	};

	useEffect(() => {
		form.reset();
		if (type === 'LOGIN') form.setFieldValue('name', '---');
	}, [type]);

	const authenticateUser = (authResponse: IAuthData) => {
		const { session, user, authToken } = authResponse;

		setCookie('authData', authResponse, {
			path: '/',
			httpOnly: false,
			secure: import.meta.env.VITE_MODE === 'production',
			expires: new Date(session.expiresAt),
			sameSite: 'none',
		});
		globalContext.state.login(user, session, authToken);
		navigate('/board/questionnaires');
	};

	useEffect(() => {
		if (!loginData) return;
		authenticateUser(loginData.publicSignIn);
		resetLogin();
	}, [loginData]);

	useEffect(() => {
		if (!signupData) return;
		authenticateUser(signupData.publicSignUp);
		resetSignup();
	}, [signupData]);

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)}>
			{type === 'SIGNUP' ? (
				<TextInput
					{...form.getInputProps('name')}
					required
					label="Name"
					placeholder="your name"
					mt="sm"
				/>
			) : null}
			<TextInput
				{...form.getInputProps('email')}
				placeholder="youremail@hotmail.com"
				label="Email"
				type="email"
				required
				mt="sm"
			/>
			<Password onPasswordChange={handlePasswordChange} comfirmPassword={type === 'SIGNUP'} />
			<Center>
				<Button
					style={{ width: '100%' }}
					justify="center"
					size="sm"
					mt="xl"
					type="submit"
					variant="gradient"
				>
					{type === 'SIGNUP' ? 'Sign Up' : 'Log In'}
				</Button>
			</Center>
		</form>
	);
}
