import { MantineProvider } from '@mantine/core';
import Layout from '@hoc/Layout/Layout.tsx';
import HomePublic from './containers/Home/HomePublic/HomePublic.tsx';
import '@mantine/core/styles.css';
import './App.scss';

function App() {
	return (
		<MantineProvider>
			<Layout>
				<HomePublic />
			</Layout>
		</MantineProvider>
	);
}

export default App;
