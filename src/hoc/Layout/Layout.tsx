import '@mantine/core/styles.css';
import Footer from '@components/Footer/Footer.tsx';
import { PropsWithChildren } from 'react';
import HeaderPublic from '@components/Header/HeaderPublic/HeaderPublic.tsx';
import { Button, MantineProvider, createTheme } from '@mantine/core';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import AlertStack from '@components/AlertStack/AlertStack.tsx';
import classes from './Layout.module.scss';

export default function Layout({ children }: PropsWithChildren) {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.8', to: 'violet.6', deg: 50 },
		components: {
			Button: Button.extend({ classNames: classes }),
		},
	});

	return (
		<MantineProvider theme={theme}>
			<AlertStack />
			<HeaderPublic />
			{children}
			<Footer />
			<AuthModal />
		</MantineProvider>
	);
}
