/* eslint-disable no-nested-ternary */
import { TextInput, Button, Center } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
// import { useState } from 'react';
import { useState } from 'react';
import Password from './Password/Password.tsx';

export type IAuthTypes = 'login' | 'signup';
export interface IAuthParams {
	type: IAuthTypes;
}

export default function Auth({ type }: IAuthParams) {
	const [password, setPassword] = useState('');

	const handlePasswordChange = (password: string) => {
		setPassword(password);
	};
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
				<Button style={{ width: 1000 }} justify="center" size="sm" mt="xl" type="submit" variant="gradient">
					{type === 'signup' ? 'Sign Up' : 'Log In'}
				</Button>
			</Center>
		</form>
	);
}
