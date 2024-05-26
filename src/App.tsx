import { MantineProvider, createTheme } from '@mantine/core';
import Layout from '@hoc/Layout/Layout.tsx';
import HomePublic from './containers/Home/HomePublic/HomePublic.tsx';
import '@mantine/core/styles.css';
import './App.scss';

function App() {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.8', to: 'blue.5' },
		colors: {
			// Add your color
			deepBlue: ['#eef3ff', '#dce4f5', '#b9c7e2', '#94a8d0', '#748dc1', '#5f7cb8', '#5474b4', '#44639f', '#39588f', '#2d4b81'],
			// or replace default theme color
			// blue: ['#eef3ff', '#dee2f2', '#bdc2de', '#98a0ca', '#7a84ba', '#6672b0', '#5c68ac', '#4c5897', '#424e88', '#364379'],
		},

		// shadows: {
		// 	md: '1px 1px 3px rgba(0, 0, 0, .25)',
		// 	xl: '5px 5px 3px rgba(0, 0, 0, .25)',
		// },
	});

	return (
		<MantineProvider theme={theme}>
			<Layout>
				<HomePublic />
			</Layout>
		</MantineProvider>
	);
}

export default App;
