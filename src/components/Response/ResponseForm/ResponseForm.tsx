/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface.ts';
import { RespondQuestionnaireMutation } from '@gened/graphql.ts';
import { Box, Button, Center, getGradient, TextInput, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';
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
	responseFormProps,
	colorScheme = 'indigo',
	readMode = false,
	correctedResponses,
	adminView = false,
}: {
	onSubmit?: (p: IResponseFormProps) => Promise<RespondQuestionnaireMutation | undefined | null>;
	questionnaireProps: IQuestionnaireFormProps;
	responseFormProps?: IResponseFormProps;
	readMode?: boolean;
	colorScheme?: IColorSchemes;
	correctedResponses?: IQuestionResponseProps[];
	adminView?: boolean;
}) {
	const { randomizeQuestions, requireEmail, description, requireName, questions, title } =
		questionnaireProps;

	const theme = useMantineTheme();
	const [primaryColor, secondaryColor] = colorSchemes[colorScheme];

	useEffect(() => {
		document.documentElement.style.setProperty('--response-option-bg', theme.colors[primaryColor][7]);
		document.documentElement.style.setProperty('--response-checked-icon', theme.colors[primaryColor][7]);
		document.documentElement.style.setProperty('--response-input-bg', theme.colors[primaryColor][0]);
		document.documentElement.style.setProperty('--response-input-border', theme.colors[primaryColor][7]);
	}, [colorScheme]);

	const gradient = getGradient(
		{ deg: 30, from: theme.colors[primaryColor][7], to: theme.colors[secondaryColor][7] },
		theme,
	);

	const [questionWErrorElId, setQuestionWErrorElId] = useState<string | null>(null);
	const form = useForm<IResponseFormProps>({
		mode: 'controlled',
		initialValues: responseFormProps || {
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

	const [showErrors, setShowErrors] = useState(false);

	const getQuestionInputs = (questionProps: IQuestionProps, i: number) => {
		const props = form
			.getValues()
			.questionResponses.find(({ questionId }) => questionId === questionProps.id);
		const correctedProps = correctedResponses?.find(({ questionId }) => questionId === questionProps.id);

		return (
			<QuestionResponseForm
				questionnaireType={questionnaireProps.type}
				readMode={readMode}
				questionResponseProps={props}
				correctedResponseProps={correctedProps}
				colorScheme={colorScheme}
				questionIndex={i}
				showErrors={showErrors}
				onError={(id, error) => {
					if (questionWErrorElId === id && !error) setQuestionWErrorElId(null);
					else if (error && !questionWErrorElId) setQuestionWErrorElId(id);
				}}
				adminView={adminView}
				question={questionProps}
				key={questionProps.id}
				onChange={setQuestionResponse}
			/>
		);
	};
	const [questionProps, setQuestionProps] = useState<IQuestionProps[]>([]);

	useEffect(() => {
		if (randomizeQuestions) setQuestionProps(_.shuffle(questions));
		else setQuestionProps(questions);
	}, []);

	const [submitEnabled, setSubmitEnabled] = useState(true);

	const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		setSubmitEnabled(false);

		if (!form.validate().hasErrors && !questionWErrorElId) {
			form.setFieldValue('completedAt', new Date());
			if (onSubmit) {
				const result = await onSubmit(form.getValues());
				if (result) {
					modals.openConfirmModal({
						centered: true,
						withCloseButton: false,
						overlayProps: { backgroundOpacity: 0.3, blur: 2 },
						radius: 'md',
						title: (
							<Center>
								<Title c={theme.colors[primaryColor][7]} size="xl">
									Responses succesfully submitted!
								</Title>
								<Center w={70} h={70}>
									<IconCheck color={theme.colors[primaryColor][7]} size={28} />
								</Center>
							</Center>
						),
						cancelProps: { display: 'none' },
						labels: { confirm: 'View Questionnaire', cancel: null },
						confirmProps: { color: theme.colors[primaryColor][6] },
						onConfirm() {
							window.scrollTo(0, 0);
						},
					});
				}
			}
		} else {
			setShowErrors(true);
			document
				.getElementById(questionWErrorElId || '')
				?.scrollIntoView({ behavior: 'instant', block: 'center' });
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.md,
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Title className={styles.title}>{title}</Title>
				<div dangerouslySetInnerHTML={createMarkup(description)} />
			</Box>

			{...questionProps.map(getQuestionInputs)}

			<Box className={`${styles.box} ${styles.submit}`}>
				<TextInput
					{...form.getInputProps('name')}
					label="Name"
					required={requireEmail}
					readOnly={readMode}
				/>

				<TextInput
					{...form.getInputProps('email')}
					label="Email"
					type="email"
					required={requireName}
					readOnly={readMode}
				/>

				{!readMode && submitEnabled ? (
					<Button
						disabled={!submitEnabled}
						type="submit"
						mt={theme.spacing.md}
						style={{ background: gradient }}
					>
						Submit
					</Button>
				) : null}
			</Box>
		</form>
	);
}
