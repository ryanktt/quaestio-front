/* eslint-disable no-underscore-dangle */
import { CreateSurveyMutationVariables } from '@gened/graphql';
import { convertPropsToGqlVars } from '@utils/graphql';
import { buildQuestionDiscriminatorsFromProps } from './UpsertQuestion/UpsertQuestion.aux.ts';
import { EQuestionnaireType, IUpsertQuestionnaireProps, QuestionnaireTypes } from './UpsertQuestionnaire.interface.ts';
import { QuestionTypes } from '../Questionnaire.interface.ts';
import { IOptionProps } from './UpsertOption/UpsertOption.tsx';

export const buildCreateSurveyGqlVarsFromProps = (props: IUpsertQuestionnaireProps): CreateSurveyMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateSurveyMutationVariables;
};

export const buildUpsertQuestionnaireProps = (questionnaire?: QuestionnaireTypes): IUpsertQuestionnaireProps => {
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
