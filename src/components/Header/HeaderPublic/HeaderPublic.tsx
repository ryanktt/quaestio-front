import { Group, Button, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useDisclosure } from '@mantine/hooks';
import AuthModal from '@components/AuthModal/AuthModal';
import { useContext } from 'react';
import AuthModalContext from '../../../contexts/AuthModal.context.ts';
import classes from './HeaderPublic.module.scss';

export default function HeaderPublic() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const authModalContext = useContext(AuthModalContext);

	const onSignUpClick = () => {
		authModalContext.state.setAuthModalOpened();
		authModalContext.dispatch({ authModalType: 'signup' });
	};
	const onLogInClick = () => {
		authModalContext.state.setAuthModalOpened();
		authModalContext.dispatch({ authModalType: 'login' });
	};

	return (
		<Box pb={120}>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<MantineLogo size={30} />

					<Group visibleFrom="sm">
						<Button variant="default" onClick={onLogInClick}>
							Log In
						</Button>
						<Button variant="gradient" onClick={onSignUpClick}>
							Sign Up
						</Button>
					</Group>

					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="80%"
				padding="md"
				title="Authentication"
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
			<AuthModal />
		</Box>
	);
}
