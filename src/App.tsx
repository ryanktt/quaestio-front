import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { MantineProvider, createTheme } from '@mantine/core';
import GlobalStateProvider from '@contexts/Global.context.tsx';
import HomePublic from './containers/Home/HomePublic/HomePublic.tsx';
import '@mantine/core/styles.css';
import './App.scss';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.9', to: 'violet.5', deg: 25 },
	});

	return (
		<ApolloProvider client={client}>
			<GlobalStateProvider>
				<MantineProvider theme={theme}>
					<HomePublic />
				</MantineProvider>
			</GlobalStateProvider>
		</ApolloProvider>
	);
}

export default App;
