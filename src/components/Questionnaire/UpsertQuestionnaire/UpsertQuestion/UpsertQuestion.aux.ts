import {
	QuestionDiscriminatorInput,
	QuestionMultipleChoiceInput,
	QuestionSingleChoiceInput,
	QuestionTextInput,
	QuestionTrueOrFalseInput,
	QuestionType,
} from '@gened/graphql';
import { getObjSelectedFields } from '@utils/objects';
import { convertPropsToGqlVars } from '@utils/graphql';
import { IQuestionProps } from './UpsertQuestion.tsx';
import { buildGqlOptionsVarsFromProps } from '../UpsertOption/UpsertOption.aux.ts';

type IQuestionInputTypes =
	| QuestionMultipleChoiceInput
	| QuestionTextInput
	| QuestionSingleChoiceInput
	| QuestionTrueOrFalseInput;

const questionBaseInputKeys = ['showCorrectAnswer', 'description', 'required', 'weight', 'title'] as const;

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
