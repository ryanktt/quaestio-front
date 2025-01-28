/* eslint-disable react/prop-types */
import '@mantine/core/styles.css';
import { useCreateSurveyMutation } from '@gened/graphql.ts';
import { useEffect } from 'react';
import {
	EQuestionnaireType,
	IUpsertQuestionnaireProps,
} from '@components/Questionnaire/UpsertQuestionnaire/UpsertQuestionnaire.interface.ts';
import UpsertQuestionnaire from '@components/Questionnaire/UpsertQuestionnaire/UpsertQuestionnaire.tsx';
import { buildCreateSurveyGqlVarsFromProps } from '@components/Questionnaire/UpsertQuestionnaire/UpsertQuestionnaire.aux.ts';

export default function CreateQuestionnaire() {
	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useCreateSurveyMutation();

	const handleQuestionnaireCreation = async (props: IUpsertQuestionnaireProps) => {
		const { type } = props;
		if (type === EQuestionnaireType.Survey) {
			await surveyMutation({ variables: buildCreateSurveyGqlVarsFromProps(props) });
		}
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	return <UpsertQuestionnaire method="ADD" onSubmit={handleQuestionnaireCreation} />;
}
