import AlertStack from '@components/AlertStack/AlertStack.tsx';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import Footer from '@components/Footer/Footer.tsx';
import { Badge, Box, Button, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import badgeStyles from './LayoutStyles/Badge.module.scss';
import buttonStyles from './LayoutStyles/Button.module.scss';

export default function Layout({ children }: PropsWithChildren) {
	const location = useLocation();
	const theme = useMantineTheme();

	theme.components = {
		Button: Button.extend({ classNames: buttonStyles }),
		Badge: Badge.extend({ classNames: badgeStyles }),
	};

	const getBackgroudColor = () => {
		const path = location.pathname;
		if (path.startsWith('/questionnaire/')) {
			return `linear-gradient(50deg, ${theme.colors.indigo[8]} 0%, ${theme.colors.violet[7]} 100%)`;
		}
		return 'gray.0';
	};

	return (
		<Box bg={getBackgroudColor()}>
			<AlertStack />
			{children}
			<Footer />
			<AuthModal />
		</Box>
	);
}
