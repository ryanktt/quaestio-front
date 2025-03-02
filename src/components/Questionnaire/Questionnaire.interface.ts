import {
	QuestionMultipleChoice,
	QuestionMultipleChoiceInput,
	QuestionSingleChoice,
	QuestionSingleChoiceInput,
	QuestionText,
	QuestionTextInput,
	QuestionTrueOrFalse,
	QuestionTrueOrFalseInput,
	QuestionnaireExam,
	QuestionnaireQuiz,
	QuestionnaireSurvey,
} from '@gened/graphql.ts';

export type QuestionnaireTypes = QuestionnaireExam | QuestionnaireSurvey | QuestionnaireQuiz;

export type QuestionTypes =
	| QuestionMultipleChoice
	| QuestionSingleChoice
	| QuestionTrueOrFalse
	| QuestionText;

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
