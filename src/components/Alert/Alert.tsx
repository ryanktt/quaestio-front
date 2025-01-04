import { Notification } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '@contexts/Alert/Alert.context';
import { IAlertTypes, IAlert } from '@contexts/Alert/Alert.types';
import classes from './Alert.module.scss';

export default function AlertItem({ alert }: { alert: IAlert }) {
	const { unsetAlert } = useContext(AlertContext).state;
	const [visible, setVisible] = useState(true);

	const getAlertColor = (type: IAlertTypes): string => {
		switch (type) {
			case 'SUCCESS':
				return 'green';
			case 'ERROR':
				return 'red';
			case 'LOADING':
				return 'blue';
			default:
				return 'violet';
		}
	};

	const closeAlert = () => {
		setVisible(true);
		setTimeout(() => {
			unsetAlert(alert.id);
		}, 10);
	};

	useEffect(() => {
		if (alert.timeout) {
			setTimeout(() => {
				closeAlert();
			}, alert.timeout);
		}
	}, []);

	return (
		<Notification
			className={`${classes.alert} ${!visible ? classes['alert-hidden'] : ''}`}
			radius="md"
			key={alert.id}
			loading={alert.type === 'LOADING'}
			color={getAlertColor(alert.type)}
			role="alert"
			withCloseButton
			withBorder
			title={alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
			onClose={closeAlert}
		>
			{alert.message}
		</Notification>
	);
}
