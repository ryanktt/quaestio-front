import { IQuestionProps } from '../UpsertQuestion/UpsertQuestion.tsx';

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
