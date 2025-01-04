import { Notification } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '@contexts/Alert/Alert.context';
import { IAlertTypes, IAlert } from '@contexts/Alert/Alert.types';
import classes from './Alert.module.scss';

export default function AlertItem({ alert }: { alert: IAlert }) {
	const { unsetAlert } = useContext(AlertContext).state;
	const [visible, setVisible] = useState(false);

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
		setVisible(false);
		setTimeout(() => {
			unsetAlert(alert.id);
		}, 200);
	};

	useEffect(() => {
		setVisible(true);
	}, []);

	useEffect(() => {
		if (alert.timeout) {
			setTimeout(() => {
				closeAlert();
			}, alert.timeout);
		}
	}, [alert]);

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
			title={alert.title}
			onClose={closeAlert}
		>
			{alert.message}
		</Notification>
	);
}
