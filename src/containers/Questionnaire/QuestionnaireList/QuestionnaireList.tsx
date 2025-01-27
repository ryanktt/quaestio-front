import { Badge, Box, Text as MantineText, useMantineTheme, NavLink as MantineNavLink } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconEye, IconHome2 } from '@tabler/icons-react';
import { QuestionnaireType, useFetchQuestionnairesSuspenseQuery } from '@gened/graphql';
import styles from './QuestionnaireList.module.scss';

function Column({ children, gridFr }: PropsWithChildren & { gridFr?: string }) {
	return <Box className={`${styles.column} Fr${gridFr}`}>{children}</Box>;
}

function ColumnItem({ children }: PropsWithChildren) {
	return (
		<Box className={`${styles.columnItem}`}>
			<div className={styles.columnItemWrapper}>{children}</div>
		</Box>
	);
}

function Header({ label, icon: Icon }: { label: string; icon?: typeof IconHome2 }) {
	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<MantineText size="14px" fw="600">
				{label}
			</MantineText>
			{Icon ? <Icon style={{ marginLeft: '8px' }} size={18} /> : null}
		</Box>
	);
}

function Type({ type }: { type: QuestionnaireType }) {
	const theme = useMantineTheme();
	const getTextFromQuestionnaireType = (qType: QuestionnaireType) => {
		if (qType === QuestionnaireType.QuestionnaireSurvey) return 'Survey';
		if (qType === QuestionnaireType.QuestionnaireExam) return 'Exam';
		if (qType === QuestionnaireType.QuestionnaireQuiz) return 'Quiz';
		return '';
	};
	const txtType = getTextFromQuestionnaireType(type);
	let badgeVariant = 'filled-pink';
	if (txtType === 'Quiz') badgeVariant = 'filled-violet';
	if (txtType === 'Exam') badgeVariant = 'filled-cyan';
	return (
		<Badge variant={badgeVariant} radius={theme.radius.sm}>
			{getTextFromQuestionnaireType(type)}
		</Badge>
	);
}

function Status({ active }: { active?: boolean }) {
	return (
		<Badge variant="dot" className={`${styles.status} ${active ? styles.active : ''}`}>
			{active ? 'Active' : 'Unactive'}
		</Badge>
	);
}

function Text({ children }: PropsWithChildren) {
	return (
		<MantineText size="15px" truncate>
			{children}
		</MantineText>
	);
}

function ID({ children: id }: PropsWithChildren) {
	const theme = useMantineTheme();
	return (
		<MantineNavLink
			p={0}
			component={Link}
			style={{ borderRadius: theme.radius.sm }}
			c={theme.colors.indigo[9]}
			to={`/board/questionnaire/${id}`}
			label={id}
		/>
	);
}

interface QuestionnaireListData {
	sharedIds: string[];
	types: QuestionnaireType[];
	titles: string[];
	statuses: boolean[];
	views: number[];
	entries: number[];
}

export default function QuestionnaireList() {
	const { data } = useFetchQuestionnairesSuspenseQuery();

	const { entries, sharedIds, statuses, titles, types, views } =
		data.adminFetchQuestionnaires.reduce<QuestionnaireListData>(
			(state, questionnaire) => {
				state.sharedIds.push(questionnaire.sharedId);
				state.types.push(questionnaire.type);
				state.statuses.push(questionnaire.active);
				state.titles.push(questionnaire.title);
				state.entries.push(0);
				state.views.push(0);
				return state;
			},
			{
				sharedIds: [],
				statuses: [],
				entries: [],
				titles: [],
				types: [],
				views: [],
			},
		);

	return (
		<div>
			<Box className={styles.list}>
				<Column>
					<ColumnItem>
						<Header label="Type" />
					</ColumnItem>
					{types.map((type) => (
						<ColumnItem>
							<Type type={type} />
						</ColumnItem>
					))}
				</Column>
				<Column gridFr="2">
					<ColumnItem>
						<Header label="Title" />
					</ColumnItem>
					{titles.map((title) => (
						<ColumnItem>
							<Text>{title}</Text>
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Status" />
					</ColumnItem>
					{statuses.map((status) => (
						<ColumnItem>
							<Status active={status} />
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="ID" />
					</ColumnItem>
					{sharedIds.map((id) => (
						<ColumnItem>
							<ID>{id}</ID>
						</ColumnItem>
					))}
				</Column>

				<Column>
					<ColumnItem>
						<Header label="Views" icon={IconEye} />
					</ColumnItem>
					{views.map((vCount) => (
						<ColumnItem>
							<Text>{vCount}</Text>
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Entries" icon={IconCheck} />
					</ColumnItem>
					{entries.map((eCount) => (
						<ColumnItem>
							<Text>{eCount}</Text>
						</ColumnItem>
					))}
				</Column>
			</Box>
		</div>
	);
}
