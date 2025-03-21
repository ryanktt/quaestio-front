import Header from '@components/Header/Header';
import { AuthModalContext } from '@contexts/AuthModal.context';
import { GlobalContext } from '@contexts/Global/Global.context';
import { Box, Button, Container, Flex, Text as MantineText, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { PropsWithChildren, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePublic.module.scss';

function Text({ children }: PropsWithChildren) {
	return (
		<MantineText size="xl" fw={500} c="dark.5">
			{children}
		</MantineText>
	);
}

export default function HomePublic() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;
	const authModalState = useContext(AuthModalContext).state;
	const theme = useMantineTheme();
	const navigate = useNavigate();

	const onGoToQuestionnaires = () => {
		navigate('/board/questionnaires');
	};

	const onGetStarted = () => {
		authModalState.setType('SIGNUP');
		authModalState.setOpened();
	};

	return (
		<Box w="100%" mih="100vh" bg={theme.white}>
			<Header />
			<Container className={styles.container}>
				<Flex className={styles.heading}>
					<Flex wrap="wrap">
						<Title size={45} mr={10}>
							Your all in one
						</Title>
						<Title size={45} className={styles.platform}>
							Questionnaire Platform
						</Title>
					</Flex>
					<Text>
						Create and manage questionnaires easily - Quaestio provides many form features and
						customizations that will cover you in any situation.
					</Text>

					<Flex>
						{!isLoggedIn ? (
							<Button onClick={onGetStarted} size="lg" variant="gradient" radius="md">
								Get Started
							</Button>
						) : (
							<Button onClick={onGoToQuestionnaires} size="lg" variant="gradient" radius="md">
								My Questionnaires
							</Button>
						)}
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
