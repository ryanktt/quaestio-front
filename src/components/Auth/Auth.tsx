/* eslint-disable no-nested-ternary */
import { TextInput, Button, Center, Group, Anchor } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
import { useSignInMutation, useSignUpMutation } from '@utils/generated/graphql.ts';
import { getGraphqlErrorCode } from '@utils/graphql.ts';
import Password from './Password/Password.tsx';

export type IAuthTypes = 'login' | 'signup';
export interface IAuthParams {
	type: IAuthTypes;
}

export default function Auth({ type }: IAuthParams) {
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
	const [password, setPassword] = useState('');

	const handlePasswordChange = (password: string) => {
		setPassword(password);
	};

	const { email, name } = form.getValues();

	const [signUp, { error: signUpError }] = useSignUpMutation();
	const [signIn, { error: signInError }] = useSignInMutation();

	// sets a simple string, so that name passes form val on login
	if (type === 'login') {
		form.setFieldValue('name', '---');
	}

	const handleFormSubmit = async () => {
		if (type === 'signup') {
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
			<Group fz={14} m={0} justify="center">
				<p className="text-gray-500 m-0">
					{type === 'signup' ? (
						<>
							Already have an account?{' '}
							<Anchor fw="bold" fz={15}>
								Log in
							</Anchor>
						</>
					) : (
						<>
							Does not have an account?{' '}
							<Anchor fw="bold" fz={15}>
								Sign up
							</Anchor>
						</>
					)}
				</p>
			</Group>
			{type === 'signup' ? (
				<TextInput {...form.getInputProps('name')} required label="Name" placeholder="your name" mt="sm" />
			) : null}
			<TextInput
				{...form.getInputProps('email')}
				required
				label="Email"
				placeholder="youremail@hotmail.com"
				mt="sm"
			/>
			<Password onPasswordChange={handlePasswordChange} comfirmPassword={type === 'signup'} />
			<Center>
				<Button style={{ width: '100%' }} justify="center" size="sm" mt="xl" type="submit" variant="gradient">
					{type === 'signup' ? 'Sign Up' : 'Log In'}
				</Button>
			</Center>
		</form>
	);
}
