/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import { Box, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { createMarkup } from '@utils/html.ts';
import QuestionResponseForm from './QuestionResponseForm.tsx';
import { IResponseFormProps } from './ResponseForm.interface.ts';
import styles from './ResponseForm.module.scss';

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
		questions,
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
	console.log(questions);

	const questionInputs = questions.map((questionProps, i) => (
		<QuestionResponseForm
			questionIndex={i}
			questionProps={questionProps}
			key={questionProps.id}
			onChange={() => {}}
		/>
	));

	return (
		<form
			onSubmit={form.onSubmit(onSubmit)}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.lg,
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Title className={styles.title}>{title}</Title>
				<div dangerouslySetInnerHTML={createMarkup(description)} />
			</Box>
			{...questionInputs}
		</form>
	);
}
