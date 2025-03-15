import AlertContextProvider from '@contexts/Alert/Alert.context.tsx';
import AuthModalContextProvider from '@contexts/AuthModal.context.tsx';
import GlobalContextProvider from '@contexts/Global/Global.context.tsx';
import Layout from '@hoc/Layout/Layout.tsx';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/tiptap/styles.css';
import ApolloClientProvider from './ApolloProvider.tsx';
import Router from './Router.tsx';

function App() {
	const themeConfig = createTheme({
		defaultGradient: { from: 'indigo.8', to: 'violet.6', deg: 50 },
		fontFamily: 'Montserrat, sans-serif',
		fontFamilyMonospace: 'Fira Code, monospace',
		headings: { fontFamily: 'Ubuntu, sans-serif' },
		primaryColor: 'indigo',
	});

	return (
		<GlobalContextProvider>
			<AlertContextProvider>
				<ApolloClientProvider>
					<AuthModalContextProvider>
						<MantineProvider theme={themeConfig}>
							<ModalsProvider>
								<Layout>
									<Router />
								</Layout>
							</ModalsProvider>
						</MantineProvider>
					</AuthModalContextProvider>
				</ApolloClientProvider>
			</AlertContextProvider>
		</GlobalContextProvider>
	);
}

export default App;
