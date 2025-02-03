/* eslint-disable no-underscore-dangle */
import {
	CreateSurveyMutationVariables,
	OptionInput,
	QuestionDiscriminatorInput,
	QuestionMultipleChoiceInput,
	QuestionSingleChoiceInput,
	QuestionTextInput,
	QuestionTrueOrFalseInput,
	QuestionType,
} from '@gened/graphql';
import { getObjSelectedFields } from '@utils/objects';
import { convertPropsToGqlVars } from '@utils/graphql';
import { QuestionTypes } from '@components/Questionnaire/Questionnaire.interface.ts';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { IOptionProps } from '@components/Questionnaire/OptionAccordionForm/OptionAccordionForm.tsx';
import { EQuestionnaireType, ICreateQuestionnaireProps, QuestionnaireTypes } from './CreateQuestionnaire.interface.ts';

type IQuestionInputTypes =
	| QuestionMultipleChoiceInput
	| QuestionTextInput
	| QuestionSingleChoiceInput
	| QuestionTrueOrFalseInput;

const questionBaseInputKeys = ['showCorrectAnswer', 'description', 'required', 'weight', 'title'] as const;

export const buildGqlOptionVarsFromProps = (optionProps: IOptionProps): OptionInput => {
	return convertPropsToGqlVars(
		getObjSelectedFields(optionProps, ['correct', 'feedbackAfterSubmit', 'title']),
	) as OptionInput;
};

export const buildGqlOptionsVarsFromProps = (optionsProps?: IOptionProps[]): OptionInput[] | undefined => {
	if (!optionsProps) return undefined;
	return optionsProps.map(buildGqlOptionVarsFromProps);
};

export const buildQuestionDiscriminatorFromProps = (questionProps: IQuestionProps): QuestionDiscriminatorInput => {
	const question = convertPropsToGqlVars({
		...questionProps,
		options: buildGqlOptionsVarsFromProps(questionProps.options),
	}) as IQuestionInputTypes;

	const discriminator: QuestionDiscriminatorInput = {
		type: questionProps.type as QuestionType,
	};

	if (question.type === QuestionType.MultipleChoice) {
		discriminator.questionMultipleChoice = getObjSelectedFields(question as QuestionMultipleChoiceInput, [
			...questionBaseInputKeys,
			'rightAnswerFeedback',
			'wrongAnswerFeedback',
			'randomizeOptions',
			'options',
			'type',
		]) as QuestionMultipleChoiceInput;
	}
	if (question.type === QuestionType.SingleChoice) {
		discriminator.questionSingleChoice = getObjSelectedFields(question as QuestionSingleChoiceInput, [
			'rightAnswerFeedback',
			'wrongAnswerFeedback',
			'randomizeOptions',
			'options',
			'type',
		]) as QuestionSingleChoiceInput;
	}
	if (question.type === QuestionType.TrueOrFalse) {
		discriminator.questionTrueOrFalse = getObjSelectedFields(question as QuestionTrueOrFalseInput, [
			'rightAnswerFeedback',
			'wrongAnswerFeedback',
			'options',
			'type',
		]) as QuestionTrueOrFalseInput;
	}
	if (question.type === QuestionType.Text) {
		discriminator.questionText = getObjSelectedFields(question as QuestionTextInput, ['type']) as QuestionTextInput;
	}

	return discriminator;
};

export const buildQuestionDiscriminatorsFromProps = (questionsProps: IQuestionProps[]) => {
	return questionsProps.map(buildQuestionDiscriminatorFromProps);
};

export const buildCreateSurveyGqlVarsFromProps = (props: ICreateQuestionnaireProps): CreateSurveyMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateSurveyMutationVariables;
};

export const buildQuestionnaireFormProps = (questionnaire?: QuestionnaireTypes): ICreateQuestionnaireProps => {
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
		questions: questionnaire.questions.map((question: QuestionTypes) => {
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
				options = (question.options || []).map((option) => ({
					id: option._id,
					feedbackAfterSubmit: option.feedbackAfterSubmit || '',
					correct: option.correct || false,
					title: option.title,
				}));
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
		}),
	};
};
