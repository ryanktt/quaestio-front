import { IQuestionResponseProps } from '@components/Response/ResponseForm/QuestionResponseForm';
import { IResponseFormProps } from '@components/Response/ResponseForm/ResponseForm.interface';
import { AnswerDiscriminatorInput, AnswerType, RespondQuestionnaireMutationVariables } from '@gened/graphql';
import { convertPropsToGqlVars } from '@utils/graphql';

export const buildAnswer = (responseProps: IQuestionResponseProps): AnswerDiscriminatorInput => {
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
		answers: questionResponses.map(buildAnswer),
		startedAt: startedAt as Date,
		completedAt: completedAt as Date,
	}) as RespondQuestionnaireMutationVariables;
};
