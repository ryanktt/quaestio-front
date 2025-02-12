/* eslint-disable react/prop-types */

import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.tsx';
import {
	CreateQuizMutationVariables,
	CreateSurveyMutationVariables,
	useCreateQuizMutation,
	useCreateSurveyMutation,
} from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { convertPropsToGqlVars } from '@utils/graphql.ts';
import { useEffect } from 'react';
import { buildQuestionDiscriminatorsFromProps } from '../Questionnaire.aux.ts';

const buildCreateSurveyGqlVarsFromProps = (props: IQuestionnaireFormProps): CreateSurveyMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateSurveyMutationVariables;
};

const buildCreateQuizGqlVarsFromProps = (props: IQuestionnaireFormProps): CreateQuizMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateQuizMutationVariables;
};

export default function CreateQuestionnaire() {
	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useCreateSurveyMutation();
	const [quizMutation, { data: quizData, reset: resetQuiz }] = useCreateQuizMutation();

	const handleQuestionnaireCreation = async (props: IQuestionnaireFormProps) => {
		if (props.type === EQuestionnaireType.Survey)
			await surveyMutation({ variables: buildCreateSurveyGqlVarsFromProps(props) });
		if (props.type === EQuestionnaireType.Quiz)
			await quizMutation({ variables: buildCreateQuizGqlVarsFromProps(props) });
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	useEffect(() => {
		if (!quizData) return;
		resetQuiz();
	}, [quizData]);

	return <QuestionnaireForm title="New Questionnaire" onSubmit={handleQuestionnaireCreation} />;
}
