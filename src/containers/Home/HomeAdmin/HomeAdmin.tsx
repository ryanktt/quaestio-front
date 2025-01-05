import '@mantine/core/styles.css';
import Navbar from '@components/Navbar/Navbar';
import { Container } from '@mantine/core';
import Toolbar from '@components/Toolbar/Toolbar';

export default function HomeAdmin() {
	return (
		<Container style={{ display: 'flex', gap: '15px' }}>
			<Navbar />
			<Toolbar />
		</Container>
	);
}
