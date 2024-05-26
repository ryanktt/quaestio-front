/* eslint-disable no-nested-ternary */
import { Box, Progress, PasswordInput, Group, Text, Center } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';

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

const requirements = [
	{ re: /[0-9]/, label: 'Includes number' },
	{ re: /[a-z]/, label: 'Includes lowercase letter' },
	{ re: /[A-Z]/, label: 'Includes uppercase letter' },
];

function getStrength(password: string) {
	let multiplier = password.length > 5 ? 0 : 1;

	requirements.forEach((requirement) => {
		if (!requirement.re.test(password)) {
			multiplier += 1;
		}
	});

	return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export default function Password() {
	const [{ password1, password2 }, setPasswords] = useState({ password1: '', password2: '' });
	const [match, setMatch] = useState(true);

	const handlePassword1Change = (event: ChangeEvent<HTMLInputElement>) => {
		setPasswords((passwords) => ({ ...passwords, password1: event.target.value }));
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

	const strength = getStrength(password1);

	const checks = [
		<PasswordRequirement key={-1} label="Has at least 6 characters" meets={password1.length > 5} />,
		...requirements.map((requirement, index) => (
			<PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password1)} />
		)),
	];

	const bars = Array(4)
		.fill(0)
		.map((_, index) => (
			<Progress
				styles={{ section: { transitionDuration: '0ms' } }}
				value={password2.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0}
				color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
				key={index}
				size={4}
			/>
		));

	return (
		<div>
			<PasswordInput mt="sm" value={password1} onChange={handlePassword1Change} placeholder="your password" label="Password" required />
			<PasswordInput
				mt="sm"
				error={!match ? 'Passwords do not match' : null}
				value={password2}
				onChange={handlePassword2Change}
				onBlur={handlePassword2Blur}
				placeholder="your password"
				label="Confirm Password"
				required
			/>
			<Group gap={5} grow mt="xs" mb="md">
				{bars}
			</Group>
			{checks}
		</div>
	);
}
