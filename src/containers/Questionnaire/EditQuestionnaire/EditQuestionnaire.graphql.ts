import { gql } from '@apollo/client';

export const UPDATE_SURVEY = gql(`
	mutation UpdateSurvey(
		$questionnaireId: String!
		$title: String
		$questionMethods: [QuestionMethodInput!]
		$requireEmail: Boolean
		$requireName: Boolean
		$description: String
	) {
		adminUpdateQuestionnaireSurvey(
			questionnaireId: $questionnaireId
			title: $title
			questionMethods: $questionMethods
			requireEmail: $requireEmail
			requireName: $requireName
			description: $description
		) {
			...SurveyFragment
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
