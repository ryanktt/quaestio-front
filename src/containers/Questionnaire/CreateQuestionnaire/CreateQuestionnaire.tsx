/* eslint-disable react/prop-types */

import {
	EQuestionnaireType,
	IQuestionnaireFormProps,
} from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import QuestionnaireForm from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.tsx';
import {
	CreateQuizMutationVariables,
	CreateSurveyMutationVariables,
	useCreateExamMutation,
	useCreateQuizMutation,
	useCreateSurveyMutation,
} from '@gened/graphql.ts';
import '@mantine/core/styles.css';
import { convertPropsToGqlVars } from '@utils/graphql.ts';
import { useEffect } from 'react';
import { buildQuestionDiscriminatorsFromProps } from '../Questionnaire.aux.ts';

const buildCreateQuestionnaireGqlVarsFromProps = (
	props: IQuestionnaireFormProps,
): CreateSurveyMutationVariables | CreateQuizMutationVariables | CreateSurveyMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateSurveyMutationVariables;
};

export default function CreateQuestionnaire() {
	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useCreateSurveyMutation();
	const [quizMutation, { data: quizData, reset: resetQuiz }] = useCreateQuizMutation();
	const [examMutation, { data: examData, reset: resetExam }] = useCreateExamMutation();

	const handleQuestionnaireCreation = async (props: IQuestionnaireFormProps) => {
		const variables = buildCreateQuestionnaireGqlVarsFromProps(props);
		if (props.type === EQuestionnaireType.Survey) await surveyMutation({ variables });
		if (props.type === EQuestionnaireType.Quiz) await quizMutation({ variables });
		if (props.type === EQuestionnaireType.Exam) await examMutation({ variables });
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

	return <QuestionnaireForm title="New Questionnaire" onSubmit={handleQuestionnaireCreation} />;
}
