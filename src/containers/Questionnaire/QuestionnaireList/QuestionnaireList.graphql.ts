import { gql } from '@apollo/client';

export const FETCH_QUESTIONNAIRES = gql(`
	query FetchQuestionnaires(
		$latest: Boolean
	) {
		adminFetchQuestionnaires(
		latest: $latest
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
