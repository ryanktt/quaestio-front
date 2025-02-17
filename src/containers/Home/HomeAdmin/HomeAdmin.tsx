import Navbar from '@components/Navbar/Navbar';
import Toolbar from '@components/Toolbar/Toolbar';
import { Box, Container, rem } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren } from 'react';

export default function HomeAdmin({ children }: PropsWithChildren) {
	return (
		<Container display="flex" mih={700}>
			<Box pos="relative" w={0} h={0}>
				<Navbar />
			</Box>
			<Box display="flex" style={{ flexDirection: 'column', gap: rem(20), width: '100%' }}>
				<Toolbar />

				{children}
			</Box>
		</Container>
	);
}
