import GlobalContextProvider from '@contexts/Global/Global.context.tsx';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
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
			<GlobalContextProvider>
				<Layout>
					<Router />
				</Layout>
			</GlobalContextProvider>
		</ApolloProvider>
	);
}

export default App;
