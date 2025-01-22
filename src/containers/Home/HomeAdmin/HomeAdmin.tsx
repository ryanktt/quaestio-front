import Navbar from '@components/Navbar/Navbar';
import Toolbar from '@components/Toolbar/Toolbar';
import { Box, Center, Container, Title } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren } from 'react';

export default function HomeAdmin({ children }: PropsWithChildren) {
	return (
		<>
			<Center>
				<Title m={30} size={45} c="violet.8" fw={700}>
					Queztro
				</Title>
			</Center>
			<Container style={{ display: 'flex' }}>
				<Box pos="relative" w={0} h={0}>
					<Navbar />
				</Box>
				<Box display="flex" style={{ flexDirection: 'column', gap: '20px', width: '100%' }}>
					<Toolbar />

					{children}
				</Box>
			</Container>
		</>
	);
}
