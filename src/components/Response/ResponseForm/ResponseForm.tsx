/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import { Box, Button, getGradient, TextInput, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { colorSchemes, IColorSchemes } from '@utils/color.ts';
import { createMarkup } from '@utils/html.ts';
import { useEffect } from 'react';
import QuestionResponseForm from './QuestionResponseForm.tsx';
import { IResponseFormProps } from './ResponseForm.interface.ts';
import styles from './ResponseForm.module.scss';

export default function ResponseForm({
	onSubmit,
	questionnaireProps,
	colorScheme = 'indigo',
}: {
	onSubmit: (p: IResponseFormProps) => Promise<void>;
	questionnaireProps: IQuestionnaireFormProps;
	colorScheme?: IColorSchemes;
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
	const [primaryColor, secondaryColor] = colorSchemes[colorScheme];

	useEffect(() => {
		document.documentElement.style.setProperty('--response-option-bg', theme.colors[primaryColor][7]);
		document.documentElement.style.setProperty('--response-checked-icon', theme.colors[primaryColor][6]);
		document.documentElement.style.setProperty('--response-input-bg', theme.colors[primaryColor][0]);
		document.documentElement.style.setProperty('--response-input-border', theme.colors[primaryColor][6]);
	}, []);

	const gradient = getGradient(
		{ deg: 30, from: theme.colors[primaryColor][6], to: theme.colors[secondaryColor][6] },
		theme,
	);

	const form = useForm<IResponseFormProps>({
		mode: 'controlled',

		initialValues: {
			name: '',
			email: '',
		},
	});

	const questionInputs = questions.map((questionProps, i) => (
		<QuestionResponseForm
			colorScheme={colorScheme}
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
			<Box className={`${styles.box} ${styles.submit}`}>
				<TextInput label="Name" />
				<TextInput label="Email" />
				<Button mt={theme.spacing.md} style={{ background: gradient }}>
					Submit
				</Button>
			</Box>
		</form>
	);
}
