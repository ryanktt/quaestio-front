import { IAsyncNotificationAction, IGlobalAction, IGlobalState } from './Global.types.ts';

export const handleAsyncNotification = (state: IGlobalState, action: IAsyncNotificationAction): IGlobalState => {
	const notificationIndex = state.notifications.findIndex(({ id }) => id === action.notification.id);
	const updatedNotifications = state.notifications;
	if (notificationIndex !== -1) updatedNotifications[notificationIndex] = action.notification;
	else updatedNotifications.push(action.notification);

	return { ...state, notifications: updatedNotifications };
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
		case 'NOTIFICATION':
			return {
				...state,
				notifications: [...state.notifications, action.notification],
			};
		case 'ASYNC_NOTIFICATION':
			return handleAsyncNotification(state, action);
		default:
			return state;
	}
};

export default globalReducer;
