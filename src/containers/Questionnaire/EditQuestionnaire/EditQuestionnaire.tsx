/* eslint-disable react/prop-types */
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm';
import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
	QuestionnaireTypes,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface';
import { QuestionnaireSurvey, useFetchQuestionnaireSuspenseQuery, useUpdateSurveyMutation } from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buildQuestionnaireFormProps, buildUpdateSurveyMutationVariables } from './EditQuestionnaire.aux.ts';

export default function EditQuestionnaire() {
	const params = useParams() as { sharedId: string };

	const { data: fetchQuestRes } = useFetchQuestionnaireSuspenseQuery({
		variables: { questionnaireSharedId: params.sharedId },
	});

	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useUpdateSurveyMutation();
	const questionnaire = fetchQuestRes.adminFetchQuestionnaire as QuestionnaireTypes;

	const handleQuestionnaireUpdate = async (props: IQuestionnaireFormProps) => {
		const { type } = props;
		if (type === EQuestionnaireType.Survey) {
			await surveyMutation({
				variables: buildUpdateSurveyMutationVariables(props, questionnaire as QuestionnaireSurvey),
			});
		}
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	return (
		<QuestionnaireForm
			formProps={buildQuestionnaireFormProps(questionnaire)}
			onSubmit={handleQuestionnaireUpdate}
			title="Edit Questionnaire"
		/>
	);
}
