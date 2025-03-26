/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ListNoResults from '@components/ListNoResults/ListNoResults';
import {
	LIST_DEBOUNCE_DELAY,
	ListColumn,
	ListColumnItem,
	ListDate,
	ListHeader,
	ListID,
	ListText,
	ListType,
} from '@components/ListTable/ListTable';
import styles from '@components/ListTable/ListTable.module.scss';
import Search from '@components/Toolbar/Search';
import { GlobalContext } from '@contexts/Global/Global.context';
import { QuestionnaireType, useFetchResponsesSuspenseQuery } from '@gened/graphql';
import { Box, Flex, Pagination } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useContext, useState } from 'react';

interface ResponseListData {
	ids: string[];
	types: QuestionnaireType[];
	titles: string[];
	emails: (string | undefined)[];
	answeredAts: (Date | undefined)[];
}

export default function ResponseList({ questionnaireId }: { questionnaireId?: string }) {
	const { searchStr } = useContext(GlobalContext).state;
	const [textFilter] = useDebouncedValue(searchStr, LIST_DEBOUNCE_DELAY);
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

	if (!results.length) {
		return (
			<div>
				<Box mb="md">
					<Search />
				</Box>
				<ListNoResults
					title="No Responses Found"
					subTitle="Create and share questionnaires to get new entries"
				/>
			</div>
		);
	}

	return (
		<div>
			<Box mb="md">
				<Search />
			</Box>
			<Box className={`${styles.list} ${styles.responses}`}>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Quest Type" />
					</ListColumnItem>
					{types.map((type, i) => (
						<ListColumnItem key={ids[i]}>
							<ListType type={type} />
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Quest Title" />
					</ListColumnItem>
					{titles.map((title, i) => (
						<ListColumnItem key={ids[i]}>
							<ListText key={ids[i]}>{title}</ListText>
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Email" />
					</ListColumnItem>
					{emails.map((email, i) => (
						<ListColumnItem key={ids[i]}>
							<ListText>{email || '-'}</ListText>
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="ID" />
					</ListColumnItem>
					{ids.map((id) => (
						<ListColumnItem key={id}>
							<ListID
								tooltipLabel="Go to response"
								redirectPath={`/board/response/${id}`}
								key={id}
								id={id}
							/>
						</ListColumnItem>
					))}
				</ListColumn>
				<ListColumn>
					<ListColumnItem>
						<ListHeader label="Answered At" />
					</ListColumnItem>
					{answeredAts.map((answeredAt, i) => (
						<ListColumnItem key={ids[i]}>
							<ListDate key={ids[i]} date={answeredAt} />
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
