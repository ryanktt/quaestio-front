import Navbar from '@components/Navbar/Navbar';
import UpsertQuestionnaire from '@components/Questionnaire/UpsertQuestionnaire.tsx/UpsertQuestionnaire';
import Toolbar from '@components/Toolbar/Toolbar';
import { Box, Container } from '@mantine/core';
import '@mantine/core/styles.css';

export default function HomeAdmin() {
	return (
		<Container style={{ display: 'flex', gap: '15px' }}>
			<Navbar />
			<Box display="flex" style={{ flexDirection: 'column', gap: '10px', width: '100%' }}>
				<Toolbar />
				<UpsertQuestionnaire />
			</Box>
		</Container>
	);
}
