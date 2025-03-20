/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Search from '@components/Toolbar/Search';
import { GlobalContext } from '@contexts/Global/Global.context';
import { QuestionnaireType, useFetchResponsesSuspenseQuery } from '@gened/graphql';
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
import moment from 'moment';
import { PropsWithChildren, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResponseList.module.scss';

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

function Date({ date }: { date?: Date }) {
	return (
		<MantineText size="sm" m="xs">
			{date ? moment(date).format('MM/DD/YYYY - HH:MM') : '-'}
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
			<Tooltip label="Go to response">
				<UnstyledButton
					className={`${styles.btn} ${styles.id}`}
					onClick={() => navigate(`/board/response/${id}`)}
				>
					<IconExternalLink style={{ width: rem(14), height: rem(14) }} stroke={1.6} />
					<p>{id}</p>
				</UnstyledButton>
			</Tooltip>
		</Box>
	);
}

interface ResponseListData {
	ids: string[];
	types: QuestionnaireType[];
	titles: string[];
	emails: (string | undefined)[];
	answeredAts: (Date | undefined)[];
}
export const DEBOUNCE_DELAY = 500;

export default function ResponseList({ questionnaireId }: { questionnaireId?: string }) {
	const { searchStr } = useContext(GlobalContext).state;
	const [textFilter] = useDebouncedValue(searchStr, DEBOUNCE_DELAY);
	const [pagination, setPagination] = useState({ page: 1, limit: 10 });
	const { data } = useFetchResponsesSuspenseQuery({
		variables: {
			questionnaireIds: questionnaireId ? [questionnaireId] : undefined,
			textFilter,
			pagination,
		},
	});

	const handlePaginationUpdate = (page: number) => {
		setPagination({ ...pagination, page });
	};

	const { results = [], currentPage = 1, totalPageCount = 1 } = data?.adminFetchResponses || {};

	const { answeredAts, emails, ids, titles, types } = results.reduce<ResponseListData>(
		(state, response) => {
			state.ids.push(response._id);
			state.types.push(response.questionnaire.type);
			state.titles.push(response.questionnaire.title);
			state.answeredAts.push(response.completedAt || undefined);
			state.emails.push(response.respondentEmail || undefined);
			return state;
		},
		{
			ids: [],
			titles: [],
			types: [],
			emails: [],
			answeredAts: [],
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
						<Header label="Questionnaire Type" />
					</ColumnItem>
					{types.map((type, i) => (
						<ColumnItem key={ids[i]}>
							<Type type={type} />
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Questionnaire Title" />
					</ColumnItem>
					{titles.map((title, i) => (
						<ColumnItem key={ids[i]}>
							<Text key={ids[i]}>{title}</Text>
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Email" />
					</ColumnItem>
					{emails.map((email, i) => (
						<ColumnItem key={ids[i]}>
							<Text>{email || '-'}</Text>
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="ID" />
					</ColumnItem>
					{ids.map((id) => (
						<ColumnItem key={id}>
							<ID key={id} id={id} />
						</ColumnItem>
					))}
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Answered At" />
					</ColumnItem>
					{answeredAts.map((answeredAt, i) => (
						<ColumnItem key={ids[i]}>
							<Date key={ids[i]} date={answeredAt} />
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
