/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { AuthModalContext } from '@contexts/AuthModal.context';
import { Box, Center, Group, PasswordInput, Progress, Text } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

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
		<Text key={label} component="div" c={meets ? 'teal' : 'grey'} mt={5} size="sm">
			<Center inline>
				{meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
				<Box ml={7}>{label}</Box>
			</Center>
		</Text>
	);
}

export default function Password({ onPasswordChange, comfirmPassword = false }: IPasswordParams) {
	const authType = useContext(AuthModalContext).state;
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [match, setMatch] = useState(true);

	useEffect(() => {
		setPassword('');
		setConfirmPass('');
		onPasswordChange('');
	}, [authType]);

	useEffect(() => {
		setMatch(() => {
			if (password === confirmPass) return true;
			return false;
		});
	}, [password, confirmPass]);

	const strength = getStrength(password);
	const isValid = match && (strength >= 80 || confirmPass.length === 0);

	const handlePassordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newPass1 = event.target.value;
		setPassword(newPass1);
		onPasswordChange(newPass1);
	};
	const handleConfirmPassChange = (event: ChangeEvent<HTMLInputElement>) => {
		setConfirmPass(event.target.value);
	};

	const checks = requirements.map((requirement) => (
		<PasswordRequirement label={requirement.label} meets={requirement.re.test(password)} />
	));

	const error = !match ? 'Passwords do not match' : 'Password is too weak';

	const bars = Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				key={index}
				styles={{ section: { transitionDuration: '50ms' } }}
				value={confirmPass.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
				color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
				size={4}
			/>
		));

	return (
		<div>
			<PasswordInput
				mt="sm"
				value={password}
				onChange={handlePassordChange}
				placeholder="your password"
				label="Password"
				required
			/>
			{comfirmPassword ? (
				<>
					<PasswordInput
						mt="sm"
						value={confirmPass}
						error={!isValid ? error : null}
						onChange={handleConfirmPassChange}
						placeholder="your password"
						label="Confirm Password"
						required
					/>
					<Group gap={5} grow mt="xs" mb="md">
						{bars}
					</Group>
					{...checks}
				</>
			) : null}
		</div>
	);
}
