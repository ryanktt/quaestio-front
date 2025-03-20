import { AuthModalContext } from '@contexts/AuthModal.context.tsx';
import { GlobalContext } from '@contexts/Global/Global.context';
import { Box, Button, Container, Group } from '@mantine/core';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';

export default function Header() {
	const authModalState = useContext(AuthModalContext).state;
	const { isLoggedIn } = useContext(GlobalContext).state.auth;
	const navigate = useNavigate();

	const onLogInClick = () => {
		authModalState.setOpened();
		authModalState.setType('LOGIN');
	};

	const onGoToQuestionnaires = () => {
		navigate('/board/questionnaires');
		window.scrollTo(0, 0);
	};

	return (
		<Box pb={100}>
			<header className={`${classes.header} ${isLoggedIn ? classes.loggedIn : null}`}>
				<Container>
					<Group justify="space-between" h="100%">
						<p className={classes.quaestio}>Quaestio</p>

						<Group>
							{!isLoggedIn ? (
								<Button variant="default" onClick={onLogInClick}>
									Log In
								</Button>
							) : (
								<Button variant="default" onClick={onGoToQuestionnaires}>
									Home
								</Button>
							)}
						</Group>
					</Group>
				</Container>
			</header>
		</Box>
	);
}
