import { Dispatch, PropsWithChildren, createContext, useMemo, useReducer } from 'react';
import { IAlert, IAlertAction, IAlertState } from './Alert.types.ts';
import alertReducer from './Alert.reducer.ts';

const initialAlertState = {
	alerts: [],
	setAlert: () => {},
	unsetAlert: () => {},
};

export const AlertContext = createContext<{
	state: IAlertState;
	dispatch: Dispatch<IAlertAction>;
}>({
	state: initialAlertState,
	dispatch: () => {},
});
export const AlertContextConsumer = AlertContext.Consumer;

export default function AlertContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(alertReducer, initialAlertState);

	const alertContextValues = useMemo(() => {
		return {
			dispatch,
			state: {
				...state,
				setAlert: (alert: IAlert) => {
					dispatch({ type: 'SET_ALERT', alert });
				},
				unsetAlert: (id: string) => {
					dispatch({ type: 'UNSET_ALERT', id });
				},
			},
		};
	}, [dispatch, state]);

	return <AlertContext.Provider value={alertContextValues}>{children}</AlertContext.Provider>;
}
