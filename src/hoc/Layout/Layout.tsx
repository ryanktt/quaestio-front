import AlertStack from '@components/AlertStack/AlertStack.tsx';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import Footer from '@components/Footer/Footer.tsx';
import Header from '@components/Header/Header';
import { Badge, Button, MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren } from 'react';
import badgeStyles from './LayoutStyles/Badge.module.scss';
import buttonStyles from './LayoutStyles/Button.module.scss';

export default function Layout({ children }: PropsWithChildren) {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.8', to: 'violet.6', deg: 50 },
		fontFamily: 'Montserrat, sans-serif',
		fontFamilyMonospace: 'Fira Code, monospace',
		headings: { fontFamily: 'Ubuntu, sans-serif' },
		components: {
			Button: Button.extend({ classNames: buttonStyles }),
			Badge: Badge.extend({ classNames: badgeStyles }),
		},
	});

	return (
		<MantineProvider theme={theme}>
			<AlertStack />
			<Header />
			{children}
			<Footer />
			<AuthModal />
		</MantineProvider>
	);
}
