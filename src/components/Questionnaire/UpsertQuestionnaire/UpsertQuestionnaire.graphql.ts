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

export default { CREATE_SURVEY };
