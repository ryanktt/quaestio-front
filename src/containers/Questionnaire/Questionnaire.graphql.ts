import { gql } from '@apollo/client';

export const QUESTIONNAIRE_METRICS = gql(`
    fragment QuestionnaireMetricsFragment on QuestionnaireMetrics {
      totalResponseCount
      totalAttemptCount
      totalAnswerTime
      avgAnswerTime
      avgAttemptCount
      byLocationMap
      questionMetrics {
        ... on QuestionSingleChoiceMetrics {
          answerCount
          unansweredCount
          rightAnswerCount
          wrongAnswerCount
          options {
            selectedCount
          }
        }
        ... on QuestionMultipleChoiceMetrics {
          answerCount
          unansweredCount
          rightAnswerCount
          wrongAnswerCount
          options {
            selectedCount
          }
        }
        ... on QuestionTrueOrFalseMetrics {
          answerCount
          unansweredCount
          rightAnswerCount
          wrongAnswerCount
          options {
            selectedCount
          }
        }
        ... on QuestionTextMetrics {
          answerCount
          unansweredCount
        }
      }
    }
`);

export const QUESTION_FRAGMENT = gql(`	
    fragment QuestionSingleChoiceFragment on QuestionSingleChoice {
        _id
        type
        showCorrectAnswer
        title
        weight
        required
        description
        options {
            _id
            title
            correct
            feedbackAfterSubmit
        }
        wrongAnswerFeedback
        rightAnswerFeedback
        randomizeOptions
        
    }
    fragment QuestionMultipleChoiceFragment on QuestionMultipleChoice {
        _id
        type
        showCorrectAnswer
        title
        weight
        required
        description
        options {
            _id
            title
            correct
            feedbackAfterSubmit
        }
        wrongAnswerFeedback
        rightAnswerFeedback
        randomizeOptions
        
    }
    fragment QuestionTrueOrFalseFragment on QuestionTrueOrFalse {
        _id
        type
        showCorrectAnswer
        title
        weight
        required
        description
        options {
            _id
            title
            correct
            feedbackAfterSubmit
        }
        wrongAnswerFeedback
        rightAnswerFeedback
    }
    fragment QuestionTextFragment on QuestionText {
        _id
        type
        showCorrectAnswer
        title
        weight
        required
        description
        feedbackAfterSubmit
    }
    
`);

export const SURVEY_FRAGMENT = gql(`
    fragment SurveyFragment on QuestionnaireSurvey {
        _id
        sharedId
        type
        requireEmail
        requireName
        title
        description
        active
        color
        bgColor
        metrics {
            ...QuestionnaireMetricsFragment
        }
        questions {
            type
            ... on QuestionSingleChoice {
                ...QuestionSingleChoiceFragment
            }
            ... on QuestionMultipleChoice {
                ...QuestionMultipleChoiceFragment
            }
            ... on QuestionTrueOrFalse {
                ...QuestionTrueOrFalseFragment
            }
            ... on QuestionText {
                ...QuestionTextFragment
            }
        }
        sharedCreatedAt
        createdAt
        updatedAt
    }
`);

export const QUIZ_FRAGMENT = gql(`
    fragment QuizFragment on QuestionnaireQuiz {
        _id
        sharedId
        type
        requireEmail
        requireName
        title
        description
        active
        color
        bgColor
        metrics {
            ...QuestionnaireMetricsFragment
        }
        questions {
            ... on QuestionSingleChoice {
                ...QuestionSingleChoiceFragment
            }
            ... on QuestionMultipleChoice {
                ...QuestionMultipleChoiceFragment
            }
            ... on QuestionTrueOrFalse {
                ...QuestionTrueOrFalseFragment
            }
            ... on QuestionText {
                ...QuestionTextFragment
            }
        }
        sharedCreatedAt
        createdAt
        updatedAt
    }
`);

export const EXAM_FRAGMENT = gql(`
    fragment ExamFragment  on QuestionnaireExam {
        _id
        sharedId
        type
        requireEmail
        requireName
        title
        description
        active
        color
        bgColor
        metrics {
            ...QuestionnaireMetricsFragment
        }
        randomizeQuestions
        questions {
            ... on QuestionSingleChoice {
                ...QuestionSingleChoiceFragment
            }
            ... on QuestionMultipleChoice {
                ...QuestionMultipleChoiceFragment
            }
            ... on QuestionTrueOrFalse {
                ...QuestionTrueOrFalseFragment
            }
            ... on QuestionText {
                ...QuestionTextFragment
            }
        }
        sharedCreatedAt
        createdAt
        updatedAt
        timeLimit
        maxRetryAmount
        randomizeQuestions
    }
`);

export const DELETE_QUESTIONNAIRES = gql(`
	mutation DeleteQuestionnaire(
		$questionnaireSharedId: String!
	) {
		adminDeleteQuestionnaire(
			questionnaireSharedId: $questionnaireSharedId
		) {
			status	
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

export const PUBLIC_FETCH_QUESTIONNAIRE = gql(`
	query publicFetchQuestionnaire(
		$questionnaireId: String 
		$questionnaireSharedId: String
	) {
		publicFetchQuestionnaire(
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
