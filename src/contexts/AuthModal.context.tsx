import React, { PropsWithChildren, createContext, useMemo, useReducer } from 'react';
import { useDisclosure } from '@mantine/hooks';

export type IAuthTypes = 'LOGIN' | 'SIGNUP';

export interface IAuthModalState {
	setClosed: () => void;
	setOpened: () => void;
	opened: boolean;
	type: IAuthTypes;
}

export type IAuthModalAction = {
	type: IAuthTypes;
};

const initialAuthModalState: IAuthModalState = {
	opened: false,
	type: 'LOGIN',
	setClosed: () => {},
	setOpened: () => {},
};

export const AuthModalContext = createContext<{
	state: IAuthModalState;
	dispatch: React.Dispatch<IAuthModalAction>;
}>({
	state: initialAuthModalState,
	dispatch: () => {},
});
export const AuthModalContextConsumer = AuthModalContext.Consumer;

export default function AuthModalContextProvider({ children }: PropsWithChildren) {
	const authModalReducer = (state: IAuthModalState, action: IAuthModalAction): IAuthModalState => {
		return { ...state, ...action };
	};

	const [state, dispatch] = useReducer(authModalReducer, initialAuthModalState);
	const [opened, { open: setOpened, close: setClosed }] = useDisclosure(false);

	const authModalContextValues = useMemo(() => {
		return {
			dispatch,
			state: {
				...state,
				opened,
				setOpened,
				setClosed,
			},
		};
	}, [state, opened, setOpened, setClosed]);

	return <AuthModalContext.Provider value={authModalContextValues}>{children}</AuthModalContext.Provider>;
}
