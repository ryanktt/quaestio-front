import AlertStack from '@components/AlertStack/AlertStack.tsx';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import Footer from '@components/Footer/Footer.tsx';
import { GlobalContext } from '@contexts/Global/Global.context';
import { Badge, Box, Button, getGradient, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IColorSchemes, colorSchemes } from '@utils/color';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import badgeStyles from './LayoutStyles/Badge.module.scss';
import buttonStyles from './LayoutStyles/Button.module.scss';

export default function Layout({ children }: PropsWithChildren) {
	const { responseBgColor } = useContext(GlobalContext).state.layout;
	const location = useLocation();
	const theme = useMantineTheme();

	theme.components = {
		Button: Button.extend({ classNames: buttonStyles }),
		Badge: Badge.extend({ classNames: badgeStyles }),
	};

	const defaultBgColor = theme.colors.indigo[0];
	const [backgroundColor, setBackgroundColor] = useState(defaultBgColor);

	useEffect(() => {
		const isResponseScreen = location.pathname.startsWith('/questionnaire/');
		if (isResponseScreen && responseBgColor) {
			if (!Object.keys(colorSchemes).includes(responseBgColor)) {
				if (responseBgColor === 'white') return;
				setBackgroundColor(theme.colors.dark[7]);
				return;
			}
			const [primaryColor, secondaryColor] = colorSchemes[responseBgColor as IColorSchemes];
			setBackgroundColor(
				getGradient(
					{ deg: 30, from: theme.colors[primaryColor][6], to: theme.colors[secondaryColor][6] },
					theme,
				),
			);
		} else {
			setBackgroundColor(defaultBgColor);
		}
	}, [responseBgColor, location.pathname]);

	return (
		<Box mih="100vh" style={{ background: backgroundColor }}>
			<AlertStack />
			<Box>{children}</Box>
			<Footer />
			<AuthModal />
		</Box>
	);
}
