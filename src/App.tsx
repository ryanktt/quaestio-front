import { MantineProvider, createTheme } from '@mantine/core';
import Layout from '@hoc/Layout/Layout.tsx';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
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
			<MantineProvider theme={theme}>
				<Layout>
					<HomePublic />
					<h1 className='className="text-3xl font-bold text-center underline via-violet-200"'>teste</h1>
				</Layout>
			</MantineProvider>
		</ApolloProvider>
	);
}

export default App;
