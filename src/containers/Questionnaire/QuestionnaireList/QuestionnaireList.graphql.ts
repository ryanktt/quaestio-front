import { gql } from '@apollo/client';

export const FETCH_QUESTIONNAIRES = gql(`
	query FetchQuestionnaires(
		$latest: Boolean
		$textFilter: String
	) {
		adminFetchQuestionnaires(
		latest: $latest
		textFilter: $textFilter
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

export default { FETCH_QUESTIONNAIRES };
