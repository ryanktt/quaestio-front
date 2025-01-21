import { Center, Stack } from '@mantine/core';
import { useContext } from 'react';
import AlertItem from '@components/Alert/Alert';
import { AlertContext } from '@contexts/Alert/Alert.context';

export default function AlertStack() {
	const { alerts } = useContext(AlertContext).state;

	return (
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
	);
}
