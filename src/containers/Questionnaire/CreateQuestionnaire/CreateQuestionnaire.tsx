/* eslint-disable react/prop-types */

import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.tsx';
import { useCreateSurveyMutation } from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { buildCreateSurveyGqlVarsFromProps } from './CreateQuestionnaire.aux.ts';

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
