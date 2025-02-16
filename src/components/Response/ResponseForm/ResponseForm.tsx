/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import { Box, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { IResponseFormProps } from './ResponseForm.interface.ts';

export default function ResponseForm({
	onSubmit,
	questionnaireProps,
}: {
	onSubmit: (p: IResponseFormProps) => Promise<void>;
	questionnaireProps: IQuestionnaireFormProps;
}) {
	const {
		// randomizeQuestions,
		// maxRetryAmount,
		// requireEmail,
		description,
		// requireName,
		// questions,
		// timeLimit,
		title,
		// type,
	} = questionnaireProps;

	const theme = useMantineTheme();
	const form = useForm<IResponseFormProps>({
		mode: 'controlled',
		initialValues: {
			name: '',
			email: '',
		},
	});

	const defaultBoxStyle = {
		padding: theme.spacing.lg,
		boxShadow: theme.shadows.md,
		width: '100%',
		backgroundColor: theme.white,
		border: '1px solid',
		borderColor: theme.colors.gray[4],
		borderRadius: theme.radius.md,
	};

	const createMarkup = (htmlString: string) => {
		return { __html: htmlString };
	};
	return (
		<form
			onSubmit={form.onSubmit(onSubmit)}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.md,
				width: '100%',
			}}
		>
			<Box style={defaultBoxStyle}>
				<Title mb={theme.spacing.xl} size={20} fw={500} c={theme.colors.gray[8]}>
					{title}
				</Title>
				<div dangerouslySetInnerHTML={createMarkup(description)} />
			</Box>
		</form>
	);
}
