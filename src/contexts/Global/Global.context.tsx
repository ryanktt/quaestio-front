import { Dispatch, PropsWithChildren, createContext, useMemo, useReducer } from 'react';
import { IAdmin, IGlobalAction, IGlobalState, ISession } from './Global.types.ts';
import globalReducer from './Global.reducer.ts';

const initialGlobalState = {
	auth: { isLoggedIn: false },
	theme: { light: true },
	login: () => {},
	logout: () => {},
	setLightMode: () => {},
	setDarkMode: () => {},
};

export const GlobalContext = createContext<{
	state: IGlobalState;
	dispatch: Dispatch<IGlobalAction>;
}>({
	state: initialGlobalState,
	dispatch: () => {},
});

export default function GlobalContextProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
	const value = useMemo(
		() => ({
			dispatch,
			state,
		}),
		[
			dispatch,
			{
				...state,
				login: (user: IAdmin, session: ISession) => {
					dispatch({ type: 'LOGIN', auth: { session, user } });
				},
				logout: () => {
					dispatch({ type: 'LOGOUT' });
				},
				setLightMode: () => {
					dispatch({ type: 'LIGHT_MODE' });
				},
				setDarkMode: () => {
					dispatch({ type: 'DARK_MODE' });
				},
			},
		],
	);
	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
