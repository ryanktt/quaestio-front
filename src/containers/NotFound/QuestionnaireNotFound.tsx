import { Box, Button, Container, Group, rem, Text, Title } from '@mantine/core';
import { IconDeviceDesktopQuestion } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.scss';

export default function QuestionnaireNotFound({ reason }: { reason: 'inactive' | '404' }) {
	return (
		<Box bg="white">
			<Container mih="100vh" className={classes.root}>
				<div className={classes.label}>
					<IconDeviceDesktopQuestion style={{ height: rem(60), width: rem(60) }} />
				</div>
				<Title className={classes.title}>
					{reason === 'inactive' ? 'The questionnaire is inactive' : 'Questionnaire not found'}
				</Title>
				<Text c="dimmed" size="lg" ta="center" className={classes.description}>
					{reason === 'inactive'
						? 'It seems the questionnaire you are looking for is inactive and no longer receiving entries. Perhaps try contacting the creator.'
						: 'Unfortunately, this is only a 404 page. You may have mistyped the questionnaire address, or it might have been deleted by its creator'}
				</Text>
				<Group justify="center">
					<Link to="/">
						<Button variant="subtle-violet" size="md">
							Quaestio Home Page
						</Button>
					</Link>
				</Group>
			</Container>
		</Box>
	);
}
