import { IAlertAction, IAlertState, ISetAlertAction, IUnsetAlertAction } from './Alert.types.ts';

const setAlert = (state: IAlertState, action: ISetAlertAction): IAlertState => {
	const alertIndex = state.alerts.findIndex(({ id }) => id === action.alert.id);
	const updatedAlerts = state.alerts;

	if (alertIndex !== -1) {
		updatedAlerts[alertIndex] = action.alert;
	} else {
		updatedAlerts.push(action.alert);
	}

	return { ...state, alerts: updatedAlerts };
};

const unsetAlert = (state: IAlertState, action: IUnsetAlertAction): IAlertState => {
	return { ...state, alerts: state.alerts.filter(({ id }) => id !== action.id) };
};
const alertReducer = (state: IAlertState, action: IAlertAction): IAlertState => {
	switch (action.type) {
		case 'SET_ALERT':
			return setAlert(state, action);
		case 'UNSET_ALERT':
			return unsetAlert(state, action);
		default:
			return state;
	}
};

export default alertReducer;
