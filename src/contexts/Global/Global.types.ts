import { Admin, Session, SignInMutation, SignUpMutation } from '@gened/graphql';

export type ISession = Omit<Session, 'user'>;
export type IAdmin = Omit<Admin, 'self'>;
export type IAuthData = SignUpMutation['publicSignUp'] | SignInMutation['publicSignIn'];

export interface IGlobalState {
	auth: {
		isLoggedIn: boolean;
		user?: IAdmin;
		token?: string;
		session?: ISession;
	};
	theme: {
		light: boolean;
	};
	searchStr: string;

	login: (user: IAdmin, session: ISession, token: string) => void;
	logout: () => void;
	setLightMode: () => void;
	setDarkMode: () => void;
	setSearchStr: (str: string) => void;
}

export interface ILogoutAction {
	type: 'LOGOUT';
}
export interface IDarkModeAction {
	type: 'DARK_MODE';
}
export interface ILightModeAction {
	type: 'LIGHT_MODE';
}
export interface ILoginAction {
	type: 'LOGIN';
	auth: {
		session: ISession;
		token: string;
		user: IAdmin;
	};
}

export interface ISearchAction {
	type: 'SEARCH';
	searchStr: string;
}

export type IGlobalAction = ILogoutAction | ILoginAction | IDarkModeAction | ILightModeAction | ISearchAction;
