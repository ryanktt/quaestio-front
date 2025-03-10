export type IAlertTypes = 'DEFAULT' | 'ERROR' | 'SUCCESS' | 'LOADING';
export interface IAlert {
	id: string;
	type: IAlertTypes;
	message?: string;
	title?: string;
	withCloseBtn?: boolean;
	timeout?: number;
	errorCode?: string;
}

export interface IAlertState {
	alerts: {
		message?: string;
		type: IAlertTypes;
		errorCode?: string;
		title?: string;
		timeout?: number;
		id: string;
	}[];
	setAlert: (params: IAlert) => void;
	unsetAlert: (id: string) => void;
}

export interface ISetAlertAction {
	type: 'SET_ALERT';
	alert: IAlert;
}
export interface IUnsetAlertAction {
	type: 'UNSET_ALERT';
	id: string;
}
export type IAlertAction = ISetAlertAction | IUnsetAlertAction;
