/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */

import QuestionMetricsAccordion from '@components/Questionnaire/QuestionMetrics/QuestionMetricsAccordion';
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import StatusBadge from '@components/StatusBadge/StatusBadge';
import ResponseList from '@containers/Response/ResponseList/ResponseList';
import {
	QuestionnaireType,
	QuestionType,
	useDeleteQuestionnaireMutation,
	useFetchQuestionnaireSuspenseQuery,
} from '@gened/graphql';
import '@mantine/charts/styles.css';
import { Box, Button, getGradient, Group, rem, Text, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { modals } from '@mantine/modals';
import {
	IconClock,
	IconEdit,
	IconExternalLink,
	IconFileArrowRight,
	IconFileCheck,
	IconTrash,
} from '@tabler/icons-react';
import { createMarkup } from '@utils/html';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionnaireAnalytics.module.scss';

export function MetricsCard({
	label,
	stats,
	color,
	icon: Icon,
}: {
	label: string;
	stats: string;
	color: string;
	icon: typeof IconFileArrowRight;
}) {
	const theme = useMantineTheme();
	return (
		<Box
			className={styles.metricsCard}
			style={{
				background: getGradient({ deg: 50, from: `${color}.7`, to: `${color}.5` }, theme),
			}}
		>
			<Icon style={{ width: rem(30), height: rem(30) }} color={theme.white} stroke={1.7} />
			<div>
				<Text size="xs" tt="uppercase" fw={700} c={theme.white}>
					{label}
				</Text>
				<Text fw={700} size="lg" c={theme.white}>
					{stats}
				</Text>
			</div>
		</Box>
	);
}

export default function QuestionnaireAnalytics() {
	const theme = useMantineTheme();
	const navigate = useNavigate();
	const params = useParams() as { sharedId: string };

	const { data: fetchQuestRes } = useFetchQuestionnaireSuspenseQuery({
		variables: { questionnaireSharedId: params.sharedId },
	});

	const [deleteMutation] = useDeleteQuestionnaireMutation();

	const {
		_id,
		type,
		metrics,
		questions,
		title,
		active,
		description,
		sharedCreatedAt,
		updatedAt,
		sharedId,
	} = fetchQuestRes.adminFetchQuestionnaire as QuestionnaireTypes;
	const avgAnswerTimeMin = moment.duration(metrics.avgAnswerTime, 'ms').asMinutes().toFixed(1);

	const openModal = () => {
		modals.openConfirmModal({
			title: <Title size="lg">Delete Questionnaire</Title>,
			centered: true,
			overlayProps: { backgroundOpacity: 0.3, blur: 2 },
			zIndex: 500,
			children: (
				<Text size="sm" fw={500}>
					Are you sure? This action is will permanently delete the questionnaire along with its
					metrics and entries
				</Text>
			),
			labels: { confirm: 'Delete', cancel: 'Cancel' },
			confirmProps: { color: 'pink' },
			onConfirm: async () => {
				await deleteMutation({ variables: { questionnaireSharedId: sharedId } });
				navigate('/board/questionnaires');
			},
		});
	};

	const weightedQuestionCount = questions.reduce((acc, question) => {
		if (question.type === QuestionType.Rating || question.type === QuestionType.Text) return acc;
		return acc + 1;
	}, 0);

	const iconStyle = { width: rem(20), height: rem(20) };
	return (
		<div className={styles.analytics}>
			<div className={styles.mainSection}>
				<Group grow preventGrowOverflow={false}>
					{
						type !== QuestionnaireType.QuestionnaireSurvey ? (
							<MetricsCard
								label="Avg Score"
								stats={`${metrics.avgScore.toFixed(1)}/${weightedQuestionCount}`}
								color="orange"
								icon={IconFileCheck}
							/>
						) : null
						// <MetricsCard
						// 	label="Avg Re-entries"
						// 	stats={((metrics.avgAttemptCount || 1) - 1).toFixed(1)}
						// 	color="pink"
						// 	icon={IconFiles}
						// />
					}
					<MetricsCard
						label="Responses"
						stats={String(metrics.totalResponseCount)}
						color="pink"
						icon={IconFileArrowRight}
					/>
					<MetricsCard
						label="Avg Answer Time"
						stats={`${avgAnswerTimeMin} min`}
						color="teal"
						icon={IconClock}
					/>
				</Group>
				<Box>
					<Group
						mb={theme.spacing.sm}
						display="flex"
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
						}}
					>
						<Box display="flex" style={{ gap: theme.spacing.md }}>
							<StatusBadge active={active} />
							<Text fw={500} size="sm" c="gray.7">
								<b>Created</b> {moment(new Date(sharedCreatedAt)).format('YYYY/MM/DD')}
							</Text>
							<Text fw={500} size="sm" c="gray.7">
								<b>Updated</b> {moment(new Date(updatedAt)).format('YYYY/MM/DD')}
							</Text>
						</Box>
						<Group gap={0}>
							<Button
								className={`${styles.btn} ${styles.id}`}
								onClick={() => window.open(`/questionnaire/${sharedId}`)}
								variant="light"
								size="sm"
							>
								<IconExternalLink style={iconStyle} stroke={1.6} /> Page
							</Button>
							<Button
								onClick={openModal}
								variant="subtle"
								p={rem('0px 15px')}
								size="sm"
								c="pink.8"
								color="pink.3"
							>
								<IconTrash style={iconStyle} /> Delete
							</Button>
							<Button
								onClick={() => navigate(`/board/questionnaire/edit/${sharedId}`)}
								variant="subtle"
								size="sm"
								c="blue.8"
								color="blue.3"
							>
								<IconEdit style={iconStyle} />
								Edit
							</Button>
						</Group>
					</Group>
					<Title c="gray.8" size={20}>
						{title}
					</Title>
				</Box>
				<div className={styles.markup} dangerouslySetInnerHTML={createMarkup(description)} />

				<QuestionMetricsAccordion
					questionnaireType={type}
					questions={questions}
					questionMetrics={metrics.questionMetrics}
				/>
			</div>
			<ResponseList questionnaireId={_id} />
		</div>
	);
}
