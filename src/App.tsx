import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import GlobalStateProvider from '@contexts/Global.context.tsx';
import Layout from '@hoc/Layout/Layout.tsx';
import '@mantine/core/styles.css';
import Router from './Router.tsx';
import './App.scss';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<GlobalStateProvider>
				<Layout>
					<Router />
				</Layout>
			</GlobalStateProvider>
		</ApolloProvider>
	);
}

export default App;
