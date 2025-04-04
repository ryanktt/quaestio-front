/* eslint-disable react/prop-types */
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm';
import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
	QuestionnaireTypes,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface';
import {
	useFetchQuestionnaireSuspenseQuery,
	useToggleQuestionnaireActiveMutation,
	useUpdateExamMutation,
	useUpdateQuizMutation,
	useUpdateSurveyMutation,
} from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	buildQuestionnaireFormProps,
	buildUpdateQuestionnaireMutationVariables,
} from './EditQuestionnaire.aux.ts';

export default function EditQuestionnaire() {
	const params = useParams() as { sharedId: string };

	const { data: fetchQuestRes } = useFetchQuestionnaireSuspenseQuery({
		variables: { questionnaireSharedId: params.sharedId },
	});

	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useUpdateSurveyMutation();
	const [quizMutation, { data: quizData, reset: resetQuiz }] = useUpdateQuizMutation();
	const [examMutation, { data: examData, reset: resetExam }] = useUpdateExamMutation();
	const [toggleMutation] = useToggleQuestionnaireActiveMutation();
	const questionnaire = fetchQuestRes.adminFetchQuestionnaire as QuestionnaireTypes;

	const handleQuestionnaireUpdate = async (props: IQuestionnaireFormProps) => {
		const { type } = props;
		const variables = buildUpdateQuestionnaireMutationVariables(props, questionnaire);
		if (type === EQuestionnaireType.Survey) await surveyMutation({ variables });
		if (type === EQuestionnaireType.Quiz) await quizMutation({ variables });
		if (type === EQuestionnaireType.Exam) await examMutation({ variables });
	};

	const handleQuestionnaireActiveToggled = async (active: boolean) => {
		await toggleMutation({ variables: { questionnaireSharedId: params.sharedId, active } });
	};

	const navigate = useNavigate();

	const redirect = () => {
		navigate('/board/questionnaires');
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
		redirect();
	}, [surveyData]);

	useEffect(() => {
		if (!quizData) return;
		resetQuiz();
		redirect();
	}, [quizData]);

	useEffect(() => {
		if (!examData) return;
		resetExam();
		redirect();
	}, [examData]);

	return (
		<QuestionnaireForm
			method="EDIT"
			formProps={buildQuestionnaireFormProps(questionnaire)}
			onSubmit={handleQuestionnaireUpdate}
			title="Edit Questionnaire"
			onToggleActive={handleQuestionnaireActiveToggled}
		/>
	);
}
