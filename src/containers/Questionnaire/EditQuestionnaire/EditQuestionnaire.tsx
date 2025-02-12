/* eslint-disable react/prop-types */
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm';
import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
	QuestionnaireTypes,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface';
import {
	useFetchQuestionnaireSuspenseQuery,
	useUpdateExamMutation,
	useUpdateQuizMutation,
	useUpdateSurveyMutation,
} from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buildQuestionnaireFormProps, buildUpdateQuestionnaireMutationVariables } from './EditQuestionnaire.aux.ts';

export default function EditQuestionnaire() {
	const params = useParams() as { sharedId: string };

	const { data: fetchQuestRes } = useFetchQuestionnaireSuspenseQuery({
		variables: { questionnaireSharedId: params.sharedId },
	});

	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useUpdateSurveyMutation();
	const [quizMutation, { data: quizData, reset: resetQuiz }] = useUpdateQuizMutation();
	const [examMutation, { data: examData, reset: resetExam }] = useUpdateExamMutation();
	const questionnaire = fetchQuestRes.adminFetchQuestionnaire as QuestionnaireTypes;

	const handleQuestionnaireUpdate = async (props: IQuestionnaireFormProps) => {
		const { type } = props;
		const variables = buildUpdateQuestionnaireMutationVariables(props, questionnaire);
		if (type === EQuestionnaireType.Survey) await surveyMutation({ variables });
		if (type === EQuestionnaireType.Quiz) await quizMutation({ variables });
		if (type === EQuestionnaireType.Exam) await examMutation({ variables });
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	useEffect(() => {
		if (!quizData) return;
		resetQuiz();
	}, [quizData]);

	useEffect(() => {
		if (!examData) return;
		resetExam();
	}, [examData]);

	return (
		<QuestionnaireForm
			formProps={buildQuestionnaireFormProps(questionnaire)}
			onSubmit={handleQuestionnaireUpdate}
			title="Edit Questionnaire"
		/>
	);
}
