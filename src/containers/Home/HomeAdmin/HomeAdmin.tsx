import '@mantine/core/styles.css';
import Navbar from '@components/Navbar/Navbar';
import { Box, Container } from '@mantine/core';
import Toolbar from '@components/Toolbar/Toolbar';
import NewQuestionnaire from '@components/Questionnaire/NewQuestionnaire';

export default function HomeAdmin() {
	return (
		<Container style={{ display: 'flex', gap: '15px' }}>
			<Navbar />
			<Box w="100%" display="flex" style={{ flexDirection: 'column', gap: '10px' }}>
				<Toolbar />
				<NewQuestionnaire />
			</Box>
		</Container>
	);
}
