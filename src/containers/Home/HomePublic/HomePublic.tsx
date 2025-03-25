/* eslint-disable no-underscore-dangle */
import Header from '@components/Header/Header';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm';
import QuestionMetricsAccordion from '@components/Questionnaire/QuestionMetrics/QuestionMetricsAccordion';
import {
	EQuestionnaireType,
	QuestionMetricsTypes,
	QuestionTypes,
} from '@components/Questionnaire/Questionnaire.interface';
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm';
import QuestionResponseForm from '@components/Response/ResponseForm/QuestionResponseForm';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm';
import { buildQuestionFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux';
import { MetricsCard } from '@containers/Questionnaire/QuestionnaireAnalytics/QuestionnaireAnalytics';
import { AuthModalContext } from '@contexts/AuthModal.context';
import { GlobalContext } from '@contexts/Global/Global.context';
import {
	ByRatingMetrics,
	Option,
	OptionMetrics,
	QuestionMultipleChoice,
	QuestionMultipleChoiceMetrics,
	QuestionnaireType,
	QuestionRating,
	QuestionRatingMetrics,
	QuestionSingleChoice,
	QuestionSingleChoiceMetrics,
	QuestionText,
	QuestionTextMetrics,
	QuestionTrueOrFalse,
	QuestionTrueOrFalseMetrics,
	QuestionType,
} from '@gened/graphql';
import {
	Box,
	Button,
	Container,
	Flex,
	getGradient,
	Group,
	MantineColor,
	MantineSize,
	Text as MantineText,
	rem,
	Title,
	useMantineTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { IconClock, IconFileArrowRight, IconFileCheck } from '@tabler/icons-react';
import { colorSchemes, IColorSchemes } from '@utils/color';
import { nanoid } from 'nanoid/non-secure';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePublic.module.scss';

type PartialQuestion<T extends QuestionTypes> = Omit<Partial<T>, 'options'> & { options?: Partial<Option>[] };
type PartialQuestionMetrics<T extends QuestionMetricsTypes> = Omit<Partial<T>, 'options' | 'byRating'> & {
	options?: Partial<OptionMetrics>[];
	byRating?: Partial<ByRatingMetrics>[];
};

const questionSingleChoice: PartialQuestion<QuestionSingleChoice> = {
	_id: '1',
	description: '<p>Choose an option</p>',
	type: QuestionType.SingleChoice,
	showCorrectAnswer: true,
	randomizeOptions: false,
	required: true,
	options: [
		{
			title: 'A',
			_id: '1',
			correct: false,
		},
		{
			title: 'B',
			_id: '2',
			correct: true,
		},
		{
			title: 'C',
			_id: '3',
			correct: false,
		},
		{
			title: 'D',
			_id: '4',
			correct: false,
		},
	],
};
const questionSingleChoiceMetrics: PartialQuestionMetrics<QuestionSingleChoiceMetrics> = {
	_id: '1',
	rightAnswerCount: 80,
	wrongAnswerCount: 20,
	unansweredCount: 15,
	answerCount: 100,
	type: QuestionType.SingleChoice,
	options: [
		{ _id: '1', selectedCount: 5 },
		{ _id: '2', selectedCount: 80 },
		{ _id: '3', selectedCount: 5 },
		{ _id: '4', selectedCount: 10 },
	],
};
const questionSingleChoiceProps: IQuestionProps = buildQuestionFormProps(
	questionSingleChoice as QuestionTypes,
);
const singleChoice = (
	<QuestionResponseForm
		badgeLabel="single choice"
		questionnaireType={EQuestionnaireType.Survey}
		onError={() => {}}
		onChange={() => {}}
		showErrors={false}
		colorScheme="indigo"
		question={questionSingleChoiceProps}
	/>
);

const questionMultipleChoice: PartialQuestion<QuestionMultipleChoice> = {
	_id: '2',
	description: '<p>Choose from these options</p>',
	type: QuestionType.MultipleChoice,
	showCorrectAnswer: true,
	randomizeOptions: false,
	required: true,
	options: [
		{
			title: 'A',
			_id: '1',
			correct: false,
		},
		{
			title: 'B',
			_id: '2',
			correct: false,
		},
		{
			title: 'C',
			_id: '3',
			correct: true,
		},
		{
			title: 'D',
			_id: '4',
			correct: false,
		},
	],
};
const questionMultipleChoiceMetrics: PartialQuestionMetrics<QuestionMultipleChoiceMetrics> = {
	_id: '2',
	rightAnswerCount: 60,
	wrongAnswerCount: 50,
	unansweredCount: 5,
	answerCount: 110,
	type: QuestionType.MultipleChoice,
	options: [
		{ _id: '1', selectedCount: 25 },
		{ _id: '2', selectedCount: 20 },
		{ _id: '3', selectedCount: 60 },
		{ _id: '4', selectedCount: 5 },
	],
};
const questionMultipleChoiceProps: IQuestionProps = buildQuestionFormProps(
	questionMultipleChoice as QuestionTypes,
);
const multipleChoice = (
	<QuestionResponseForm
		badgeLabel="multiple choice"
		questionnaireType={EQuestionnaireType.Survey}
		onError={() => {}}
		onChange={() => {}}
		showErrors={false}
		colorScheme="indigo"
		question={questionMultipleChoiceProps}
	/>
);

const questionTrueOrFalse: PartialQuestion<QuestionTrueOrFalse> = {
	_id: '3',
	description: '<p>Yes or No?</p>',
	type: QuestionType.TrueOrFalse,
	showCorrectAnswer: true,
	required: true,
	options: [
		{
			title: 'Yes',
			_id: '1',
			true: true,
			correct: true,
		},
		{
			title: 'No',
			_id: '2',
			true: false,
			correct: false,
		},
	],
};
const questionTrueOrFalseMetrics: PartialQuestionMetrics<QuestionTrueOrFalseMetrics> = {
	_id: '3',
	rightAnswerCount: 80,
	wrongAnswerCount: 10,
	unansweredCount: 15,
	answerCount: 90,
	type: QuestionType.TrueOrFalse,
	options: [
		{ _id: '1', selectedCount: 80 },
		{ _id: '2', selectedCount: 10 },
	],
};
const questionTrueOrFalseProps: IQuestionProps = buildQuestionFormProps(questionTrueOrFalse as QuestionTypes);
const trueOrFalse = (
	<QuestionResponseForm
		badgeLabel="true or false"
		questionnaireType={EQuestionnaireType.Survey}
		onError={() => {}}
		onChange={() => {}}
		showErrors={false}
		colorScheme="indigo"
		question={questionTrueOrFalseProps}
	/>
);

const questionRating: PartialQuestion<QuestionRating> = {
	_id: '4',
	description: '<p>Rate us!</p>',
	type: QuestionType.Rating,
	showCorrectAnswer: true,
	required: true,
	options: [],
};
const questionRatingMetrics: PartialQuestionMetrics<QuestionRatingMetrics> = {
	_id: '4',
	unansweredCount: 0,
	answerCount: 115,
	avgRating: 3.87,
	byRating: [
		{
			rating: 1,
			selectedCount: 5,
		},
		{
			rating: 2,
			selectedCount: 15,
		},
		{
			rating: 3,
			selectedCount: 20,
		},
		{
			rating: 4,
			selectedCount: 25,
		},
		{
			rating: 5,
			selectedCount: 50,
		},
	],
	type: QuestionType.Rating,
};
const questionRatingProps: IQuestionProps = buildQuestionFormProps(questionRating as QuestionTypes);
const rating = (
	<QuestionResponseForm
		badgeLabel="rating"
		questionnaireType={EQuestionnaireType.Survey}
		onError={() => {}}
		onChange={() => {}}
		showErrors={false}
		colorScheme="indigo"
		question={questionRatingProps}
	/>
);

const questionText: PartialQuestion<QuestionText> = {
	_id: '5',
	description: "<p>We'd like to know your thoughts</p>",
	type: QuestionType.Text,
	feedbackAfterSubmit: '',
	showCorrectAnswer: true,
	required: true,
	options: [],
};
const questionTextMetrics: PartialQuestionMetrics<QuestionTextMetrics> = {
	_id: '5',
	unansweredCount: 40,
	answerCount: 75,
	type: QuestionType.Text,
};
const questionTextProps: IQuestionProps = buildQuestionFormProps(questionText as QuestionTypes);
const text = (
	<QuestionResponseForm
		badgeLabel="text"
		questionnaireType={EQuestionnaireType.Survey}
		onError={() => {}}
		onChange={() => {}}
		showErrors={false}
		colorScheme="indigo"
		question={questionTextProps}
	/>
);

const getAvgScore = () => {
	const totalRightAnswerCount = [
		questionSingleChoiceMetrics,
		questionMultipleChoiceMetrics,
		questionTrueOrFalseMetrics,
	].reduce((acc, questionMetrics) => {
		if ('rightAnswerCount' in questionMetrics) return acc + (questionMetrics.rightAnswerCount || 0);
		return acc;
	}, 0);

	return totalRightAnswerCount / 115;
};

function Form({ color, index, mobile }: { color: IColorSchemes; index: number; mobile: boolean }) {
	const theme = useMantineTheme();
	const [primaryColor, secondaryColor] = colorSchemes[color];

	return (
		<Box
			w={mobile ? 320 : 340}
			mah={650 + index * 5}
			p={theme.spacing.sm}
			style={{
				zIndex: index,
				...(mobile
					? {
							top: `${index * 4}%`,
							left: '50%',
							transform: 'translate(-50%,0)',
						}
					: {
							transform: `translate(${index * 5}%, 0)`,
							top: rem(-index * 2),
							right: `${index * 10}%`,
							boxShadow: theme.shadows.xl,
						}),
				display: 'flex',
				position: 'absolute',
				overflow: 'hidden',
				borderRadius: theme.radius.lg,
			}}
			bg={getGradient(
				{
					deg: 30,
					from: theme.colors[primaryColor][6],
					to: theme.colors[secondaryColor][6],
				},
				theme,
			)}
		>
			<ResponseForm
				readMode
				colorScheme={color}
				questionnaireProps={{
					active: true,
					color,
					bgColor: null,
					description:
						'<p>Quaestio enables fully customizable forms that will fit your unique style needs</p>',
					title: 'Seeking answers!?',
					type: EQuestionnaireType.Survey,
					maxRetryAmount: '',
					randomizeQuestions: false,
					requireEmail: false,
					requireName: false,
					timeLimit: '',
					questions: [
						{ ...questionSingleChoiceProps, id: nanoid() },
						{ ...questionMultipleChoiceProps, id: nanoid() },
						{ ...questionTrueOrFalseProps, id: nanoid() },
						{ ...questionTextProps, id: nanoid() },
						{ ...questionRatingProps, id: nanoid() },
					],
				}}
			/>
		</Box>
	);
}

function Forms() {
	const theme = useMantineTheme();
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	const mobile = viewportWidth < 600;

	return (
		<Container
			p={`${theme.spacing.md} 0`}
			display="flex"
			h={mobile ? 1000 : 700}
			style={{ justifyContent: 'left', borderRadius: theme.radius.lg }}
		>
			<Flex
				pos="relative"
				style={{ borderRadius: theme.radius.lg }}
				bg="indigo.1"
				h={mobile ? 950 : 650}
				direction="row-reverse"
				w="100vw"
			>
				<Form color="yellow" index={1} mobile={mobile} />
				<Form color="green" index={2} mobile={mobile} />
				<Form color="red" index={3} mobile={mobile} />
				<Form color="pink" index={4} mobile={mobile} />
				<Form color="blue" index={5} mobile={mobile} />
				<Form color="indigo" index={6} mobile={mobile} />
			</Flex>
		</Container>
	);
}

function Text({ children, size, color }: PropsWithChildren & { size?: MantineSize; color?: MantineColor }) {
	return (
		<MantineText size={size || 'xl'} c={color || 'dark.5'} fw={500}>
			{children}
		</MantineText>
	);
}

function QuestionResponseWrapper({ children }: PropsWithChildren) {
	return (
		<Box miw={300} maw={380}>
			{children}
		</Box>
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
		<Box bg="white">
			<Header />
			<Box w="100%" mih="100vh" className={styles.sections}>
				<Box w="100%" className={styles.container} mt={50}>
					<Container style={{ display: 'flex', flexDirection: 'column' }}>
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
								Create and manage questionnaires easily - Quaestio provides many form features
								and customizations that will cover you in any situation.
							</Text>

							<Flex>
								{!isLoggedIn ? (
									<Button onClick={onGetStarted} size="lg" variant="gradient" radius="md">
										Get Started
									</Button>
								) : (
									<Button
										onClick={onGoToQuestionnaires}
										size="lg"
										variant="gradient"
										radius="md"
									>
										My Questionnaires
									</Button>
								)}
							</Flex>
						</Flex>
					</Container>
				</Box>

				<Box className={styles.container}>
					<Container>
						<Title mb="xl">Personalization</Title>
						<Forms />
					</Container>
				</Box>

				<Box
					className={styles.container}
					pt={rem(80)}
					pb={rem(80)}
					bg={getGradient({ deg: 30, from: 'indigo.6', to: 'violet.6' }, theme)}
				>
					<Container
						p="lg"
						display="flex"
						style={{
							borderRadius: theme.radius.lg,
							flexDirection: 'column',
						}}
					>
						<Box pb="xl">
							<Title size={30} c={theme.white} mb="xs">
								Question Types
							</Title>
							<Text color="gray.0">Customize your form with 5 different question types</Text>
						</Box>
						<Group grow preventGrowOverflow={false}>
							<QuestionResponseWrapper>{singleChoice}</QuestionResponseWrapper>
							<QuestionResponseWrapper>{multipleChoice}</QuestionResponseWrapper>
							<QuestionResponseWrapper>{trueOrFalse}</QuestionResponseWrapper>
							<QuestionResponseWrapper>{text}</QuestionResponseWrapper>
							<QuestionResponseWrapper>{rating}</QuestionResponseWrapper>
						</Group>
					</Container>
				</Box>

				<Box className={styles.container}>
					<Container
						bg="white"
						style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}
					>
						<Box mb={theme.spacing.md}>
							<Title size={30} c="dark.8" mb="xs">
								Metrics
							</Title>
							<Text color="dark.6">Keep up with client responses in real time</Text>
						</Box>
						<Group grow preventGrowOverflow={false}>
							<MetricsCard
								label="Responses"
								stats="115"
								color="pink"
								icon={IconFileArrowRight}
							/>
							<MetricsCard
								label="Avg Score"
								stats={`${getAvgScore().toFixed(1)}/3`}
								color="orange"
								icon={IconFileCheck}
							/>
							<MetricsCard
								label="Avg Answer Time"
								stats="1.3 min"
								color="teal"
								icon={IconClock}
							/>
						</Group>
						<Box>
							<QuestionMetricsAccordion
								questionnaireType={QuestionnaireType.QuestionnaireQuiz}
								questions={[
									questionSingleChoice as QuestionSingleChoice,
									questionMultipleChoice as QuestionMultipleChoice,
									questionTrueOrFalse as QuestionTrueOrFalse,
									questionText as QuestionText,
									questionRating as QuestionRating,
								]}
								questionMetrics={[
									questionSingleChoiceMetrics as QuestionSingleChoiceMetrics,
									questionMultipleChoiceMetrics as QuestionMultipleChoiceMetrics,
									questionTrueOrFalseMetrics as QuestionTrueOrFalseMetrics,
									questionTextMetrics as QuestionTextMetrics,
									questionRatingMetrics as QuestionRatingMetrics,
								]}
							/>
						</Box>
					</Container>
				</Box>
				<Box
					className={styles.container}
					bg={getGradient({ deg: 90, from: 'indigo.0', to: 'violet.0' }, theme)}
				>
					<Container
						pb="md"
						style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}
					>
						<Box miw={300} w="70%">
							<Title size={30} c="dark.8" mb="xs">
								Complete Form Control
							</Title>
							<Text color="dark.7">
								With a simple and easy to use interface. Quaestio provides an array of
								settings that allows for full form control. Try it out!
							</Text>
						</Box>

						<QuestionnaireForm readMode title="Preview Form" onSubmit={async () => {}} />
					</Container>
				</Box>
			</Box>
		</Box>
	);
}
