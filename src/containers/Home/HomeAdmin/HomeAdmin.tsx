import Navbar from '@components/Navbar/Navbar';
import { Box, Container, rem, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren } from 'react';

export default function HomeAdmin({ children }: PropsWithChildren) {
	const theme = useMantineTheme();
	return (
		<Container display="flex" mih={700} p={0} pt={theme.spacing.xl}>
			<Box pos="fixed" w={0} h={0}>
				<Navbar />
			</Box>
			<Box display="flex" style={{ flexDirection: 'column', gap: rem(20), width: '100%' }}>
				{/* <Toolbar /> */}

				{children}
			</Box>
		</Container>
	);
}
