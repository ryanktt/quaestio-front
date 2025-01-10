import { Button, Center, Stack } from '@mantine/core';
import { useContext } from 'react';
import AlertItem from '@components/Alert/Alert';
import { nanoid } from 'nanoid/non-secure';
import { AlertContext } from '@contexts/Alert/Alert.context';

export default function AlertStack() {
	const { setAlert, alerts } = useContext(AlertContext).state;

	const handleRequest = async () => {
		const id = nanoid();
		setAlert({ id, message: 'Loading now', title: 'LOADING!', type: 'LOADING' });
		try {
			// Simulate a request
			await new Promise<void>((resolve, reject): void => {
				setTimeout(() => {
					const isSuccess = Math.random() > 0.5;
					// eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
					isSuccess ? resolve() : reject();
				}, 2000);
			});

			setAlert({ id, message: 'Successful request', title: 'SUCCESS!', type: 'SUCCESS' });
		} catch {
			setAlert({ id, message: 'Error request', title: 'ERROR!', type: 'ERROR' });
		}
	};

	return (
		<>
			<Center
				style={{
					position: 'fixed',
					top: '95%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: 1000,
				}}
			>
				<Stack
					style={{
						gap: '10px',
						width: 'max-content',
						transition: 'ease-in-out 0.2s',
						display: 'flex',
						position: 'fixed',
						alignSelf: 'flex-end',
						justifyContent: 'flex-end',
					}}
				>
					{alerts.map((alert) => (
						<AlertItem alert={alert} key={alert.id} />
					))}
				</Stack>
			</Center>
			<Button onClick={handleRequest}>Start Request</Button>
		</>
	);
}
