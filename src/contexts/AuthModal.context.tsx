import { Dispatch, PropsWithChildren, createContext, useMemo, useReducer } from 'react';
import { useDisclosure } from '@mantine/hooks';

export type IAuthTypes = 'LOGIN' | 'SIGNUP';

export interface IAuthModalState {
	type: IAuthTypes;
	opened: boolean;
	setType: (type: IAuthTypes) => void;
	setOpened: () => void;
	setClosed: () => void;
}

export type IAuthModalAction = {
	type: IAuthTypes;
};

const initialAuthModalState: IAuthModalState = {
	opened: false,
	type: 'LOGIN',
	setClosed: () => {},
	setOpened: () => {},
	setType: () => {},
};

export const AuthModalContext = createContext<{
	state: IAuthModalState;
	dispatch: Dispatch<IAuthModalAction>;
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
				setType: (type: IAuthTypes) => {
					dispatch({ type });
				},
				setOpened,
				setClosed,
			},
		};
	}, [state, opened, setOpened, setClosed]);

	return <AuthModalContext.Provider value={authModalContextValues}>{children}</AuthModalContext.Provider>;
}
