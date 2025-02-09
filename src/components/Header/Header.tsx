import { AuthModalContext } from '@contexts/AuthModal.context.tsx';
import { GlobalContext } from '@contexts/Global/Global.context';
import { Box, Burger, Button, Container, Drawer, Group, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import classes from './Header.module.scss';

export default function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const authModalState = useContext(AuthModalContext).state;
	const { isLoggedIn } = useContext(GlobalContext).state.auth;

	const onSignUpClick = () => {
		authModalState.setOpened();
		authModalState.setType('SIGNUP');
	};
	const onLogInClick = () => {
		authModalState.setOpened();
		authModalState.setType('LOGIN');
	};

	return (
		<Box pb={100}>
			<header className={`${classes.header} ${isLoggedIn ? classes.loggedIn : null}`}>
				<Container size="lg">
					<Group justify="space-between" h="100%">
						<p className={classes.quaestio}>Quaestio</p>

						{!isLoggedIn ? (
							<>
								<Group visibleFrom="sm">
									<Button variant="default" onClick={onLogInClick}>
										Log In
									</Button>
									<Button variant="gradient" onClick={onSignUpClick}>
										Sign Up
									</Button>
								</Group>
								<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
							</>
						) : null}
					</Group>
				</Container>
			</header>

			{!isLoggedIn ? (
				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					size="80%"
					padding="md"
					hiddenFrom="sm"
					zIndex={200}
				>
					<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
						<Group justify="center" grow pb="xl" px="md">
							<Button variant="default" onClick={onLogInClick}>
								Log In
							</Button>
							<Button variant="gradient" onClick={onSignUpClick}>
								Sign Up
							</Button>
						</Group>
					</ScrollArea>
				</Drawer>
			) : null}
		</Box>
	);
}
