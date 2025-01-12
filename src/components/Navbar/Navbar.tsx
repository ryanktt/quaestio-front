import { useContext, useEffect, useState } from 'react';
import {
	IconDeviceDesktopAnalytics,
	IconGauge,
	IconHome2,
	IconLogout,
	IconNotebook,
	IconSettings,
	IconSwitchHorizontal,
	IconUser,
} from '@tabler/icons-react';
import { Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { useSignOutMutation } from '@utils/generated/graphql';
import { GlobalContext } from '@contexts/Global/Global.context';
import { useCookies } from 'react-cookie';
import { AuthModalContext } from '@contexts/AuthModal.context';
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
					<Icon size={20} stroke={1.5} />
				</UnstyledButton>
			</Tooltip>
		</div>
	);
}

const mockdata = [
	{ icon: IconNotebook, label: 'Home' },
	{ icon: IconGauge, label: 'Dashboard' },
	{ icon: IconDeviceDesktopAnalytics, label: 'Analytics' },
	{ icon: IconUser, label: 'Account' },
	{ icon: IconSettings, label: 'Settings' },
];

export default function Navbar() {
	const globalContext = useContext(GlobalContext);
	const authModalContext = useContext(AuthModalContext);
	const [logoutMutation, { data: logoutData, reset: resetLogout }] = useSignOutMutation();
	const [, , removeCookies] = useCookies(['authData']);

	const onLogout = async () => {
		await logoutMutation();
	};

	const onChangeAccount = () => {
		authModalContext.state.setType('LOGIN');
		authModalContext.state.setOpened();
	};

	useEffect(() => {
		if (!logoutData) return;
		globalContext.state.logout();
		removeCookies('authData');
		resetLogout();
	}, [logoutData]);

	const [active, setActive] = useState(2);

	const links = mockdata.map((link, index) => (
		<NavbarLink {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
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
