import { gql } from '@apollo/client';

export const FETCH_QUESTIONNAIRES = gql(`
	query FetchQuestionnaires {
		adminFetchQuestionnaires {
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
