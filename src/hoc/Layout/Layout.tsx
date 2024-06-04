import '@mantine/core/styles.css';
import './Layout.module.scss';
import Footer from '@components/Footer/Footer.tsx';
import { PropsWithChildren } from 'react';
import HeaderPublic from '@components/Header/HeaderPublic/HeaderPublic.tsx';
import Wrapper from './Wrapper/Wrapper.tsx';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<>
			<HeaderPublic />
			<Wrapper>{children}</Wrapper>
			<Footer />
		</>
	);
}
