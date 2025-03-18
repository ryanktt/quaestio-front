/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm.tsx';
import { buildQuestionnaireFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux.ts';
import { MetricsCard } from '@containers/Questionnaire/QuestionnaireAnalytics/QuestionnaireAnalytics.tsx';
import {
	QuestionnaireType,
	Response as ResponseType,
	useFetchResponseSuspenseQuery,
} from '@gened/graphql.ts';
import { Box, Button, getGradient, Group, rem, Text, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconClock, IconExternalLink, IconFileCheck, IconFiles, IconFileUnknown } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildResponseFormProps } from './Response.aux.ts';

export default function Response() {
	const params = useParams() as { id: string };
	const theme = useMantineTheme();
	const navigate = useNavigate();

	const { data } = useFetchResponseSuspenseQuery({
		variables: { responseId: params.id },
	});
	const response = data.adminFetchResponse as unknown as ResponseType;
	const questionnaire = response?.questionnaire as QuestionnaireTypes;

	const [metrics, setMetrics] = useState({
		questionCount: 0,
		rightAnswerCount: 0,
		wrongAnswerCount: 0,
		unasweredCount: 0,
	});
	useEffect(() => {
		let rightAnswerCount = 0;
		let wrongAnswerCount = 0;
		const questionCount = questionnaire.questions.length;
		response.answers.forEach((answer) => {
			if (!answer.correct && answer.answeredAt) wrongAnswerCount++;
			else if (answer.correct && answer.answeredAt) rightAnswerCount++;
		});
		setMetrics({
			questionCount,
			rightAnswerCount,
			wrongAnswerCount,
			unasweredCount: questionCount - (rightAnswerCount + wrongAnswerCount),
		});
	}, []);

	const answerTimeInMin = moment.duration(response.answerTime, 'ms').asMinutes().toFixed(1);

	return (
		<Box
			style={{
				borderRadius: theme.radius.lg,
				boxShadow: theme.shadows.xs,
				border: `1px solid${theme.colors.gray[4]}`,
				background: getGradient({ from: 'indigo.6', to: 'violet.7', deg: 30 }, theme),
			}}
			p={theme.spacing.md}
			mb={theme.spacing.md}
		>
			<Group
				grow
				preventGrowOverflow={false}
				gap={10}
				maw={700}
				display="flex"
				mb={5}
				style={{ margin: '0 auto' }}
			>
				<MetricsCard
					color="orange"
					icon={IconFileUnknown}
					label="Unanswered"
					stats={`${metrics.unasweredCount} Questions`}
				/>
				{questionnaire.type !== QuestionnaireType.QuestionnaireSurvey ? (
					<MetricsCard
						color="cyan"
						icon={IconFileCheck}
						label="Score"
						stats={`${metrics.rightAnswerCount}/${metrics.questionCount}`}
					/>
				) : (
					<MetricsCard
						color="cyan"
						icon={IconFiles}
						label="Question Count"
						stats={`${metrics.questionCount}`}
					/>
				)}
				<MetricsCard
					color="teal"
					icon={IconClock}
					label="Answer time"
					stats={`${answerTimeInMin} min`}
				/>
			</Group>
			<Group
				maw={700}
				justify="space-between"
				style={{ margin: '0 auto' }}
				mt={theme.spacing.xs}
				mb={theme.spacing.sm}
			>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<Text size="sm" fw={500} c="white">
						{response._id}
					</Text>
				</Box>
				<Button
					variant="white"
					c="white"
					bg="transparent"
					onClick={() => navigate(`/board/questionnaire/${questionnaire.sharedId}`)}
				>
					<IconExternalLink size={20} />
					<Text ml={5} fw={600} style={{ fontSize: rem(14) }}>
						Questionnaire
					</Text>
				</Button>
			</Group>
			<Box>
				<Box
					maw={700}
					style={{
						margin: '0 auto',
					}}
				>
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
		</Box>
	);
}
