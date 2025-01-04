import '@mantine/core/styles.css';
import './Layout.module.scss';
import Footer from '@components/Footer/Footer.tsx';
import { PropsWithChildren } from 'react';
import HeaderPublic from '@components/Header/HeaderPublic/HeaderPublic.tsx';
import { MantineProvider, createTheme } from '@mantine/core';
import AuthModalContextProvider from '@contexts/AuthModal.context.tsx';
import AuthModal from '@components/AuthModal/AuthModal.tsx';
import Wrapper from './Wrapper/Wrapper.tsx';

export default function Layout({ children }: PropsWithChildren) {
	const theme = createTheme({
		defaultGradient: { from: 'indigo.9', to: 'violet.5', deg: 25 },
	});

	return (
		<AuthModalContextProvider>
			<MantineProvider theme={theme}>
				<HeaderPublic />
				<Wrapper>{children}</Wrapper>
				<Footer />
				<AuthModal />
			</MantineProvider>
		</AuthModalContextProvider>
	);
}
