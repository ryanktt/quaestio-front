/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import StatusBadge from '@components/StatusBadge/StatusBadge';
import Search from '@components/Toolbar/Search';
import { GlobalContext } from '@contexts/Global/Global.context';
import { QuestionnaireType, useFetchQuestionnairesSuspenseQuery } from '@gened/graphql';
import {
	Badge,
	Box,
	Flex,
	Text as MantineText,
	Pagination,
	Title,
	Tooltip,
	UnstyledButton,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconClipboard, IconExternalLink, IconHome2 } from '@tabler/icons-react';
import { PropsWithChildren, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionnaireList.module.scss';

function Column({ children, className }: PropsWithChildren & { className?: string }) {
	return <Box className={`${styles.column} ${className}`}>{children}</Box>;
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
			<Title size="sm">{label}</Title>
			{Icon ? <Icon style={{ marginLeft: rem(8), width: rem(10), height: rem(10) }} /> : null}
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

function Text({ children }: PropsWithChildren) {
	return (
		<MantineText size="sm" m="xs">
			{children}
		</MantineText>
	);
}

function Copy({ id }: { id: string }) {
	const [copied, setCopied] = useState(false);
	const copyIdToClipboard = () => {
		if ('clipboard' in navigator) {
			navigator.clipboard.writeText(id);
		}
		setCopied(true);
	};
	return (
		<Tooltip label={!copied ? 'Copy ID to clipboard' : 'Copied'}>
			<UnstyledButton
				type="button"
				mr={8}
				pb={1}
				className={styles.btn}
				onMouseLeave={() => setCopied(false)}
				onClick={copyIdToClipboard}
			>
				<IconClipboard style={{ width: rem(14), height: rem(14) }} stroke={1.6} />
			</UnstyledButton>
		</Tooltip>
	);
}

function ID({ id }: { id: string }) {
	const navigate = useNavigate();

	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<Copy id={id} />
			<Tooltip label="Go to questionnaire">
				<UnstyledButton
					className={`${styles.btn} ${styles.id}`}
					onClick={() => navigate(`/board/questionnaire/${id}`)}
				>
					<IconExternalLink style={{ width: rem(14), height: rem(14) }} stroke={1.6} />
					<p>{id}</p>
				</UnstyledButton>
			</Tooltip>
		</Box>
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
export const DEBOUNCE_DELAY = 500;

export default function QuestionnaireList() {
	const { searchStr } = useContext(GlobalContext).state;
	const [textFilter] = useDebouncedValue(searchStr, DEBOUNCE_DELAY);
	const [pagination, setPagination] = useState({ page: 1, limit: 10 });

	const { data } = useFetchQuestionnairesSuspenseQuery({
		variables: { textFilter, pagination },
	});

	const { results, currentPage, totalPageCount } = data.adminFetchQuestionnaires;

	const handlePaginationUpdate = (page: number) => {
		setPagination({ ...pagination, page });
	};

	const { entries, sharedIds, statuses, titles, types, views } = results.reduce<QuestionnaireListData>(
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
			<Box mb={10}>
				<Search />
			</Box>
			<Box className={styles.list}>
				<Column>
					<ColumnItem>
						<Header label="Type" />
					</ColumnItem>
					{types.map((type, i) => (
						<ColumnItem key={sharedIds[i]}>
							<Type type={type} key={sharedIds[i]} />
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Title" />
					</ColumnItem>
					{titles.map((title, i) => (
						<ColumnItem key={sharedIds[i]}>
							<Text key={sharedIds[i]}>{title}</Text>
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Status" />
					</ColumnItem>
					{statuses.map((status, i) => (
						<ColumnItem key={sharedIds[i]}>
							<StatusBadge key={sharedIds[i]} active={status} />
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="ID" />
					</ColumnItem>
					{sharedIds.map((id) => (
						<ColumnItem key={id}>
							<ID key={id} id={id} />
						</ColumnItem>
					))}
				</Column>

				<Column>
					<ColumnItem>
						<Header label="Views" />
					</ColumnItem>
					{views.map((vCount, i) => (
						<ColumnItem key={sharedIds[i]}>
							<Text key={sharedIds[i]}>{vCount}</Text>
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Entries" />
					</ColumnItem>
					{entries.map((eCount, i) => (
						<ColumnItem key={sharedIds[i]}>
							<Text key={sharedIds[i]}>{eCount}</Text>
						</ColumnItem>
					))}
				</Column>
			</Box>
			{totalPageCount > 1 ? (
				<Flex mt={10} justify="flex-end" pr={20}>
					<Pagination
						size="sm"
						total={totalPageCount}
						value={currentPage}
						onChange={handlePaginationUpdate}
					/>
				</Flex>
			) : null}
		</div>
	);
}
