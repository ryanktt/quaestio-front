import Navbar from '@components/Navbar/Navbar';
import UpsertQuestionnaire from '@components/Questionnaire/UpsertQuestionnaire/UpsertQuestionnaire';
import Toolbar from '@components/Toolbar/Toolbar';
import { Box, Container, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';

export default function HomeAdmin() {
	const theme = useMantineTheme();

	return (
		<Container style={{ display: 'flex', gap: '15px' }}>
			<Navbar />
			<Box display="flex" style={{ flexDirection: 'column', gap: '10px', width: '100%' }}>
				<Toolbar />

				<div
					style={{
						padding: theme.spacing.lg,
						boxShadow: theme.shadows.sm,
						width: '100%',
						border: '2px solid',
						borderColor: theme.colors.gray[2],
						borderRadius: theme.radius.lg,
					}}
				>
					<UpsertQuestionnaire />
				</div>
			</Box>
		</Container>
	);
}
