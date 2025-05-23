/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import { IResponseFormProps } from '@components/Response/ResponseForm/ResponseForm.interface';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm.tsx';
import QuestionnaireNotFound from '@containers/NotFound/QuestionnaireNotFound.tsx';
import { buildQuestionnaireFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux.ts';
import { GlobalContext } from '@contexts/Global/Global.context';
import { ILayoutBgColors } from '@contexts/Global/Global.types.ts';
import { usePublicFetchQuestionnaireSuspenseQuery, useRespondQuestionnaireMutation } from '@gened/graphql.ts';
import { Container } from '@mantine/core';
import '@mantine/core/styles.css';
import { IColorSchemes } from '@utils/color.ts';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { buildRespondQuestionnaireGqlVars, buildResponseCorrectionFormProps } from './Response.aux.ts';

export default function RespondQuestionnaire() {
	const ctx = useContext(GlobalContext);
	const params = useParams() as { sharedId: string };

	const { data: fetchQuestRes } = usePublicFetchQuestionnaireSuspenseQuery({
		variables: { questionnaireSharedId: params.sharedId },
	});
	const [respondMutation, { data: respondData }] = useRespondQuestionnaireMutation();
	const questionnaire = fetchQuestRes?.publicFetchQuestionnaire as QuestionnaireTypes | undefined;
	const correction = respondData?.publicUpsertQuestionnaireResponse.correction;
	const color = questionnaire?.color || ('indigo' as IColorSchemes);
	const bgColor = (questionnaire?.bgColor || color) as ILayoutBgColors;

	useEffect(() => {
		ctx.state.setResponseBgColor(bgColor);
	}, [bgColor]);

	const handleRespondQuestionnaire = async (props: IResponseFormProps) => {
		const variables = buildRespondQuestionnaireGqlVars(props, (questionnaire as QuestionnaireTypes)._id);
		const result = await respondMutation({ variables });
		return result.data;
	};

	if (!questionnaire) {
		return <QuestionnaireNotFound reason="404" />;
	}
	if (!questionnaire.active) {
		return <QuestionnaireNotFound reason="inactive" />;
	}

	return (
		<Container display="flex" mih="100vh" pt="xl" mb={120} size="sm">
			<ResponseForm
				colorScheme={color as IColorSchemes}
				readMode={!!respondData}
				questionnaireProps={buildQuestionnaireFormProps(questionnaire)}
				correctedResponses={buildResponseCorrectionFormProps(correction)}
				onSubmit={handleRespondQuestionnaire}
			/>
		</Container>
	);
}
