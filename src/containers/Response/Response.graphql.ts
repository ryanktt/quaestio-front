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
            correction {
                correctQuestionOptions {
                    optionIds
                    questionId
                }
                correctedAnswers {
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
                    ... on AnswerRating {
                        __typename
                        type
                        answeredAt
                        question
                        answeredAt
                        rate
                    }
                }
            }
        } 
    }
`);

export const FETCH_RESPONSE = gql(`
    query FetchResponse(
        $responseId: String!
    ) {
        adminFetchResponse(
            responseId: $responseId
        ) {
            ...ResponseFragment
        } 
    }
`);

export const RESPONSE_FRAGMENT = gql(`
    fragment ResponseFragment on Response {
        _id
        questionnaireSharedId
        startedAt
        completedAt
        answerTime
        respondentName
        respondentEmail
        questionnaire {
            ... on QuestionnaireSurvey {
				...SurveyFragment
			}
			... on QuestionnaireExam {
				...ExamFragment
			}
			... on QuestionnaireQuiz {
				...QuizFragment
			}	
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
            ... on AnswerRating {
                __typename
                type
                answeredAt
                question
                answeredAt
                rate
            }
        }
    }
`);
