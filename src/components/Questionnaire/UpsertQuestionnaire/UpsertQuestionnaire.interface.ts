import { QuestionnaireExam, QuestionnaireQuiz, QuestionnaireSurvey } from '@gened/graphql.ts';
import { IQuestionProps } from '../QuestionAccordionForm/QuestionAccordionForm.tsx';

export enum EQuestionnaireType {
	Survey = 'Survey',
	Exam = 'Exam',
	Quiz = 'Quiz',
}

export interface IUpsertQuestionnaireProps {
	type: EQuestionnaireType | null;
	title: string;
	description: string;
	requireEmail: boolean;
	requireName: boolean;
	questions: IQuestionProps[];
}

export type QuestionnaireTypes = QuestionnaireExam | QuestionnaireSurvey | QuestionnaireQuiz;

export type IUpsertQuestionnaireMethods = {
	method?: 'ADD' | 'EDIT';
	questionnaire?: QuestionnaireTypes;
	onSubmit: (props: IUpsertQuestionnaireProps) => void;
};
