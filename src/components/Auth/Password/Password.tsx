/* eslint-disable no-nested-ternary */
import { Box, Progress, PasswordInput, Group, Text, Center } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';

interface IPasswordParams {
	onPasswordChange: (password: string) => void;
	comfirmPassword?: boolean;
}

const requirements = [
	{ re: /^.{6,}$/, label: 'Has at least 6 characters' },
	{ re: /[0-9]/, label: 'Includes number' },
	{ re: /[a-z]/, label: 'Includes lowercase letter' },
	{ re: /[A-Z]/, label: 'Includes uppercase letter' },
];

function getStrength(password: string) {
	const multiplier = requirements.reduce((acc, req) => {
		if (!req.re.test(password)) return acc + 1;
		return acc;
	}, 0);

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
	return (
		<Text component="div" c={meets ? 'teal' : 'grey'} mt={5} size="sm">
			<Center inline>
				{meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
				<Box ml={7}>{label}</Box>
			</Center>
		</Text>
	);
}

export default function Password({ onPasswordChange, comfirmPassword = false }: IPasswordParams) {
	const [{ password1, password2 }, setPasswords] = useState({ password1: '', password2: '' });
	const [match, setMatch] = useState(true);

	const strength = getStrength(password1);
	const isValid = match && (strength >= 80 || password2.length === 0);

	const handlePassword1Change = (event: ChangeEvent<HTMLInputElement>) => {
		setPasswords((passwords) => ({ ...passwords, password1: event.target.value }));
		onPasswordChange(password1);
	};
	const handlePassword2Change = (event: ChangeEvent<HTMLInputElement>) => {
		setPasswords((passwords) => ({ ...passwords, password2: event.target.value }));
	};
	const handlePassword2Blur = () => {
		setMatch(() => {
			if (password1 === password2) return true;
			return false;
		});
	};

	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement
			key={`password-req-${index}`}
			label={requirement.label}
			meets={requirement.re.test(password1)}
		/>
	));

	const error = !match ? 'Passwords do not match' : 'Password is too weak';

	const bars = Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				styles={{ section: { transitionDuration: '50ms' } }}
				value={password2.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
				color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
				key={index}
				size={4}
			/>
		));

	return (
		<div>
			<PasswordInput
				mt="sm"
				value={password1}
				onChange={handlePassword1Change}
				placeholder="your password"
				label="Password"
				required
			/>
			{comfirmPassword
				? [
						<PasswordInput
							mt="sm"
							value={password2}
							error={!isValid ? error : null}
							onChange={handlePassword2Change}
							onBlur={handlePassword2Blur}
							placeholder="your password"
							label="Confirm Password"
							required
						/>,
						<Group gap={5} grow mt="xs" mb="md">
							{bars}
						</Group>,
						...checks,
					]
				: null}
		</div>
	);
}
