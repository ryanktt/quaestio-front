/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import LinkButton from '@components/LinkButton/LinkButton.tsx';
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm.tsx';
import { buildQuestionnaireFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux.ts';
import { MetricsCard } from '@containers/Questionnaire/QuestionnaireAnalytics/QuestionnaireAnalytics.tsx';
import {
	AnswerType,
	QuestionnaireType,
	Response as ResponseType,
	useFetchResponseSuspenseQuery,
} from '@gened/graphql.ts';
import { Box, Group, getGradient, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconClock, IconFileCheck, IconFileUnknown, IconFiles } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buildResponseFormProps } from './Response.aux.ts';

export default function Response() {
	const params = useParams() as { id: string };
	const theme = useMantineTheme();

	const { data } = useFetchResponseSuspenseQuery({
		variables: { responseId: params.id },
	});
	const response = data.adminFetchResponse as unknown as ResponseType;
	const questionnaire = response?.questionnaire as QuestionnaireTypes;

	const [metrics, setMetrics] = useState({
		questionCount: 0,
		rightAnswerCount: 0,
		wrongAnswerCount: 0,
		weightedQuestionCount: 0,
		unasweredCount: 0,
	});
	useEffect(() => {
		let rightAnswerCount = 0;
		let wrongAnswerCount = 0;
		let weightedQuestionCount = 0;
		const questionCount = questionnaire.questions.length;
		response.answers.forEach((answer) => {
			if (answer.type === AnswerType.Rating || answer.type === AnswerType.Text) return;
			weightedQuestionCount++;
			if (!answer.correct && answer.answeredAt) wrongAnswerCount++;
			else if (answer.correct && answer.answeredAt) rightAnswerCount++;
		});
		setMetrics({
			questionCount,
			rightAnswerCount,
			wrongAnswerCount,
			weightedQuestionCount,
			unasweredCount: weightedQuestionCount - (rightAnswerCount + wrongAnswerCount),
		});
	}, []);

	const answerTimeInMin = moment.duration(response.answerTime, 'ms').asMinutes().toFixed(1);

	return (
		<Box
			style={{
				borderRadius: theme.radius.lg,
				boxShadow: theme.shadows.xs,
				border: `1px solid${theme.colors.gray[4]}`,
				background: getGradient({ from: 'indigo.2', to: 'violet.1', deg: 30 }, theme),
			}}
			p={theme.spacing.md}
			mb={theme.spacing.md}
		>
			<Group
				grow
				preventGrowOverflow={false}
				gap="sm"
				display="flex"
				mb={5}
				style={{ margin: '0 auto' }}
			>
				{questionnaire.type !== QuestionnaireType.QuestionnaireSurvey ? (
					<MetricsCard
						color="orange"
						icon={IconFileCheck}
						label="Score"
						stats={`${metrics.rightAnswerCount}/${metrics.weightedQuestionCount}`}
					/>
				) : (
					<MetricsCard
						color="orange"
						icon={IconFiles}
						label="Question Count"
						stats={`${metrics.questionCount}`}
					/>
				)}
				<MetricsCard
					color="pink"
					icon={IconFileUnknown}
					label="Unanswered"
					stats={`${metrics.unasweredCount} Questions`}
				/>
				<MetricsCard
					color="teal"
					icon={IconClock}
					label="Answer time"
					stats={`${answerTimeInMin} min`}
				/>
			</Group>

			<Box mt="sm">
				<LinkButton
					label="Open questionnaire page"
					path={`/board/questionnaire/${questionnaire.sharedId}`}
				/>
			</Box>

			<Box m={`${theme.spacing.md} auto`} maw={600}>
				{response ? (
					<ResponseForm
						colorScheme="indigo"
						readMode
						adminView
						questionnaireProps={buildQuestionnaireFormProps(questionnaire)}
						responseFormProps={buildResponseFormProps(response)}
					/>
				) : null}
			</Box>
		</Box>
	);
}
