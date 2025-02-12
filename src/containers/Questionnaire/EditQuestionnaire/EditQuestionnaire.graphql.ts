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

export const FETCH_QUESTIONNAIRE = gql(`
	query FetchQuestionnaire(
		$questionnaireId: String 
		$questionnaireSharedId: String
	) {
		adminFetchQuestionnaire(
			questionnaireId: $questionnaireId
			questionnaireSharedId: $questionnaireSharedId
		) {
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
	}
`);
