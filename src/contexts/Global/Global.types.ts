import { Admin, Session } from '@utils/generated/graphql';

export type ISession = Omit<Session, 'user'>;
export type IAdmin = Omit<Admin, 'self'>;

type INoticationTypes = 'DEFAULT' | 'ERROR' | 'SUCCESS' | 'LOADING';
export interface INotification {
	message?: string;
	type?: INoticationTypes;
	title?: string;
}
export interface IAsyncNotification extends INotification {
	id: string;
	errorCode?: string;
}

export interface IGlobalState {
	auth: {
		user?: IAdmin;
		session?: ISession;
		isLoggedIn: boolean;
	};
	theme: {
		light: boolean;
	};
	notifications: {
		message?: string;
		type?: INoticationTypes;
		errorCode?: string;
		title?: string;
		time?: number;
		id?: string;
	}[];

	login: (user: IAdmin, session: ISession) => void;
	logout: () => void;
	setLightMode: () => void;
	setDarkMode: () => void;
	/** For notifiyng requests. Upserts notification */
	setAsyncNotification: (params: IAsyncNotification) => void;
	setNotification: (params: INotification) => void;
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
		user: IAdmin;
	};
}
export interface INotificationAction {
	type: 'NOTIFICATION';
	notification: INotification;
}
export interface IAsyncNotificationAction {
	type: 'ASYNC_NOTIFICATION';
	notification: IAsyncNotification;
}

export type IGlobalAction =
	| ILogoutAction
	| ILoginAction
	| IDarkModeAction
	| ILightModeAction
	| INotificationAction
	| IAsyncNotificationAction;
