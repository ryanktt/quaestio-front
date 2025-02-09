/* eslint-disable no-underscore-dangle */
import { IOptionProps } from '@components/Questionnaire/OptionAccordionForm/OptionAccordionForm';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm';
import {
	EQuestionnaireType,
	QuestionnaireTypes,
	QuestionTypes,
} from '@components/Questionnaire/Questionnaire.interface';
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface';
import {
	Option,
	QuestionMethodInput,
	QuestionMethodType,
	QuestionnaireSurvey,
	UpdateSurveyMutationVariables,
} from '@gened/graphql';
import _ from 'lodash';
import { buildQuestionDiscriminatorFromProps } from '../Questionnaire.aux.ts';

export const buildOptionsFormProps = (options: Option[]) => {
	return options.map((option) => ({
		id: option._id,
		feedbackAfterSubmit: option.feedbackAfterSubmit || '',
		correct: option.correct || false,
		title: option.title,
	}));
};

export const buildQuestionsFormProps = (questions: QuestionTypes[]): IQuestionProps[] => {
	return questions.map((question: QuestionTypes) => {
		let randomizeOptions = false;
		let feedbackAfterSubmit = '';
		let rightAnswerFeedback = '';
		let wrongAnswerFeedback = '';
		let options: IOptionProps[] = [];

		if ('randomizeOptions' in question) {
			randomizeOptions = question.randomizeOptions;
		}
		if ('feedbackAfterSubmit' in question) {
			feedbackAfterSubmit = question.feedbackAfterSubmit || '';
		}
		if ('rightAnswerFeedback' in question) {
			rightAnswerFeedback = question.rightAnswerFeedback || '';
		}
		if ('wrongAnswerFeedback' in question) {
			wrongAnswerFeedback = question.wrongAnswerFeedback || '';
		}
		if ('options' in question) {
			options = buildOptionsFormProps(question.options);
		}
		return {
			required: question.required,
			id: question._id,
			feedbackAfterSubmit,
			rightAnswerFeedback,
			wrongAnswerFeedback,
			randomizeOptions,
			showCorrectAnswer: question.showCorrectAnswer,
			description: question.description || '',
			type: question.type,
			options,
		};
	});
};

export const buildQuestionnaireFormProps = (questionnaire?: QuestionnaireTypes | null): IQuestionnaireFormProps => {
	if (!questionnaire) {
		return {
			type: null,
			title: '',
			description: '',
			requireEmail: false,
			requireName: false,
			questions: [],
		};
	}
	return {
		type: questionnaire.type.replace('Questionnaire', '') as EQuestionnaireType,
		description: questionnaire.description,
		requireEmail: questionnaire.requireEmail,
		requireName: questionnaire.requireName,
		title: questionnaire.title,
		questions: buildQuestionsFormProps(questionnaire.questions),
	};
};

const addCreateQuestionMethod = (questionProps: IQuestionProps): QuestionMethodInput => {
	return {
		type: QuestionMethodType.Create,
		questionDiscriminator: buildQuestionDiscriminatorFromProps(questionProps),
	};
};

const addDeleteQuestionMethod = (questionId: string): QuestionMethodInput => {
	return {
		type: QuestionMethodType.Delete,
		questionId,
	};
};

const addUpdateQuestionMethod = (questionProps: IQuestionProps): QuestionMethodInput => {
	return {
		type: QuestionMethodType.Update,
		questionDiscriminator: buildQuestionDiscriminatorFromProps(questionProps),
	};
};

const buildUpdateQuestionsMethods = (
	questionsProps: IQuestionProps[],
	questionsPropsBeforeUpdate: IQuestionProps[],
): QuestionMethodInput[] => {
	const questionPropsMap = new Map<string, IQuestionProps>();
	const unhandledQuestionIdSet = new Set<string>();

	questionsPropsBeforeUpdate.forEach((qst) => {
		questionPropsMap.set(qst.id, qst);
		unhandledQuestionIdSet.add(qst.id);
	});

	const upsertQuestionMethods = questionsProps
		.map((question): QuestionMethodInput | null => {
			const questionBeforeUpdate = questionPropsMap.get(question.id);
			unhandledQuestionIdSet.delete(question.id);

			if (!questionBeforeUpdate) {
				return addCreateQuestionMethod(question);
			}
			if (!_.isEqual(question, questionBeforeUpdate)) {
				return addUpdateQuestionMethod(question);
			}
			return null;
		})
		.filter((q) => q !== null) as QuestionMethodInput[];

	const deleteQuestionMethods = Array.from(unhandledQuestionIdSet).map((id) => {
		return addDeleteQuestionMethod(id);
	});
	return [...upsertQuestionMethods, ...deleteQuestionMethods];
};

export const buildUpdateSurveyMutationVariables = (
	questionnaireProps: IQuestionnaireFormProps,
	surveyBeforeUpdate: QuestionnaireSurvey,
): UpdateSurveyMutationVariables => {
	return {
		questionnaireId: surveyBeforeUpdate._id,
		description: questionnaireProps.description,
		requireEmail: questionnaireProps.requireEmail,
		requireName: questionnaireProps.requireName,
		title: questionnaireProps.title,
		questionMethods: buildUpdateQuestionsMethods(
			questionnaireProps.questions,
			buildQuestionnaireFormProps(surveyBeforeUpdate).questions,
		),
	};
};
