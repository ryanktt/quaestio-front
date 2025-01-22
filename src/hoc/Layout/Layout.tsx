import '@mantine/core/styles.css';
import Footer from '@components/Footer/Footer.tsx';
import { PropsWithChildren } from 'react';
import { Button, MantineProvider, createTheme } from '@mantine/core';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import AlertStack from '@components/AlertStack/AlertStack.tsx';
import buttonStyles from './LayoutStyles/Button.module.scss';
import badgeStyles from './LayoutStyles/Badge.module.scss';

export default function Layout({ children }: PropsWithChildren) {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.8', to: 'violet.6', deg: 50 },
		fontFamily: 'Montserrat, sans-serif',
		fontFamilyMonospace: 'Fira Code, monospace',
		components: {
			Button: Button.extend({ classNames: buttonStyles }),
			Badge: Button.extend({ classNames: badgeStyles }),
		},
	});

	return (
		<MantineProvider theme={theme}>
			<AlertStack />

			{children}
			<Footer />
			<AuthModal />
		</MantineProvider>
	);
}
