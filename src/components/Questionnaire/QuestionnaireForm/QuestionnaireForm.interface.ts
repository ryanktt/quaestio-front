import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { QuestionnaireExam, QuestionnaireQuiz, QuestionnaireSurvey } from '@gened/graphql';

export enum EQuestionnaireType {
	Survey = 'Survey',
	Exam = 'Exam',
	Quiz = 'Quiz',
}

export interface IQuestionnaireFormProps {
	type: EQuestionnaireType | null;
	title: string;
	description: string;
	requireEmail: boolean;
	requireName: boolean;
	randomizeQuestions: boolean | '';
	timeLimit: number | '';
	maxRetryAmount: number | '';
	questions: IQuestionProps[];
	bgColor: string;
	color: string;
}

export type QuestionnaireTypes = QuestionnaireExam | QuestionnaireSurvey | QuestionnaireQuiz;
