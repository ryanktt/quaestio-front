/* eslint-disable react/prop-types */
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm';
import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
	QuestionnaireTypes,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface';
import {
	UpdateSurveyMutationVariables,
	useFetchQuestionnaireSuspenseQuery,
	useUpdateSurveyMutation,
} from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buildQuestionnaireFormProps } from './EditQuestionnaire.aux.ts';

export default function EditQuestionnaire() {
	const params = useParams() as { sharedId: string };

	const { data } = useFetchQuestionnaireSuspenseQuery({ variables: { questionnaireSharedId: params.sharedId } });
	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useUpdateSurveyMutation();

	const handleQuestionnaireUpdate = async (props: IQuestionnaireFormProps) => {
		const { type } = props;
		if (type === EQuestionnaireType.Survey) {
			await surveyMutation({ variables: {} as unknown as UpdateSurveyMutationVariables });
		}
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	const questionnaire = data.adminFetchQuestionnaire;
	return (
		<QuestionnaireForm
			formProps={buildQuestionnaireFormProps(questionnaire as QuestionnaireTypes)}
			onSubmit={handleQuestionnaireUpdate}
			title="Edit Questionnaire"
		/>
	);
}
