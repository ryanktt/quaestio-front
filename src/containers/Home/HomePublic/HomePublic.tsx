import '@mantine/core/styles.css';
import AuthModal from '@components/AuthModal/AuthModal';
import { useDisclosure } from '@mantine/hooks';
import { useReducer } from 'react';
import {
	authModalReducer,
	initialAuthModalState,
	IAuthModalContextProps,
	AuthModalContextProvider,
} from '@contexts/AuthModal.context.ts';
import Layout from '@hoc/Layout/Layout';
import style from './HomePublic.module.scss';

export default function HomePublic() {
	const [authModalState, authModalDispatch] = useReducer(authModalReducer, initialAuthModalState);
	const [authModalOpened, { open: setAuthModalOpened, close: setAuthModalClosed }] = useDisclosure(false);

	const authModalContextValues: IAuthModalContextProps = {
		dispatch: authModalDispatch,
		state: {
			...authModalState,
			authModalOpened,
			setAuthModalClosed,
			setAuthModalOpened,
		},
	};

	return (
		<AuthModalContextProvider value={authModalContextValues}>
			<Layout>
				<div className={style.HomePublic}>
					<h1>A fully featured questionnaire platform</h1>
					<p>
						Create and manage questionnaires easily - Queztro provides many form features that will cover
						you in any situation.
					</p>
					<AuthModal />
				</div>
			</Layout>
		</AuthModalContextProvider>
	);
}
