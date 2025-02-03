/* eslint-disable react/prop-types */
import {
	Button,
	Center,
	Checkbox,
	Select,
	InputLabel,
	TextInput,
	Textarea,
	Title,
	useMantineTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import DragDropList, { IDragDrogItemProps } from '@components/DragDropList/DragDropList.tsx';
import { useState } from 'react';
import QuestionAccordionForm, {
	IQuestionAccordionFormProps,
	IQuestionProps,
} from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { EQuestionnaireType, IQuestionnaireFormProps } from './QuestionnaireForm.interface.ts';

export default function QuestionnaireForm({
	onSubmit,
	title,
}: {
	onSubmit: (p: IQuestionnaireFormProps) => Promise<void>;
	title: string;
}) {
	const theme = useMantineTheme();
	const form = useForm<IQuestionnaireFormProps>({
		mode: 'controlled',
		initialValues: {
			type: null,
			title: '',
			description: '',
			requireEmail: false,
			requireName: false,
			questions: [],
		},
		validate: {
			title: hasLength({ min: 3, max: 255 }, 'Title must be 3-255 characters long'),
			description: hasLength({ min: 3 }, 'Description must be at least 3 characters long'),
		},
	});
	const { type } = form.getValues();
	const [onEditQuestionId, setOnEditQuestionId] = useState<string | null>(null);

	const handleReorderedQuestions = (reorderedQuestions: IQuestionAccordionFormProps[]) => {
		const { questions } = form.getValues();
		const updatedQuestions = reorderedQuestions
			.map(({ question }) => questions.find((q) => q.id === question?.id))
			.filter((question): question is IQuestionProps => !!question);

		form.setFieldValue('questions', updatedQuestions);
	};

	const setQuestion = (newQuestion: IQuestionProps) => {
		let foundQuestion;
		const updatedQuestions = form.getValues().questions.map((question) => {
			if (question.id === newQuestion.id) {
				foundQuestion = true;
				return newQuestion;
			}
			return question;
		});
		if (!foundQuestion) updatedQuestions.push(newQuestion);

		form.setFieldValue('questions', updatedQuestions);
	};

	const deleteQuestion = (questionId: string) => {
		const { questions } = form.getValues();
		const index = questions.findIndex((question) => question.id === questionId);
		if (index !== -1) {
			const updatedQuestions = [...questions];
			updatedQuestions.splice(index, 1);

			form.setFieldValue('questions', updatedQuestions);
		}
	};

	const questionsProps = form
		.getValues()
		.questions.map<IDragDrogItemProps<IQuestionAccordionFormProps>>((question, i) => ({
			question,
			key: question.id,
			badge: `Question ${i + 1}`,
			onDelete: deleteQuestion,
			onSave: setQuestion,
			draggable: !onEditQuestionId,
			enableToolbarOptions: !onEditQuestionId,
			setOpen: () => onEditQuestionId === question.id,
			onStartEdit: (opt) => setOnEditQuestionId(opt.id),
			onFinishEdit: () => setOnEditQuestionId(null),
		}));

	return (
		<div
			style={{
				padding: theme.spacing.lg,
				boxShadow: theme.shadows.md,
				width: '100%',
				border: '1px solid',
				borderColor: theme.colors.gray[4],
				borderRadius: theme.radius.lg,
			}}
		>
			<Center>
				<Title mb={theme.spacing.xl} size={19}>
					{title}
				</Title>
			</Center>

			<form
				onSubmit={form.onSubmit(onSubmit)}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: theme.spacing.md,
				}}
			>
				<Select
					{...form.getInputProps('type')}
					maw={300}
					label="Questionnaire type"
					required
					placeholder="Select the questionnaire type"
					data={[EQuestionnaireType.Exam, EQuestionnaireType.Quiz, EQuestionnaireType.Survey]}
				/>
				<TextInput
					{...form.getInputProps('title')}
					label="Title"
					disabled={!type}
					required
					placeholder={`The ${type ?? 'Questionnaire'} title`}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('description')}
					label="Description"
					resize="vertical"
					required
					disabled={!type}
					placeholder={`The ${type ?? 'Questionnaire'} description`}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Checkbox
					{...form.getInputProps('requireEmail', { type: 'checkbox' })}
					color={theme.colors.indigo[6]}
					disabled={!type}
					label="Require user email"
				/>
				<Checkbox
					{...form.getInputProps('requireName', { type: 'checkbox' })}
					color={theme.colors.indigo[6]}
					disabled={!type}
					label="Require user name"
				/>

				<InputLabel>Questions</InputLabel>

				{questionsProps.length ? (
					<div>
						<DragDropList
							onReorder={handleReorderedQuestions}
							itemsComponent={QuestionAccordionForm}
							itemPropsList={questionsProps}
						/>
					</div>
				) : null}

				<QuestionAccordionForm
					badge="New Question"
					method="ADD"
					draggable={false}
					onSave={setQuestion}
					enableToolbarOptions={!onEditQuestionId}
					setOpen={() => (!questionsProps.length ? true : undefined)}
					onStartEdit={(opt) => setOnEditQuestionId(opt.id)}
					onFinishEdit={() => setOnEditQuestionId(null)}
				/>
				<Center style={{ gap: '10px' }}>
					<Button disabled={!type} w="80%" size="sm" mt="xl" type="submit" variant="gradient">
						Create {type ?? 'Questionnaire'}
					</Button>
				</Center>
			</form>
		</div>
	);
}
