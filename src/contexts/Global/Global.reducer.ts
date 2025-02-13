import { IGlobalAction, IGlobalState } from './Global.types.ts';

const globalReducer = (state: IGlobalState, action: IGlobalAction): IGlobalState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				auth: {
					...state.auth,
					session: action.auth.session,
					token: action.auth.token,
					user: action.auth.user,
					isLoggedIn: true,
				},
			};
		case 'LOGOUT':
			return {
				...state,
				auth: {
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
		case 'SEARCH':
			return {
				...state,
				searchStr: action.searchStr,
			};
		default:
			return state;
	}
};

export default globalReducer;
