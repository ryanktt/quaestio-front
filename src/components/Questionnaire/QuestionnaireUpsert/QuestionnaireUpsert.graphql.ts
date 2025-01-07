import { gql } from '@apollo/client';

const CREATE_SURVEY_MUTATION = gql`
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
			_id
			sharedId
			type
			requireEmail
			requireName
			title
			description
			questions {
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
			createdAt
			updatedAt
		}
	}
`;

export default CREATE_SURVEY_MUTATION;
