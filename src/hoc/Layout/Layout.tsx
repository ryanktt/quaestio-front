import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './Layout.module.scss';
import HeaderPublic from '@components/Header/HeaderPublic/HeaderPublic.tsx';
import Footer from '@components/Footer/Footer.tsx';
import { PropsWithChildren } from 'react';
import Wrapper from './Wrapper/Wrapper.tsx';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<MantineProvider>
			<HeaderPublic />
			<Wrapper>{children}</Wrapper>
			<Footer />
		</MantineProvider>
	);
}
