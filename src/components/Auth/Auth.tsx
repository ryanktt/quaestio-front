/* eslint-disable no-nested-ternary */
import { TextInput, Button, Center } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useSignInMutation, useSignUpMutation } from '@utils/generated/graphql.ts';
import { AuthModalContext } from '@contexts/AuthModal.context.tsx';
import { getGraphqlErrorCode } from '@utils/graphql.ts';
import { useContext, useEffect, useState } from 'react';
import Password from './Password/Password.tsx';

export default function Auth() {
	const { type } = useContext(AuthModalContext).state;

	const [signUp, { error: signUpError }] = useSignUpMutation();
	const [signIn, { error: signInError }] = useSignInMutation();
	const [password, setPassword] = useState('');

	const form = useForm({
		mode: 'controlled',
		initialValues: { email: '', name: '' },
		validate: {
			name: hasLength({ min: 3, max: 255 }, 'Name must be 3-255 characters long'),
			email: isEmail('Invalid email'),
		},
	});

	useEffect(() => {
		form.reset();
		if (type === 'LOGIN') form.setFieldValue('name', '---');
	}, [type]);

	const handlePasswordChange = (pass: string) => {
		setPassword(pass);
	};

	const handleFormSubmit = async () => {
		const { email, name } = form.getValues();
		if (type === 'SIGNUP') {
			await signUp({ variables: { name, email, password } }).catch(() => {
				console.log(getGraphqlErrorCode(signUpError));
			});
		}
		const result = await signIn({ variables: { email, password } }).catch(() => {
			console.log(getGraphqlErrorCode(signInError));
		});
	};

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
