/* eslint-disable react/prop-types */
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm.tsx';
import { buildQuestionnaireFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux';
import { GlobalContext } from '@contexts/Global/Global.context';
import { usePublicFetchQuestionnaireSuspenseQuery } from '@gened/graphql.ts';
import { Container } from '@mantine/core';
import '@mantine/core/styles.css';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

export default function RespondQuestionnaire() {
	const ctx = useContext(GlobalContext);
	const params = useParams() as { sharedId: string };

	const { data: fetchQuestRes } = usePublicFetchQuestionnaireSuspenseQuery({
		variables: { questionnaireSharedId: params.sharedId },
	});
	const colorScheme = 'indigo';
	ctx.state.setResponseColorScheme(colorScheme);

	return (
		<Container display="flex" mih={700} p={15} size="48rem">
			<ResponseForm
				colorScheme={colorScheme}
				questionnaireProps={buildQuestionnaireFormProps(
					fetchQuestRes.publicFetchQuestionnaire as QuestionnaireTypes,
				)}
				onSubmit={() => {}}
			/>
		</Container>
	);
}
