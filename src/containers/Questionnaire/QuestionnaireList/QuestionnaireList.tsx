/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ListNoResults from '@components/ListNoResults/ListNoResults';
import {
	LIST_DEBOUNCE_DELAY,
	ListColumn,
	ListColumnItem,
	ListHeader,
	ListID,
	ListText,
	ListType,
} from '@components/ListTable/ListTable';
import styles from '@components/ListTable/ListTable.module.scss';
import StatusBadge from '@components/StatusBadge/StatusBadge';
import Search from '@components/Toolbar/Search';
import { GlobalContext } from '@contexts/Global/Global.context';
import { QuestionnaireType, useFetchQuestionnairesSuspenseQuery } from '@gened/graphql';
import { Box, Button, Flex, Pagination, rem } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionnaireListData {
	sharedIds: string[];
	types: QuestionnaireType[];
	titles: string[];
	statuses: boolean[];
	views: number[];
	entries: number[];
}

export default function QuestionnaireList() {
	const { searchStr } = useContext(GlobalContext).state;
	const navigate = useNavigate();
	const [textFilter] = useDebouncedValue(searchStr, LIST_DEBOUNCE_DELAY);
	const [pagination, setPagination] = useState({ page: 1, limit: 10 });

	const { data } = useFetchQuestionnairesSuspenseQuery({
		variables: { textFilter, pagination },
	});

	const { results = [], currentPage = 1, totalPageCount = 1 } = data?.adminFetchQuestionnaires || {};

	const handlePaginationUpdate = (page: number) => {
		setPagination({ ...pagination, page });
	};

	const { entries, sharedIds, statuses, titles, types } = results.reduce<QuestionnaireListData>(
		(state, questionnaire) => {
			state.sharedIds.push(questionnaire.sharedId);
			state.types.push(questionnaire.type);
			state.statuses.push(questionnaire.active);
			state.titles.push(questionnaire.title);
			state.entries.push(questionnaire.metrics.totalResponseCount);
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

	if (!results.length) {
		return (
			<div>
				<Box mb="md">
					<Search />
				</Box>
				<ListNoResults
					title="No Questionnaires Found"
					subTitle="Your account does not have any questionnaires yet"
					btn={
						<Button
							variant="filled"
							size="md"
							onClick={() => navigate('/board/questionnaire/create')}
						>
							<IconPlus size={rem(18)} style={{ marginRight: rem(5) }} /> Create Questionnaire
						</Button>
					}
				/>
			</div>
		);
	}

	return (
		<div>
			<Box mb="md">
				<Search />
			</Box>
			<Box className={styles.list}>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Type" />
					</ListColumnItem>
					{types.map((type, i) => (
						<ListColumnItem key={sharedIds[i]}>
							<ListType type={type} key={sharedIds[i]} />
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Title" />
					</ListColumnItem>
					{titles.map((title, i) => (
						<ListColumnItem key={sharedIds[i]}>
							<ListText key={sharedIds[i]}>{title}</ListText>
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Status" />
					</ListColumnItem>
					{statuses.map((status, i) => (
						<ListColumnItem key={sharedIds[i]}>
							<StatusBadge key={sharedIds[i]} active={status} />
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="ID" />
					</ListColumnItem>
					{sharedIds.map((id) => (
						<ListColumnItem key={id}>
							<ListID
								tooltipLabel="Go to questionnaire"
								redirectPath={`/board/questionnaire/${id}`}
								key={id}
								id={id}
							/>
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Entries" />
					</ListColumnItem>
					{entries.map((eCount, i) => (
						<ListColumnItem key={sharedIds[i]}>
							<ListText key={sharedIds[i]}>{eCount}</ListText>
						</ListColumnItem>
					))}
				</ListColumn>
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
