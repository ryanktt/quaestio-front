import AlertContextProvider from '@contexts/Alert/Alert.context.tsx';
import AuthModalContextProvider from '@contexts/AuthModal.context.tsx';
import GlobalContextProvider from '@contexts/Global/Global.context.tsx';
import Layout from '@hoc/Layout/Layout.tsx';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import ApolloClientProvider from './ApolloProvider.tsx';
import Router from './Router.tsx';

function App() {
	return (
		<GlobalContextProvider>
			<AlertContextProvider>
				<ApolloClientProvider>
					<AuthModalContextProvider>
						<Layout>
							<Router />
						</Layout>
					</AuthModalContextProvider>
				</ApolloClientProvider>
			</AlertContextProvider>
		</GlobalContextProvider>
	);
}

export default App;
