/* eslint-disable react/prop-types */

import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.tsx';
import { CreateSurveyMutationVariables, useCreateSurveyMutation } from '@gened/graphql.ts';
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

export default function CreateQuestionnaire() {
	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useCreateSurveyMutation();

	const handleQuestionnaireCreation = async (props: IQuestionnaireFormProps) => {
		if (props.type === EQuestionnaireType.Survey) {
			await surveyMutation({ variables: buildCreateSurveyGqlVarsFromProps(props) });
		}
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	return <QuestionnaireForm title="New Questionnaire" onSubmit={handleQuestionnaireCreation} />;
}
