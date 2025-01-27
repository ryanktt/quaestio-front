import { gql } from '@apollo/client';

export const QUESTION_FRAGMENT = gql(`	
    fragment QuestionFragment on Question {
        _id
        showCorrectAnswer
        title
        weight
        required
        description
        ... on QuestionSingleChoice {
            options {
                title
                correct
                feedbackAfterSubmit
            }
            wrongAnswerFeedback
            rightAnswerFeedback
            randomizeOptions
        }
        ... on QuestionMultipleChoice {
            options {
                title
                correct
                feedbackAfterSubmit
            }
            wrongAnswerFeedback
            rightAnswerFeedback
            randomizeOptions
        }
        ... on QuestionTrueOrFalse {
            options {
                title
                correct
                feedbackAfterSubmit
            }
            wrongAnswerFeedback
            rightAnswerFeedback
        }
        ... on QuestionText {
            feedbackAfterSubmit
        }
    }
`);

export const SURVEY_FRAGMENT = gql(`
    fragment SurveyFragment on QuestionnaireSurvey {
        _id
        sharedId
        type
        requireEmail
        requireName
        title
        description
        active
        questions {
            ...QuestionFragment
        }
        createdAt
        updatedAt
    }
`);

export const QUIZ_FRAGMENT = gql(`
    fragment QuizFragment on QuestionnaireQuiz {
        _id
        sharedId
        type
        requireEmail
        requireName
        title
        description
        active
        questions {
            ...QuestionFragment
        }
        createdAt
        updatedAt
    }
`);

export const EXAM_FRAGMENT = gql(`
    fragment ExamFragment  on QuestionnaireExam {
        _id
        sharedId
        type
        requireEmail
        requireName
        title
        description
        active
        questions {
            ...QuestionFragment
        }
        createdAt
        updatedAt
        timeLimit
        maxRetryAmount
        randomizeQuestions
    }
`);
