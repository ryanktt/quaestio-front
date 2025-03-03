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
        _id
        questionnaireSharedId
        startedAt
        completedAt
        respondentName
        respondentEmail
        questionnaire {
            title
            type
        }
        answers {
        ... on AnswerSingleChoice {
            __typename
            type
            answeredAt
            question
            answeredAt
            correct
            option
        }
        ... on AnswerTrueOrFalse {
            __typename
            type
            answeredAt
            question
            answeredAt
            correct
            option
        }
        ... on AnswerMultipleChoice {
            __typename
            type
            answeredAt
            question
            answeredAt
            correct
            options
        }
        ... on AnswerText {
            __typename
            type
            answeredAt
            question
            answeredAt
            correct
        }
    }
  }
  }
`);

export default { FETCH_RESPONSES };
