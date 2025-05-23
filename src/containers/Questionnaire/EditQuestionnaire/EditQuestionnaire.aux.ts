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
	QuestionnaireType,
	QuestionOrderInput,
	UpdateExamMutationVariables,
	UpdateQuizMutationVariables,
	UpdateSurveyMutationVariables,
} from '@gened/graphql';
import { convertPropsToGqlVars } from '@utils/graphql.ts';
import _ from 'lodash';
import { buildQuestionDiscriminatorFromProps } from '../Questionnaire.aux.ts';

export const buildOptionsFormProps = (options: Option[]) => {
	return options.map((option) => ({
		id: option._id,
		feedbackAfterSubmit: option.feedbackAfterSubmit || '',
		correct: typeof option.correct === 'boolean' ? option.correct : '',
		title: option.title,
		true: !!option.true,
	}));
};

export const buildQuestionFormProps = (question: QuestionTypes) => {
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
		options = buildOptionsFormProps(question.options) as IOptionProps[];
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
};

export const buildQuestionsFormProps = (questions: QuestionTypes[]): IQuestionProps[] => {
	return questions.map(buildQuestionFormProps);
};

export const buildQuestionnaireFormProps = (
	questionnaire?: QuestionnaireTypes | null,
): IQuestionnaireFormProps => {
	if (!questionnaire) {
		return {
			type: null,
			title: '',
			description: '',
			requireEmail: false,
			requireName: false,
			maxRetryAmount: '',
			randomizeQuestions: '',
			timeLimit: '',
			questions: [],
			bgColor: '',
			color: '',
			active: '',
		};
	}
	const props: IQuestionnaireFormProps = {
		type: questionnaire.type.replace('Questionnaire', '') as EQuestionnaireType,
		description: questionnaire.description,
		requireEmail: questionnaire.requireEmail,
		requireName: questionnaire.requireName,
		title: questionnaire.title,
		questions: buildQuestionsFormProps(questionnaire.questions),
		bgColor: questionnaire.bgColor || '',
		color: questionnaire.color || '',
		active: questionnaire.active,
		randomizeQuestions: '',
		maxRetryAmount: '',
		timeLimit: '',
	};

	if (questionnaire.__typename === QuestionnaireType.QuestionnaireExam) {
		if (questionnaire.randomizeQuestions) props.randomizeQuestions = questionnaire.randomizeQuestions;
		if (questionnaire.maxRetryAmount) props.maxRetryAmount = questionnaire.maxRetryAmount;
		if (questionnaire.timeLimit) props.timeLimit = questionnaire.timeLimit;
	}

	return props;
};

const addCreateQuestionMethod = (questionProps: IQuestionProps, index: number): QuestionMethodInput => {
	return {
		type: QuestionMethodType.Create,
		index,
		questionDiscriminator: buildQuestionDiscriminatorFromProps(questionProps),
	};
};

const addDeleteQuestionMethod = (questionId: string): QuestionMethodInput => {
	return {
		type: QuestionMethodType.Delete,
		questionId,
	};
};

const addUpdateQuestionMethod = (questionProps: IQuestionProps, index: number): QuestionMethodInput => {
	return {
		type: QuestionMethodType.Update,
		questionId: questionProps.id,
		index,
		questionDiscriminator: buildQuestionDiscriminatorFromProps(questionProps),
	};
};

const buildQuestionOrder = (questionsProps: IQuestionProps[]): QuestionOrderInput[] => {
	return questionsProps
		.map((q, i) => {
			if (q.id.length !== 24) return null;
			return { questionId: q.id, index: i };
		})
		.filter((q) => !!q) as QuestionOrderInput[];
};

const buildUpdateQuestionsMethods = (
	questionsProps: IQuestionProps[],
	questionsPropsBeforeUpdate: IQuestionProps[],
): QuestionMethodInput[] => {
	const questionBeforeUpdatePropsMap = new Map<string, IQuestionProps>();
	const unhandledQuestionIdSet = new Set<string>();

	questionsPropsBeforeUpdate.forEach((qst) => {
		questionBeforeUpdatePropsMap.set(qst.id, qst);
		unhandledQuestionIdSet.add(qst.id);
	});

	const upsertQuestionMethods = questionsProps
		.map((question, i): QuestionMethodInput | null => {
			const questionBeforeUpdate = questionBeforeUpdatePropsMap.get(question.id);
			unhandledQuestionIdSet.delete(question.id);
			if (!questionBeforeUpdate) {
				return addCreateQuestionMethod(question, i);
			}
			if (!_.isEqual(question, questionBeforeUpdate)) {
				return addUpdateQuestionMethod(question, i);
			}
			return null;
		})
		.filter((q) => q !== null) as QuestionMethodInput[];

	const deleteQuestionMethods = Array.from(unhandledQuestionIdSet).map((id) => {
		return addDeleteQuestionMethod(id);
	});
	return [...upsertQuestionMethods, ...deleteQuestionMethods];
};

export const buildUpdateQuestionnaireMutationVariables = (
	questionnaireProps: IQuestionnaireFormProps,
	questionnaireBeforeUpdate: QuestionnaireTypes,
): UpdateSurveyMutationVariables | UpdateQuizMutationVariables | UpdateExamMutationVariables => {
	return convertPropsToGqlVars({
		questionnaireId: questionnaireBeforeUpdate._id,
		description: questionnaireProps.description,
		requireEmail: questionnaireProps.requireEmail,
		requireName: questionnaireProps.requireName,
		title: questionnaireProps.title,
		active: questionnaireProps.active,
		color: questionnaireProps.color,
		bgColor: questionnaireProps.bgColor,
		questionOrder: buildQuestionOrder(questionnaireProps.questions),
		questionMethods: buildUpdateQuestionsMethods(
			questionnaireProps.questions,
			buildQuestionnaireFormProps(questionnaireBeforeUpdate).questions,
		),
		timeLimit: questionnaireProps.timeLimit || undefined,
		maxRetryAmount:
			typeof questionnaireProps.maxRetryAmount === 'number'
				? questionnaireProps.maxRetryAmount
				: undefined,
		randomizeQuestions:
			typeof questionnaireProps.randomizeQuestions === 'boolean'
				? questionnaireProps.randomizeQuestions
				: undefined,
	});
};
