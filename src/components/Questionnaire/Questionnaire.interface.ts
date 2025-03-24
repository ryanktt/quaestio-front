import {
	QuestionMultipleChoice,
	QuestionMultipleChoiceInput,
	QuestionMultipleChoiceMetrics,
	QuestionRating,
	QuestionRatingMetrics,
	QuestionSingleChoice,
	QuestionSingleChoiceInput,
	QuestionSingleChoiceMetrics,
	QuestionText,
	QuestionTextInput,
	QuestionTextMetrics,
	QuestionTrueOrFalse,
	QuestionTrueOrFalseInput,
	QuestionTrueOrFalseMetrics,
	QuestionnaireExam,
	QuestionnaireQuiz,
	QuestionnaireSurvey,
} from '@gened/graphql.ts';

export type QuestionnaireTypes = QuestionnaireExam | QuestionnaireSurvey | QuestionnaireQuiz;

export type QuestionTypes =
	| QuestionMultipleChoice
	| QuestionSingleChoice
	| QuestionTrueOrFalse
	| QuestionText
	| QuestionRating;

export type QuestionMetricsTypes =
	| QuestionMultipleChoiceMetrics
	| QuestionSingleChoiceMetrics
	| QuestionTrueOrFalseMetrics
	| QuestionTextMetrics
	| QuestionRatingMetrics;

export enum EQuestionnaireType {
	Survey = 'Survey',
	Exam = 'Exam',
	Quiz = 'Quiz',
}

export type IQuestionInputTypes =
	| QuestionMultipleChoiceInput
	| QuestionTextInput
	| QuestionSingleChoiceInput
	| QuestionTrueOrFalseInput;

export const questionBaseInputKeys = [
	'showCorrectAnswer',
	'description',
	'required',
	'weight',
	'title',
] as const;
