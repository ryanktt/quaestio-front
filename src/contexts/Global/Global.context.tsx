import { Dispatch, PropsWithChildren, createContext, useEffect, useMemo, useReducer } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import globalReducer from './Global.reducer.ts';
import { IAdmin, IAuthData, IGlobalAction, IGlobalState, ILayoutBgColors, ISession } from './Global.types.ts';

const initialGlobalState = {
	auth: { isLoggedIn: false },
	theme: { light: true },
	layout: {},
	alerts: [],
	searchStr: '',
	login: () => {},
	logout: () => {},
	setLightMode: () => {},
	setDarkMode: () => {},
	setSearchStr: () => {},
	setResponseBgColor: () => {},
};

export const GlobalContext = createContext<{
	state: IGlobalState;
	dispatch: Dispatch<IGlobalAction>;
}>({
	state: initialGlobalState,
	dispatch: () => {},
});

export default function GlobalContextProvider({ children }: PropsWithChildren & {}) {
	const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
	const [cookies] = useCookies(['authData']);
	const { authData } = cookies;

	useEffect(() => {
		if (authData) {
			const { authToken: token, session, user } = authData as IAuthData;
			dispatch({ type: 'LOGIN', auth: { session, user, token } });
		}
	}, [authData]);

	const value = useMemo(
		() => ({
			dispatch,
			state: {
				...state,
				login: (user: IAdmin, session: ISession, token: string) => {
					dispatch({ type: 'LOGIN', auth: { session, user, token } });
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
				setSearchStr: (searchStr: string) => {
					dispatch({ type: 'SEARCH', searchStr });
				},
				setResponseBgColor: (colorScheme: ILayoutBgColors) => {
					dispatch({ type: 'LAYOUT', layout: { responseBgColor: colorScheme } });
				},
			},
		}),
		[dispatch, state],
	);
	return (
		<GlobalContext.Provider value={value}>
			<CookiesProvider defaultSetOptions={{ path: '/' }}>{children}</CookiesProvider>
		</GlobalContext.Provider>
	);
}
