import React, { useReducer, createContext, PropsWithChildren, useMemo } from 'react';
import { Admin, Session } from '@utils/generated/graphql';

export interface IGlobalState {
	auth: {
		user?: Admin;
		session?: Session;
		isLoggedIn: boolean;
	};
	theme: {
		light: boolean;
	};
}

interface ILogoutAction {
	type: 'LOGOUT';
}
interface IDarkModeAction {
	type: 'DARK_MODE';
}
interface ILightModeAction {
	type: 'LIGHT_MODE';
}
interface ILoginAction {
	type: 'LOGIN';
	auth: {
		session: Session;
		user: Admin;
	};
}

export type IGlobalAction = ILogoutAction | ILoginAction | IDarkModeAction | ILightModeAction;

const initialGlobalState = {
	auth: { isLoggedIn: false },
	theme: { light: true },
};

const globalReducer = (state: IGlobalState, action: IGlobalAction): IGlobalState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				auth: {
					...state.auth,
					session: action.auth.session,
					user: action.auth.user,
					isLoggedIn: true,
				},
			};
		case 'LOGOUT':
			return {
				...state,
				auth: {
					...state.auth,
					isLoggedIn: false,
				},
			};
		case 'LIGHT_MODE':
			return {
				...state,
				theme: {
					...state.theme,
					light: true,
				},
			};
		case 'DARK_MODE':
			return {
				...state,
				theme: {
					...state.theme,
					light: false,
				},
			};
		default:
			return state;
	}
};

export const GlobalContext = createContext<{
	state: IGlobalState;
	dispatch: React.Dispatch<IGlobalAction>;
}>({
	state: initialGlobalState,
	dispatch: () => {},
});

export default function GlobalStateProvider({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

	const value = useMemo(
		() => ({
			dispatch,
			state,
		}),
		[dispatch, state],
	);
	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
