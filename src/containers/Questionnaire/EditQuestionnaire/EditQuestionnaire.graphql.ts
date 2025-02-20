import { gql } from '@apollo/client';

export const UPDATE_SURVEY = gql(`
	mutation UpdateSurvey(
		$questionnaireId: String!
		$title: String
		$questionOrder: [QuestionOrderInput!]
		$questionMethods: [QuestionMethodInput!]
		$requireEmail: Boolean
		$requireName: Boolean
		$description: String
	) {
		adminUpdateQuestionnaireSurvey(
			questionnaireId: $questionnaireId
			title: $title
			questionMethods: $questionMethods
			questionOrder: $questionOrder
			requireEmail: $requireEmail
			requireName: $requireName
			description: $description
		) {
			...SurveyFragment
		}
	}
`);

export const UPDATE_QUIZ = gql(`
	mutation UpdateQuiz(
		$questionnaireId: String!
		$title: String
		$questionOrder: [QuestionOrderInput!]
		$questionMethods: [QuestionMethodInput!]
		$requireEmail: Boolean
		$requireName: Boolean
		$description: String
	) {
		adminUpdateQuestionnaireQuiz(
			questionnaireId: $questionnaireId
			title: $title
			questionMethods: $questionMethods
			questionOrder: $questionOrder
			requireEmail: $requireEmail
			requireName: $requireName
			description: $description
		) {
			...QuizFragment
		}
	}
`);

export const UPDATE_EXAM = gql(`
	mutation UpdateExam(
		$questionnaireId: String!
		$title: String
		$questionOrder: [QuestionOrderInput!]
		$questionMethods: [QuestionMethodInput!]
		$requireEmail: Boolean
		$requireName: Boolean
		$description: String
		$randomizeQuestions: Boolean
		$timeLimit: Int
		$maxRetryAmount: Int
		$bgColor: String
		$color: String
	) {
		adminUpdateQuestionnaireExam(
			questionnaireId: $questionnaireId
			title: $title
			questionMethods: $questionMethods
			questionOrder: $questionOrder
			requireEmail: $requireEmail
			requireName: $requireName
			description: $description
			randomizeQuestions: $randomizeQuestions
			timeLimit: $timeLimit
			maxRetryAmount: $maxRetryAmount
			bgColor: $bgColor
			color: $color
		) {
			...ExamFragment
		}
	}
`);
