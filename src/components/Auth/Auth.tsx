/* eslint-disable no-nested-ternary */
import { TextInput, Button } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
// import { useState } from 'react';
import Password from './Password/Password.tsx';

export type IAuthType = 'login' | 'signup';
export interface IAuthParams {
	type: IAuthType;
}

export default function Auth({ type }: IAuthParams) {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			name: '',
		},
		validate: {
			name: hasLength({ min: 3, max: 255 }, 'Name must be 3-255 characters long'),
			email: isEmail('Invalid email'),
		},
	});

	// const { email, name } = form.getValues();

	return (
		<form onSubmit={form.onSubmit(() => {})}>
			<TextInput {...form.getInputProps('name')} required label="Name" placeholder="your name" mt="md" />
			<TextInput {...form.getInputProps('email')} required label="Email" placeholder="youremail@hotmail.com" mt="md" />
			<Password />
			<Button size="sm" mt="lg" type="submit" variant="gradient">
				{type === 'signup' ? 'Sign Up' : 'Log In'}
			</Button>
		</form>
	);
}
