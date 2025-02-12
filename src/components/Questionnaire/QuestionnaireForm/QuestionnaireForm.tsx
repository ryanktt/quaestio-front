/* eslint-disable react/prop-types */
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import DragDropItem from '@components/DragDropList/Draggable.tsx';
import QuestionAccordionForm, {
	IQuestionProps,
} from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import RichTextInput from '@components/RichText/RichText.tsx';
import { Button, Center, Checkbox, InputLabel, Select, TextInput, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import { useState } from 'react';
import { EQuestionnaireType, IQuestionnaireFormProps } from './QuestionnaireForm.interface.ts';

export default function QuestionnaireForm({
	onSubmit,
	formProps,
	title,
}: {
	onSubmit: (p: IQuestionnaireFormProps) => Promise<void>;
	formProps?: IQuestionnaireFormProps;
	title: string;
}) {
	const theme = useMantineTheme();
	const form = useForm<IQuestionnaireFormProps>({
		mode: 'controlled',
		initialValues: formProps || {
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

	const handleReorderedQuestions = (reorderedQuestions: { id: string }[]) => {
		const { questions } = form.getValues();
		const updatedQuestions = reorderedQuestions
			.map(({ id }) => questions.find((q) => q.id === id))
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

	const questionItems = form.getValues().questions.map((question, i) => (
		<DragDropItem index={i} isDragDisabled={!!onEditQuestionId} key={question.id} draggableId={question.id}>
			<QuestionAccordionForm
				badge={`Question ${i + 1}`}
				question={question}
				draggable
				onDelete={deleteQuestion}
				onSave={setQuestion}
				enableToolbarOptions={!onEditQuestionId}
				setOpen={() => (onEditQuestionId ? onEditQuestionId === question.id : null)}
				onStartEdit={(opt) => setOnEditQuestionId(opt.id)}
				onFinishEdit={() => setOnEditQuestionId(null)}
			/>
		</DragDropItem>
	));

	return (
		<div
			style={{
				padding: theme.spacing.lg,
				boxShadow: theme.shadows.md,
				width: '100%',
				backgroundColor: theme.white,
				border: '1px solid',
				borderColor: theme.colors.gray[4],
				borderRadius: theme.radius.lg,
			}}
		>
			<Title mb={theme.spacing.xl} size={24} fw={600} c={theme.colors.gray[8]}>
				{title}
			</Title>

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
				<RichTextInput
					editable={!!type}
					label="Description"
					value={form.getValues().description}
					onUpdate={(html) => {
						form.getInputProps('description').onChange(html);
					}}
					inputProps={{
						error: form.errors.description,
						required: true,
						inputWrapperOrder: ['label', 'error', 'input'],
					}}
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

				{questionItems.length ? (
					<div>
						<DragDropList orderedItems={form.getValues().questions} onReorder={handleReorderedQuestions}>
							{questionItems}
						</DragDropList>
					</div>
				) : null}

				<QuestionAccordionForm
					badge="New Question"
					method="ADD"
					draggable={false}
					onSave={setQuestion}
					enableToolbarOptions={!onEditQuestionId}
					setOpen={() => (!questionItems.length ? true : null)}
					onStartEdit={(opt) => setOnEditQuestionId(opt.id)}
					onFinishEdit={() => setOnEditQuestionId(null)}
				/>
				<Center style={{ gap: '10px' }}>
					<Button disabled={!type} w="80%" size="sm" mt="xl" type="submit" variant="gradient">
						Save {type ?? 'Questionnaire'}
					</Button>
				</Center>
			</form>
		</div>
	);
}
