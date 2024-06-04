import { IAuthTypes } from '@components/Auth/Auth';
import React, { createContext } from 'react';

export interface IAuthModalState {
	setAuthModalClosed: () => void;
	setAuthModalOpened: () => void;
	authModalOpened: boolean;
	authModalType: IAuthTypes;
}
export type IAuthModalAction = {
	authModalType: IAuthTypes;
};

export interface IAuthModalContextProps {
	state: IAuthModalState;
	dispatch: React.Dispatch<IAuthModalAction>;
}

export const authModalReducer = (state: IAuthModalState, action: IAuthModalAction): IAuthModalState => {
	return { ...state, ...action };
};

export const initialAuthModalState: IAuthModalState = {
	authModalOpened: false,
	authModalType: 'login',
	setAuthModalClosed: () => {},
	setAuthModalOpened: () => {},
};

const AuthModalContext = createContext<IAuthModalContextProps>({
	state: initialAuthModalState,
	dispatch: () => {},
});

export const AuthModalContextConsumer = AuthModalContext.Consumer;
export const AuthModalContextProvider = AuthModalContext.Provider;
export default AuthModalContext;
