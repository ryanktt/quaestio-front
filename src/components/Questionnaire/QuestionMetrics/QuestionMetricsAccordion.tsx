/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
import {
	ByRatingMetrics,
	Question,
	QuestionMultipleChoiceMetrics,
	QuestionnaireType,
	QuestionRatingMetrics,
	QuestionSingleChoiceMetrics,
	QuestionTextMetrics,
	QuestionTrueOrFalseMetrics,
	QuestionType,
} from '@gened/graphql';
import {
	Box,
	Center,
	Flex,
	getGradient,
	Group,
	Rating,
	rem,
	Stack,
	Text,
	Title,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { createMarkup } from '@utils/html';
import { getPercentage } from '@utils/number.ts';
import _ from 'lodash';
import { ReactNode, useMemo, useState } from 'react';
import OptionMetricsList from '../OptionMetrics/OptionMetrics.tsx';
import { QuestionTypes } from '../Questionnaire.interface.ts';
import DonutChart from './DonutChart.tsx';
import styles from './QuestionMetricsAccordion.module.scss';

type QuestionMetricsTypes =
	| QuestionTextMetrics
	| QuestionTrueOrFalseMetrics
	| QuestionMultipleChoiceMetrics
	| QuestionSingleChoiceMetrics
	| QuestionRatingMetrics;

function Ratings({ byRating, reviewCount }: { byRating: ByRatingMetrics[]; reviewCount: number }) {
	const theme = useMantineTheme();

	return (
		<Stack bg="var(--mantine-color-body)" align="stretch" justify="center" gap={0}>
			{_.orderBy(byRating, ['rating'], ['desc']).map(({ rating, selectedCount }) => (
				<Flex
					style={{
						borderTop: `1px solid ${theme.colors.gray[3]}`,
						background: getGradient({ deg: 1, from: 'gray.0', to: 'white' }, theme),
					}}
					p={`${rem(8)} ${theme.spacing.lg}`}
					gap={10}
				>
					<Rating styles={{ label: { marginRight: rem(10) } }} value={rating} size={20} />
					<Text c="gray.8" fw={500} size="sm" w={38}>
						{getPercentage(selectedCount, 0, reviewCount).toFixed(0)}%
					</Text>
					<Text c="gray.7" size="sm">
						{selectedCount} selections
					</Text>
				</Flex>
			))}
		</Stack>
	);
}

function MetricsAccordionItem({
	questionnaireType,
	questionMetrics,
	question,
	index,
}: {
	questionMetrics: QuestionMetricsTypes;
	questionnaireType: QuestionnaireType;
	question: QuestionTypes;
	index: number;
}) {
	const theme = useMantineTheme();
	const [open, setOpen] = useState(false);

	const correctChartData = useMemo(() => {
		if (!questionMetrics) return [];
		if ('rightAnswerCount' in questionMetrics) {
			return [
				{ name: 'Correct', value: questionMetrics.rightAnswerCount, color: 'teal' },
				{ name: 'Incorrect', value: questionMetrics.wrongAnswerCount, color: 'pink' },
			];
		}
		return [];
	}, []);

	const answeredChartData = [
		{ name: 'Unanswared', value: questionMetrics.unansweredCount, color: 'orange' },
		{ name: 'Answered', value: questionMetrics.answerCount, color: 'blue' },
	];

	const getQuestionTextByType = () => {
		const t = question.type;
		if (t === QuestionType.Rating) return 'Star Rating';
		if (t === QuestionType.SingleChoice) return 'Single Choice';
		if (t === QuestionType.MultipleChoice) return 'Multiple Choice';
		if (t === QuestionType.TrueOrFalse) return 'True or False';
		if (t === QuestionType.Text) return 'Text';
		return null;
	};

	let ratings: ReactNode | null = null;
	let ratingHeading: ReactNode | null = null;

	if (questionMetrics.type === QuestionType.Rating) {
		const ratingMetrics = questionMetrics as QuestionRatingMetrics;
		ratings = <Ratings byRating={ratingMetrics.byRating || []} reviewCount={ratingMetrics.answerCount} />;
		ratingHeading = (
			<Box
				style={{
					borderRadius: theme.radius.md,
					border: `1px solid ${theme.colors.gray[3]}`,
					background: getGradient({ from: 'gray.0', to: 'white', deg: 1 }, theme),
				}}
				p="xs"
			>
				<Center>
					<Title size={38} c="gray.8" mr={10}>
						{ratingMetrics.avgRating?.toFixed(1)}
					</Title>
					<Center style={{ flexDirection: 'column' }}>
						<Rating fractions={5 * 3} mt={5} value={ratingMetrics.avgRating || 0} />
						<Text fw={500} c="gray.7" size="sm">
							Average Rating
						</Text>
					</Center>
				</Center>
			</Box>
		);
	}

	return (
		<Box className={styles.accordionItem}>
			<Box
				style={{ justifyContent: 'space-between' }}
				onClick={() => setOpen(!open)}
				className={styles.dropper}
				display="flex"
			>
				<Box display="flex" style={{ gap: rem(10), alignItems: 'center', overflow: 'hidden' }}>
					<Title size={13} c="white">
						Q{index + 1}
					</Title>
					<Title size={13} w={110} c="white">
						{getQuestionTextByType()}
					</Title>
					<div
						className={styles.dropperDescription}
						dangerouslySetInnerHTML={createMarkup(question.description || '')}
					/>
				</Box>
				<UnstyledButton onClick={() => setOpen(!open)}>
					{open ? (
						<IconChevronDown color={theme.white} style={{ width: rem(20), height: rem(20) }} />
					) : (
						<IconChevronUp color={theme.white} style={{ width: rem(20), height: rem(20) }} />
					)}
				</UnstyledButton>
			</Box>

			<Box className={`${styles.content} ${open ? styles.open : ''}`}>
				<Box className={styles.analyticsWrapper}>
					<Box className={styles.analytics}>
						<Group preventGrowOverflow={false} grow>
							{ratingHeading}
							<DonutChart data={answeredChartData} />

							{question.type !== QuestionType.Rating &&
							question.type !== QuestionType.Text &&
							questionnaireType !== QuestionnaireType.QuestionnaireSurvey ? (
								<DonutChart data={correctChartData} />
							) : null}
						</Group>
						{/* <div
							className={styles.questionDescription}
							dangerouslySetInnerHTML={createMarkup(question.description || '')}
						/> */}
					</Box>

					{ratings}
					{'options' in questionMetrics && 'options' in question ? (
						<Box>
							<OptionMetricsList
								optionMetrics={questionMetrics.options}
								options={question.options}
							/>
						</Box>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}

export default function QuestionMetricsAccordion({
	questions,
	questionMetrics,
	questionnaireType,
}: {
	questions: Question[];
	questionMetrics: QuestionMetricsTypes[];
	questionnaireType: QuestionnaireType;
}) {
	return (
		<Box className={styles.accordion}>
			{questions.map((question, i) => {
				const metrics = questionMetrics.find(({ _id }) => _id === question._id);
				return (
					<MetricsAccordionItem
						key={`metrics-accordion-item-${i}`}
						index={i}
						questionnaireType={questionnaireType}
						questionMetrics={metrics as QuestionMetricsTypes}
						question={question}
					/>
				);
			})}
		</Box>
	);
}
