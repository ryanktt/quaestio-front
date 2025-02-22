import { gql } from '@apollo/client';

export const RESPOND_QUESTIONNAIRE = gql(`
    mutation RespondQuestionnaire(
        $answers: [AnswerDiscriminatorInput!]!
        $questionnaireId: String!
        $name: String
        $email: String
        $startedAt: DateTime!
        $completedAt: DateTime!
    ) {
        publicUpsertQuestionnaireResponse(
            questionnaireId: $questionnaireId
            email: $email
            name: $name
            completedAt: $completedAt
            startedAt: $startedAt
            answers: $answers
        ) {
            respondentToken
        } 
    }
`);

export default { RESPOND_QUESTIONNAIRE };
