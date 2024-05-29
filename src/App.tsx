import { MantineProvider, createTheme } from '@mantine/core';
import Layout from '@hoc/Layout/Layout.tsx';
import HomePublic from './containers/Home/HomePublic/HomePublic.tsx';
import '@mantine/core/styles.css';
import './App.scss';

function App() {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.9', to: 'violet.5', deg: 25 },
	});

	return (
		<MantineProvider theme={theme}>
			<Layout>
				<HomePublic />
				<h1 className='className="text-3xl font-bold text-center underline via-violet-200"'>teste</h1>
			</Layout>
		</MantineProvider>
	);
}

export default App;
