import { gql } from '@apollo/client';

export const FETCH_RESPONSES = gql(`
    query FetchResponses(
        $questionnaireIds: [String!]
        $questionnaireSharedIds: [String!]
        $textFilter: String
        $pagination: PaginationInput
    ) {
        adminFetchResponses(
        questionnaireIds: $questionnaireIds
        questionnaireSharedIds: $questionnaireSharedIds
        textFilter: $textFilter
        pagination: $pagination
    ) {
        results {
            ...ResponseFragment
		}
        currentPage
        totalPageCount
        hasNextPage
        totalResultCount    
    }
  }
`);

export default { FETCH_RESPONSES };
