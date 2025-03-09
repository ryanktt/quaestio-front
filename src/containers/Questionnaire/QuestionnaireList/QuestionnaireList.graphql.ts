import { gql } from '@apollo/client';

export const FETCH_QUESTIONNAIRES = gql(`
	query FetchQuestionnaires(
		$latest: Boolean
		$textFilter: String
		$pagination: PaginationInput
	) 
		{
			adminFetchQuestionnaires(
			latest: $latest
			textFilter: $textFilter
			pagination: $pagination
		) {
			results {
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
			currentPage
			totalPageCount
			hasNextPage
			totalResultCount
		}
	}
`);

export default { FETCH_QUESTIONNAIRES };
