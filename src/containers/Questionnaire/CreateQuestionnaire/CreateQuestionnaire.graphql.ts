import { gql } from '@apollo/client';

export const CREATE_SURVEY = gql(`
	mutation CreateSurvey(
		$title: String!
		$requireEmail: Boolean!
		$requireName: Boolean!
		$questions: [QuestionDiscriminatorInput!]!
		$description: String
	) {
		adminCreateQuestionnaireSurvey(
			title: $title
			requireEmail: $requireEmail
			requireName: $requireName
			questions: $questions
			description: $description
		) {
			...SurveyFragment
		}
	}
`);

export const CREATE_QUIZ = gql(`
	mutation CreateQuiz(
		$title: String!
		$requireEmail: Boolean!
		$requireName: Boolean!
		$questions: [QuestionDiscriminatorInput!]!
		$description: String
	) {
		adminCreateQuestionnaireQuiz(
			title: $title
			requireEmail: $requireEmail
			requireName: $requireName
			questions: $questions
			description: $description
		) {
			...QuizFragment
		}
	}
`);

export const CREATE_EXAM = gql(`
	mutation CreateExam(
		$title: String!
		$requireEmail: Boolean!
		$requireName: Boolean!
		$randomizeQuestions: Boolean
		$timeLimit: Int
		$maxRetryAmount: Int
		$questions: [QuestionDiscriminatorInput!]!
		$description: String

	) {
		adminCreateQuestionnaireExam(
			title: $title
			requireEmail: $requireEmail
			requireName: $requireName
			randomizeQuestions: $randomizeQuestions
			timeLimit: $timeLimit
			maxRetryAmount: $maxRetryAmount
			questions: $questions
			description: $description
		) {
			...ExamFragment
		}
	}
`);
