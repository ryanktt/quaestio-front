import UpsertQuestionnaire from '@components/Questionnaire/UpsertQuestionnaire.tsx/UpsertQuestionnaire';
import Toolbar from '@components/Toolbar/Toolbar';
import Navbar from '@components/Navbar/Navbar';
import { Box, Container } from '@mantine/core';
import '@mantine/core/styles.css';

export default function HomeAdmin() {
	return (
		<Container style={{ display: 'flex', gap: '15px' }}>
			<Navbar />
			<Box display="flex" style={{ flexDirection: 'column', gap: '10px' }}>
				<Toolbar />
				<UpsertQuestionnaire />
			</Box>
		</Container>
	);
}
