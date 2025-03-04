/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm.tsx';
import { buildQuestionnaireFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux.ts';
import { Response as ResponseType, useFetchResponseSuspenseQuery } from '@gened/graphql.ts';
import { Box, getGradient, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { colorSchemes, IColorSchemes } from '@utils/color.ts';
import { useParams } from 'react-router-dom';
import { buildResponseFormProps } from './Response.aux.ts';

export default function Response() {
	const params = useParams() as { id: string };
	const theme = useMantineTheme();

	const { data } = useFetchResponseSuspenseQuery({
		variables: { responseId: params.id },
	});
	const response = data.adminFetchResponse as unknown as ResponseType;
	const questionnaire = response?.questionnaire as QuestionnaireTypes;
	const color = (questionnaire?.color || 'indigo') as IColorSchemes;
	const bgColor = questionnaire?.bgColor || 'indigo';

	const [primaryColor, secondaryColor] = colorSchemes[color || 'indigo'];
	let background = getGradient(
		{
			deg: 30,
			from: theme.colors[primaryColor || 'indigo'][5],
			to: theme.colors[secondaryColor || 'violet'][5],
		},
		theme,
	);

	if (bgColor === 'black') background = theme.colors.dark[8];
	if (bgColor === 'white') background = theme.colors.gray[1];

	return (
		<Box
			p="lg"
			style={{
				background,
				borderRadius: theme.radius.lg,
				boxShadow: theme.shadows.lg,
				border: `1px solid${theme.colors.gray[5]}`,
			}}
		>
			<Box maw={700} style={{ margin: '0 auto' }}>
				{response ? (
					<ResponseForm
						colorScheme={color}
						readMode
						questionnaireProps={buildQuestionnaireFormProps(questionnaire)}
						responseFormProps={buildResponseFormProps(response)}
					/>
				) : null}
			</Box>
		</Box>
	);
}
