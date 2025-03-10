import { AuthModalContext } from '@contexts/AuthModal.context';
import { GlobalContext } from '@contexts/Global/Global.context';
import { useSignOutMutation } from '@gened/graphql';
import { rem, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import {
	IconFilePlus,
	IconFiles,
	IconFileStack,
	IconHome2,
	IconLogout,
	IconSwitchHorizontal,
} from '@tabler/icons-react';
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Navbar.module.scss';

interface NavbarLinkProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	return (
		<div>
			<Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
				<UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
					<Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
				</UnstyledButton>
			</Tooltip>
		</div>
	);
}

const mockdata = [
	{ icon: IconFilePlus, label: 'Create questionnaire', path: '/board/questionnaire/create' },
	{ icon: IconFiles, label: 'Questionnaires', path: '/board/questionnaires' },
	{ icon: IconFileStack, label: 'Entries', path: '/board/responses' },
];

export default function Navbar() {
	const globalContext = useContext(GlobalContext);
	const authModalContext = useContext(AuthModalContext);
	const [logoutMutation, { data: logoutData, reset: resetLogout }] = useSignOutMutation();
	const [, , removeCookies] = useCookies(['authData']);
	const location = useLocation();
	const navigate = useNavigate();

	const onLogout = async () => {
		await logoutMutation();
		navigate('/');
	};

	const onChangeAccount = () => {
		authModalContext.state.setType('LOGIN');
		authModalContext.state.setOpened();
	};

	useEffect(() => {
		if (!logoutData) return;
		removeCookies('authData');
		globalContext.state.logout();
		resetLogout();
	}, [logoutData]);

	const links = mockdata.map((link) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={location.pathname === link.path}
			onClick={() => {
				navigate(link.path);
			}}
		/>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes['navbar-main']}>
				<Stack justify="center" gap={0}>
					{links}
				</Stack>
			</div>
			<Stack justify="center" gap={0}>
				<NavbarLink icon={IconSwitchHorizontal} onClick={onChangeAccount} label="Change account" />
				<NavbarLink icon={IconLogout} onClick={onLogout} label="Logout" />
			</Stack>
		</nav>
	);
}
