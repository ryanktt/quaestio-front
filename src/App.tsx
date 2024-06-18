import GlobalContextProvider from '@contexts/Global/Global.context.tsx';
import Layout from '@hoc/Layout/Layout.tsx';
import ApolloClientProvider from './ApolloProvider.tsx';
import '@mantine/core/styles.css';
import Router from './Router.tsx';
import './App.scss';

function App() {
	return (
		<GlobalContextProvider>
			<ApolloClientProvider>
				<Layout>
					<Router />
				</Layout>
			</ApolloClientProvider>
		</GlobalContextProvider>
	);
}

export default App;
