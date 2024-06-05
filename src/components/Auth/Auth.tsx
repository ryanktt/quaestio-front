import { useSignInMutation, useSignUpMutation } from '@utils/generated/graphql.ts';
import { AuthModalContext } from '@contexts/AuthModal.context.tsx';
import { TextInput, Button, Center } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { getGraphqlErrorCode } from '@utils/graphql.ts';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@contexts/Global.context.tsx';
import Password from './Password/Password.tsx';

export default function Auth() {
	const globalContext = useContext(GlobalContext);
	const { type } = useContext(AuthModalContext).state;

	const [signUp, { error: signUpError }] = useSignUpMutation();
	const [logIn, { error: logInError, data: logInData }] = useSignInMutation();
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
		if (type === 'SIGNUP') {
			await signUp({ variables: { name, email, password } });
		}
		await logIn({ variables: { email, password } });
	};

	useEffect(() => {
		form.reset();
		// Assigns generic valid value to name so validation does't fail on login
		if (type === 'LOGIN') form.setFieldValue('name', '---');
	}, [type]);

	useEffect(() => {
		if (!logInData) return;
		const { session, user } = logInData.publicSignIn;
		globalContext.dispatch({ type: 'LOGIN', auth: { session, user } });
	}, [logInData]);

	useEffect(() => {
		if (!logInError) return;
		console.log(getGraphqlErrorCode(logInError));
	}, [logInError]);

	useEffect(() => {
		if (!signUpError) return;
		console.log(getGraphqlErrorCode(signUpError));
	}, [signUpError]);

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
