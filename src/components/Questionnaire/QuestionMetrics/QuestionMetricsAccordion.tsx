/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
import {
	Question,
	QuestionMultipleChoiceMetrics,
	QuestionSingleChoiceMetrics,
	QuestionTextMetrics,
	QuestionTrueOrFalseMetrics,
} from '@gened/graphql';
import { Box, rem, Title, UnstyledButton, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { createMarkup } from '@utils/html';
import { useMemo, useState } from 'react';
import DonutChart from './DonutChart.tsx';
import styles from './QuestionMetricsAccordion.module.scss';

type QuestionMetricsTypes =
	| QuestionTextMetrics
	| QuestionTrueOrFalseMetrics
	| QuestionMultipleChoiceMetrics
	| QuestionSingleChoiceMetrics;

function MetricsAccordionItem({
	questionMetrics,
	question,
	index,
}: {
	questionMetrics: QuestionMetricsTypes;
	question: Question;
	index: number;
}) {
	const theme = useMantineTheme();
	const [open, setOpen] = useState(false);

	const chartData = useMemo(() => {
		if (!questionMetrics) return [];
		const data = [
			{ name: 'Unanswared', value: questionMetrics.unansweredCount, color: 'orange' },
			{ name: 'Answered', value: questionMetrics.answerCount, color: 'blue' },
		];

		if ('rightAnswerCount' in questionMetrics && questionMetrics.rightAnswerCount) {
			data.push(
				{ name: 'Correct', value: questionMetrics.rightAnswerCount, color: 'teal' },
				{ name: 'Incorrect', value: questionMetrics.wrongAnswerCount, color: 'pink' },
			);
		}
		return data;
	}, []);

	return (
		<Box className={styles.accordionItem}>
			<Box
				style={{ justifyContent: 'space-between' }}
				onClick={() => setOpen(!open)}
				className={styles.dropper}
				display="flex"
			>
				<Box display="flex" style={{ gap: rem(10), alignItems: 'center', overflow: 'hidden' }}>
					<Title size={12} c="white">
						Q{index + 1}
					</Title>
					<div
						className={styles.dropperDescription}
						dangerouslySetInnerHTML={createMarkup(question.description || '')}
					/>
				</Box>
				<UnstyledButton onClick={() => setOpen(!open)}>
					{open ? (
						<IconChevronDown color={theme.white} size={20} />
					) : (
						<IconChevronUp color={theme.white} size={20} />
					)}
				</UnstyledButton>
			</Box>

			<Box className={`${styles.content} ${open ? styles.open : ''}`}>
				<Box className={styles.analyticsWrapper}>
					<Box className={styles.analytics}>
						<DonutChart data={chartData} />
						<div
							className={styles.questionDescription}
							dangerouslySetInnerHTML={createMarkup(question.description || '')}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default function QuestionMetricsAccordion({
	questions,
	questionMetrics,
}: {
	questions: Question[];
	questionMetrics: QuestionMetricsTypes[];
}) {
	return (
		<Box className={styles.accordion}>
			{questions.map((question, i) => {
				const metrics = questionMetrics.find(({ _id }) => _id === question._id);
				return (
					<MetricsAccordionItem
						key={`metrics-accordion-item-${i}`}
						index={i}
						questionMetrics={metrics as QuestionMetricsTypes}
						question={question}
					/>
				);
			})}
		</Box>
	);
}
