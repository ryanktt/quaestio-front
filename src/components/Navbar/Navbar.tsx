import { AuthModalContext } from '@contexts/AuthModal.context';
import { GlobalContext } from '@contexts/Global/Global.context';
import { useSignOutMutation } from '@gened/graphql';
import { rem, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { IconFilePlus, IconHome2, IconLogout, IconNotebook, IconSwitchHorizontal } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
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
	{ icon: IconNotebook, label: 'Home', path: '/board/questionnaires' },
	{ icon: IconFilePlus, label: 'Create questionnaire', path: '/board/questionnaire/create' },
];

export default function Navbar() {
	const globalContext = useContext(GlobalContext);
	const authModalContext = useContext(AuthModalContext);
	const [logoutMutation, { data: logoutData, reset: resetLogout }] = useSignOutMutation();
	const [, , removeCookies] = useCookies(['authData']);
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

	const [active, setActive] = useState(2);

	const links = mockdata.map((link, index) => (
		<NavbarLink
			{...link}
			key={link.label}
			active={index === active}
			onClick={() => {
				navigate(link.path);
				setActive(index);
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
