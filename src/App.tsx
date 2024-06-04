import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MantineProvider, createTheme } from '@mantine/core';
import Layout from '@hoc/Layout/Layout.tsx';
import '@mantine/core/styles.css';
import { useReducer } from 'react';
import { useDisclosure } from '@mantine/hooks';
import HomePublic from './containers/Home/HomePublic/HomePublic.tsx';
import './App.scss';
import {
	authModalReducer,
	initialAuthModalState,
	IAuthModalContextProps,
	AuthModalContextProvider,
} from './contexts/AuthModal.context.ts';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.9', to: 'violet.5', deg: 25 },
	});

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
		<ApolloProvider client={client}>
			<MantineProvider theme={theme}>
				<AuthModalContextProvider value={authModalContextValues}>
					<Layout>
						<HomePublic />
						<h1 className='className="text-3xl font-bold text-center underline via-violet-200"'>teste</h1>
					</Layout>
				</AuthModalContextProvider>
			</MantineProvider>
		</ApolloProvider>
	);
}

export default App;
