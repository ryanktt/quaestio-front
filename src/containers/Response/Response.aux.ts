/* eslint-disable consistent-return */
import { IQuestionResponseProps } from '@components/Response/ResponseForm/QuestionResponseForm';
import { AnswerTypes, IResponseFormProps } from '@components/Response/ResponseForm/ResponseForm.interface';
import {
	AnswerDiscriminatorInput,
	AnswerType,
	QuestionType,
	RespondQuestionnaireMutationVariables,
	Response,
	ResponseCorrection,
} from '@gened/graphql';
import { convertPropsToGqlVars } from '@utils/graphql';

export const buildAnswerVars = (responseProps: IQuestionResponseProps): AnswerDiscriminatorInput => {
	const type = responseProps.type as unknown as AnswerType;
	const discriminator: Partial<AnswerDiscriminatorInput> = { type };
	if (type === AnswerType.MultipleChoice) {
		discriminator.answerMultipleChoice = {
			optionIds: responseProps.selectedOptionIds,
			questionId: responseProps.questionId,
			answeredAt: responseProps.answeredAt,
			type,
		};
	}
	if (type === AnswerType.SingleChoice) {
		discriminator.answerSingleChoice = {
			optionId: responseProps.selectedOptionIds[0],
			questionId: responseProps.questionId,
			answeredAt: responseProps.answeredAt,
			type,
		};
	}
	if (type === AnswerType.TrueOrFalse) {
		discriminator.answerTrueOrFalse = {
			optionId: responseProps.selectedOptionIds[0],
			questionId: responseProps.questionId,
			answeredAt: responseProps.answeredAt,
			type,
		};
	}
	if (type === AnswerType.Text) {
		discriminator.answerText = {
			questionId: responseProps.questionId,
			answeredAt: responseProps.answeredAt,
			text: responseProps.text,
			type,
		};
	}
	if (type === AnswerType.Rating) {
		discriminator.answerRating = {
			questionId: responseProps.questionId,
			answeredAt: responseProps.answeredAt,
			rating: responseProps.rating,
			type,
		};
	}
	return discriminator as AnswerDiscriminatorInput;
};

export const buildRespondQuestionnaireGqlVars = (
	{ email, name, questionResponses, startedAt, completedAt }: IResponseFormProps,
	questionnaireId: string,
): RespondQuestionnaireMutationVariables => {
	return convertPropsToGqlVars({
		name,
		email,
		questionnaireId,
		answers: questionResponses.map(buildAnswerVars),
		startedAt: startedAt as Date,
		completedAt: completedAt as Date,
	}) as RespondQuestionnaireMutationVariables;
};

export const buildAnswerProps = (answer: AnswerTypes, correctOptionIds?: string[]) => {
	const selectedOptionIds: string[] = [];
	let text = '';
	let rating = 0;
	if ('option' in answer && answer.option) selectedOptionIds.push(answer.option);
	if ('options' in answer && answer.options) selectedOptionIds.push(...answer.options);
	if ('text' in answer && answer.text) text = answer.text;
	if ('rating' in answer && answer.rating) rating = answer.rating;
	return {
		type: answer.type as unknown as QuestionType,
		anweredAt: answer.answeredAt ? new Date(answer.answeredAt) : undefined,
		correct: typeof answer.correct === 'boolean' ? answer.correct : undefined,
		questionId: answer.question,
		selectedOptionIds,
		correctOptionIds,
		text,
		rating,
	};
};

export const buildResponseFormProps = (
	response?: Partial<
		Pick<Response, 'answers' | 'respondentEmail' | 'respondentName' | 'startedAt' | 'completedAt'>
	>,
): IResponseFormProps => {
	if (!response) {
		return {
			email: '',
			name: '',
			questionResponses: [],
			completedAt: new Date(),
			startedAt: new Date(),
		};
	}

	return {
		email: response.respondentName || '',
		name: response.respondentEmail || '',
		questionResponses: (response.answers || []).map((answer) => buildAnswerProps(answer)),
		completedAt: response.completedAt ? new Date(response.completedAt) : undefined,
		startedAt: response.startedAt ? new Date(response.startedAt) : undefined,
	};
};

export const buildResponseCorrectionFormProps = (
	correction?: ResponseCorrection,
): IQuestionResponseProps[] | undefined => {
	if (!correction) return;
	return correction.correctedAnswers.map((answer) =>
		buildAnswerProps(
			answer,
			correction.correctQuestionOptions.find(({ questionId }) => questionId === answer.question)
				?.optionIds,
		),
	);
};
