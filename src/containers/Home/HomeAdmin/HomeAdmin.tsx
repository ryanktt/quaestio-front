import Navbar from '@components/Navbar/Navbar';
import Toolbar from '@components/Toolbar/Toolbar';
import { Box, Container } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren } from 'react';

export default function HomeAdmin({ children }: PropsWithChildren) {
	return (
		<Container style={{ display: 'flex', gap: '15px' }}>
			<Navbar />
			<Box display="flex" style={{ flexDirection: 'column', gap: '10px', width: '100%' }}>
				<Toolbar />

				{children}
			</Box>
		</Container>
	);
}
