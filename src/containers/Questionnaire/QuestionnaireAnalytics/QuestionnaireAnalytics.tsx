/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import QuestionMetricsAccordion from '@components/Questionnaire/QuestionMetrics/QuestionMetricsAccordion';
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import StatusBadge from '@components/StatusBadge/StatusBadge';
import { useFetchQuestionnaireSuspenseQuery } from '@gened/graphql';
import '@mantine/charts/styles.css';
import { Box, Button, getGradient, Group, rem, Text, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import {
	IconClock,
	IconEdit,
	IconExternalLink,
	IconFileArrowRight,
	IconFiles,
	IconTrash,
} from '@tabler/icons-react';
import { createMarkup } from '@utils/html';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionnaireAnalytics.module.scss';

function MetricsCard({
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
				background: getGradient({ deg: 25, from: `${color}.8`, to: `${color}.5` }, theme),
			}}
		>
			<Icon size={35} color={theme.white} stroke={1.7} />
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

	const { metrics, questions, title, active, description, sharedCreatedAt, updatedAt, sharedId } =
		fetchQuestRes.adminFetchQuestionnaire as QuestionnaireTypes;
	const avgAnswerTimeMin = moment.duration(metrics.avgAnswerTime, 'ms').asMinutes().toFixed(0);

	return (
		<div className={styles.analytics}>
			<Group grow preventGrowOverflow={false}>
				<MetricsCard
					label="Responses"
					stats={String(metrics.totalResponseCount)}
					color="orange"
					icon={IconFileArrowRight}
				/>
				<MetricsCard
					label="Avg Re-entries"
					stats={((metrics.avgAttemptCount || 1) - 1).toFixed(1)}
					color="pink"
					icon={IconFiles}
				/>
				<MetricsCard
					label="Avg Answer Time"
					stats={`${avgAnswerTimeMin} min`}
					color="teal"
					icon={IconClock}
				/>
			</Group>
			<div className={styles.mainSection}>
				<Box>
					<Box
						mb={theme.spacing.sm}
						display="flex"
						style={{
							justifyContent: 'space-between',
							alignItems: 'center',
							flexWrap: 'wrap',
						}}
					>
						<Title c="gray.8" size={24} mb={theme.spacing.sm}>
							{title}
						</Title>
						<Group gap={0}>
							<Button
								className={`${styles.btn} ${styles.id}`}
								onClick={() => window.open(`/questionnaire/${sharedId}`)}
								variant="light"
								size="sm"
							>
								<IconExternalLink size={20} stroke={1.6} /> Page
							</Button>
							<Button variant="subtle" p={rem('0px 15px')} size="sm" c="pink.8" color="pink.3">
								<IconTrash size={20} /> Delete
							</Button>
							<Button
								onClick={() => navigate(`/board/questionnaire/edit/${sharedId}`)}
								variant="subtle"
								size="sm"
								c="blue.8"
								color="blue.3"
							>
								<IconEdit size={20} />
								Edit
							</Button>
						</Group>
					</Box>

					<Box display="flex" style={{ gap: theme.spacing.md }}>
						<StatusBadge active={active} />
						<Text fw={500} size="xs" c="gray.7">
							<b>Created</b> {moment(new Date(sharedCreatedAt)).format('YYYY/MM/DD')}
						</Text>
						<Text fw={500} size="xs" c="gray.7">
							<b>Updated</b> {moment(new Date(updatedAt)).format('YYYY/MM/DD')}
						</Text>
					</Box>
				</Box>
				<div className={styles.markup} dangerouslySetInnerHTML={createMarkup(description)} />

				<QuestionMetricsAccordion questions={questions} questionMetrics={metrics.questionMetrics} />
			</div>
		</div>
	);
}
