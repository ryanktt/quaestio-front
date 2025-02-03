import { QuestionnaireExam, QuestionnaireQuiz, QuestionnaireSurvey } from '@gened/graphql.ts';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';

export enum EQuestionnaireType {
	Survey = 'Survey',
	Exam = 'Exam',
	Quiz = 'Quiz',
}

export interface ICreateQuestionnaireProps {
	type: EQuestionnaireType | null;
	title: string;
	description: string;
	requireEmail: boolean;
	requireName: boolean;
	questions: IQuestionProps[];
}

export type QuestionnaireTypes = QuestionnaireExam | QuestionnaireSurvey | QuestionnaireQuiz;

export type ICreateQuestionnaireMethods = {
	questionnaire?: QuestionnaireTypes;
	onSubmit: (props: ICreateQuestionnaireProps) => void;
};
