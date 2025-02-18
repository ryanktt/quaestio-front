import AlertStack from '@components/AlertStack/AlertStack.tsx';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import Footer from '@components/Footer/Footer.tsx';
import { GlobalContext } from '@contexts/Global/Global.context';
import { Badge, Box, Button, getGradient, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { colorSchemes } from '@utils/color';
import { PropsWithChildren, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import badgeStyles from './LayoutStyles/Badge.module.scss';
import buttonStyles from './LayoutStyles/Button.module.scss';

export default function Layout({ children }: PropsWithChildren) {
	const { responseColorScheme } = useContext(GlobalContext).state.layout;
	const location = useLocation();
	const theme = useMantineTheme();

	theme.components = {
		Button: Button.extend({ classNames: buttonStyles }),
		Badge: Badge.extend({ classNames: badgeStyles }),
	};

	const isResponseScreen = location.pathname.startsWith('/questionnaire/');

	let backgroundColor = theme.colors.gray[1];
	if (isResponseScreen && responseColorScheme) {
		const [primaryColor, secondaryColor] = colorSchemes[responseColorScheme];
		backgroundColor = getGradient(
			{ deg: 30, from: theme.colors[primaryColor][7], to: theme.colors[secondaryColor][7] },
			theme,
		);
	}

	return (
		<Box h="100%" p={`${theme.spacing.lg} 0`} style={{ background: backgroundColor }}>
			<AlertStack />
			{children}
			<Footer />
			<AuthModal />
		</Box>
	);
}
