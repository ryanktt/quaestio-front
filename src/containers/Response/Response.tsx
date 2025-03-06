/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { QuestionnaireTypes } from '@components/Questionnaire/Questionnaire.interface';
import ResponseForm from '@components/Response/ResponseForm/ResponseForm.tsx';
import { buildQuestionnaireFormProps } from '@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire.aux.ts';
import { Response as ResponseType, useFetchResponseSuspenseQuery } from '@gened/graphql.ts';
import { Box, Button, getGradient, rem, Text, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconExternalLink } from '@tabler/icons-react';
import { colorSchemes } from '@utils/color.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { buildResponseFormProps } from './Response.aux.ts';

export default function Response() {
	const params = useParams() as { id: string };
	const theme = useMantineTheme();
	const navigate = useNavigate();

	const { data } = useFetchResponseSuspenseQuery({
		variables: { responseId: params.id },
	});
	const response = data.adminFetchResponse as unknown as ResponseType;
	const questionnaire = response?.questionnaire as QuestionnaireTypes;

	const [primaryColor, secondaryColor] = colorSchemes.indigo;
	const background = getGradient(
		{
			deg: 30,
			from: theme.colors[primaryColor || 'indigo'][5],
			to: theme.colors[secondaryColor || 'violet'][5],
		},
		theme,
	);

	return (
		<Box>
			<Box
				style={{
					borderRadius: theme.radius.md,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					boxShadow: theme.shadows.sm,
					border: `1px solid${theme.colors.gray[4]}`,
				}}
				bg="white"
				p={`${theme.spacing.sm} ${theme.spacing.md}`}
				mb={theme.spacing.sm}
			>
				<Box style={{ display: 'flex', alignItems: 'center' }}>
					<Text size="sm" fw={600} c="gray.9">
						Response {response._id}
					</Text>
				</Box>
				<Button
					variant="light"
					c="violet.7"
					color="violet.7"
					onClick={() => navigate(`/board/questionnaire/${questionnaire.sharedId}`)}
				>
					<IconExternalLink size={20} />
					<Text ml={5} fw={600} style={{ fontSize: rem(14) }}>
						Questionnaire
					</Text>
				</Button>
			</Box>
			<Box
				p="md"
				style={{
					background,
					borderRadius: theme.radius.md,
					boxShadow: theme.shadows.lg,
					border: `1px solid${theme.colors.gray[5]}`,
				}}
			>
				<Box maw={700} style={{ margin: '0 auto' }} p={`${theme.spacing.sm} 0`}>
					{response ? (
						<ResponseForm
							colorScheme="indigo"
							readMode
							questionnaireProps={buildQuestionnaireFormProps(questionnaire)}
							responseFormProps={buildResponseFormProps(response)}
						/>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}
