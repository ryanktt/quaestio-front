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

export default { CREATE_SURVEY };
