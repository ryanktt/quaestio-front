/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import { Box, Button, getGradient, TextInput, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { colorSchemes, IColorSchemes } from '@utils/color.ts';
import { createMarkup } from '@utils/html.ts';
import _ from 'lodash';
import { FormEvent, useEffect, useState } from 'react';
import QuestionResponseForm, { IQuestionResponseProps } from './QuestionResponseForm.tsx';
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
	const { randomizeQuestions, requireEmail, description, requireName, questions, title } = questionnaireProps;

	const theme = useMantineTheme();
	const [primaryColor, secondaryColor] = colorSchemes[colorScheme];

	useEffect(() => {
		document.documentElement.style.setProperty('--response-option-bg', theme.colors[primaryColor][7]);
		document.documentElement.style.setProperty('--response-checked-icon', theme.colors[primaryColor][6]);
		document.documentElement.style.setProperty('--response-input-bg', theme.colors[primaryColor][0]);
		document.documentElement.style.setProperty('--response-input-border', theme.colors[primaryColor][6]);
	}, [colorScheme]);

	const gradient = getGradient(
		{ deg: 30, from: theme.colors[primaryColor][6], to: theme.colors[secondaryColor][6] },
		theme,
	);

	const form = useForm<IResponseFormProps>({
		mode: 'controlled',
		initialValues: {
			name: '',
			email: '',
			questionResponses: [],
			startedAt: new Date(),
			completedAt: new Date(),
		},
	});

	useEffect(() => {
		form.setFieldValue('startedAt', new Date());
	}, []);

	const getResponse = () => form.getValues();

	const setQuestionResponse = (response: IQuestionResponseProps) => {
		const updatedResponses = [...getResponse().questionResponses];
		const foundIndex = updatedResponses.findIndex((r) => r.questionId === response.questionId);
		if (foundIndex !== -1) updatedResponses[foundIndex] = response;
		else updatedResponses.push(response);

		form.setFieldValue('questionResponses', updatedResponses);
	};

	const getQuestionInputs = (questionProps: IQuestionProps, i: number) => (
		<QuestionResponseForm
			colorScheme={colorScheme}
			questionIndex={i}
			questionProps={questionProps}
			key={questionProps.id}
			onChange={setQuestionResponse}
		/>
	);

	const [questionProps, setQuestionProps] = useState<IQuestionProps[]>([]);

	useEffect(() => {
		if (randomizeQuestions) setQuestionProps(_.shuffle(questions));
		else setQuestionProps(questions);
	}, []);

	const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		form.setFieldValue('completedAt', new Date());
		if (!form.validate().hasErrors) {
			onSubmit(form.getValues());
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
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

			{...questionProps.map(getQuestionInputs)}

			<Box className={`${styles.box} ${styles.submit}`}>
				<TextInput {...form.getInputProps('name')} label="Name" required={requireEmail} />
				<TextInput {...form.getInputProps('email')} label="Email" required={requireName} />
				<Button type="submit" mt={theme.spacing.md} style={{ background: gradient }}>
					Submit
				</Button>
			</Box>
		</form>
	);
}
