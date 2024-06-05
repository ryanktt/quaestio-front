/* eslint-disable no-nested-ternary */
import { TextInput, Button, Center } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
import { useSignInMutation, useSignUpMutation } from '@utils/generated/graphql.ts';
import { getGraphqlErrorCode } from '@utils/graphql.ts';
import Password from './Password/Password.tsx';

export type IAuthTypes = 'LOGIN' | 'SIGNUP';
export interface IAuthParams {
	type: IAuthTypes;
}

export default function Auth({ type }: IAuthParams) {
	const [signUp, { error: signUpError }] = useSignUpMutation();
	const [signIn, { error: signInError }] = useSignInMutation();
	const [password, setPassword] = useState('');
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			email: '',
		},
		validate: {
			name: hasLength({ min: 3, max: 255 }, 'Name must be 3-255 characters long'),
			email: isEmail('Invalid email'),
		},
	});

	const handlePasswordChange = (password: string) => {
		setPassword(password);
	};

	const { email, name } = form.getValues();

	if (type === 'LOGIN') {
		form.setFieldValue('name', '---');
	}

	const handleFormSubmit = async () => {
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
				required
				label="Email"
				placeholder="youremail@hotmail.com"
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
