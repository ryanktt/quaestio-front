import { Box, Button, Container, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.scss';

export default function NotFound() {
	return (
		<Box bg="white">
			<Container mih="100vh" className={classes.root}>
				<div className={classes.label}>404</div>
				<Title className={classes.title}>You have found a secret place</Title>
				<Text c="dimmed" size="lg" ta="center" className={classes.description}>
					Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
					been moved to another URL
				</Text>
				<Group justify="center">
					<Link to="/">
						<Button variant="subtle-violet" size="md">
							Take me back to home page
						</Button>
					</Link>
				</Group>
			</Container>
		</Box>
	);
}
