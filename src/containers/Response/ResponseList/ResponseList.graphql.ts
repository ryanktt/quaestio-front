import { gql } from '@apollo/client';

export const FETCH_RESPONSES = gql(`
    query FetchResponses(
        $questionnaireIds: [String!]
        $questionnaireSharedIds: [String!]
        $textFilter: String
    ) {
        adminFetchResponses(
        questionnaireIds: $questionnaireIds
        questionnaireSharedIds: $questionnaireSharedIds
        textFilter: $textFilter
    ) {
        ...ResponseFragment
    }
  }
`);

export default { FETCH_RESPONSES };
