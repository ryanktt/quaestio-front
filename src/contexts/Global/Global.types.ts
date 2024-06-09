import { Admin, Session } from '@utils/generated/graphql';

export type ISession = Omit<Session, 'user'>;
export type IAdmin = Omit<Admin, 'self'>;

export interface IGlobalState {
	auth: {
		user?: IAdmin;
		session?: ISession;
		isLoggedIn: boolean;
	};
	theme: {
		light: boolean;
	};
	login: (user: IAdmin, session: ISession) => void;
	logout: () => void;
	setLightMode: () => void;
	setDarkMode: () => void;
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
		session: ISession;
		user: IAdmin;
	};
}

export type IGlobalAction = ILogoutAction | ILoginAction | IDarkModeAction | ILightModeAction;
