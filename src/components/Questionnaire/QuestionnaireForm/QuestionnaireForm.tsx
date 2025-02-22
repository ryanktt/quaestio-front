/* eslint-disable react/prop-types */
import ColorSelect, { IColorOption } from '@components/ColorSelect/ColorSelect.tsx';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import DragDropItem from '@components/DragDropList/Draggable.tsx';
import QuestionAccordionForm, {
	IQuestionProps,
} from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import RichTextInput from '@components/RichText/RichText.tsx';
import { AlertContext } from '@contexts/Alert/Alert.context.tsx';
import {
	Box,
	Button,
	Center,
	Checkbox,
	NumberInput,
	rem,
	Select,
	TextInput,
	Title,
	useMantineTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import { colorSchemes } from '@utils/color.ts';
import moment from 'moment';
import { nanoid } from 'nanoid/non-secure';
import { FormEvent, useContext, useMemo, useState } from 'react';
import { EQuestionnaireType, IQuestionnaireFormProps } from './QuestionnaireForm.interface.ts';

export default function QuestionnaireForm({
	onSubmit,
	formProps,
	title,
	method = 'ADD',
}: {
	onSubmit: (p: IQuestionnaireFormProps) => Promise<void>;
	formProps?: IQuestionnaireFormProps;
	title: string;
	method?: 'EDIT' | 'ADD';
}) {
	const { setAlert } = useContext(AlertContext).state;
	const theme = useMantineTheme();
	const form = useForm<IQuestionnaireFormProps>({
		mode: 'controlled',
		initialValues: formProps || {
			type: null,
			title: '',
			description: '',
			requireEmail: false,
			requireName: false,
			maxRetryAmount: '',
			randomizeQuestions: '',
			timeLimit: '',
			questions: [],
			bgColor: null,
			color: 'indigo',
		},
		validateInputOnBlur: true,
		validate: {
			title: hasLength({ min: 1 }, 'Title is missing'),
			description: hasLength({ min: 1 }, 'Description is missing'),
		},
	});
	const getQuestionnaire = () => form.getValues();
	const { type } = getQuestionnaire();
	const [onEditQuestionId, setOnEditQuestionId] = useState<string | null>(null);
	const [maxRetryInputEnabled, setMaxRetryInputEnabled] = useState(!!getQuestionnaire().maxRetryAmount);

	const colorPickerOptions = useMemo(() => {
		return Object.entries(colorSchemes).map(([colorName, [primaryColor]]) => ({
			value: theme.colors[primaryColor][6],
			label: colorName,
		}));
	}, [colorSchemes]);

	const bgColorPickerOptions = useMemo(() => {
		return [
			{ label: 'default', value: 'transparent' },
			{ label: 'white', value: theme.white },
			{ label: 'black', value: theme.colors.dark[8] },
		];
	}, [getQuestionnaire().color]);

	const handleBgColorUpdate = (colorOption: IColorOption) => {
		let bgColor: string | null = colorOption.label;
		if (colorOption.value === 'transparent') bgColor = method === 'ADD' ? '' : null;
		form.setFieldValue('bgColor', bgColor);
	};

	const setTimeLimitInputInitialValues = (): {
		enabled: boolean;
		amount?: number;
	} => {
		const { timeLimit } = getQuestionnaire();
		const minutes = timeLimit ? moment.duration(timeLimit, 'milliseconds').asMinutes() : undefined;
		return {
			enabled: !!timeLimit,
			amount: minutes,
		};
	};

	const [timeLimitInput, setTimeLimitInput] = useState(setTimeLimitInputInitialValues());

	const updateTimeLimitInput = (params: { amount?: number; enabled?: boolean }) => {
		const { amount, enabled } = params;

		const state = {
			...timeLimitInput,
			enabled: enabled ?? timeLimitInput.enabled,
			amount: amount || timeLimitInput.amount,
		};
		setTimeLimitInput(state);
		if (state.enabled && state.amount) {
			form.setFieldValue('timeLimit', moment.duration(state.amount, 'minutes').asMilliseconds());
		}
	};

	const handleReorderedQuestions = (reorderedQuestions: { id: string }[]) => {
		const { questions } = getQuestionnaire();
		const updatedQuestions = reorderedQuestions
			.map(({ id }) => questions.find((q) => q.id === id))
			.filter((question): question is IQuestionProps => !!question);

		form.setFieldValue('questions', updatedQuestions);
	};

	const setQuestion = (newQuestion: IQuestionProps) => {
		let foundQuestion;
		const updatedQuestions = getQuestionnaire().questions.map((question) => {
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
		const { questions } = getQuestionnaire();
		const index = questions.findIndex((question) => question.id === questionId);
		if (index !== -1) {
			const updatedQuestions = [...questions];
			updatedQuestions.splice(index, 1);

			form.setFieldValue('questions', updatedQuestions);
		}
	};

	const questionItems = getQuestionnaire().questions.map((question, i) => (
		<DragDropItem index={i} isDragDisabled={!!onEditQuestionId} key={question.id} draggableId={question.id}>
			<QuestionAccordionForm
				badge={`Question ${i + 1}`}
				question={question}
				key={question.id}
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

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const questionnaire = getQuestionnaire();
		if (!questionnaire.questions.length) {
			setAlert({
				id: nanoid(),
				type: 'ERROR',
				message: 'No question was added for this questionnaire',
				title: 'Missing Question',
				timeout: 3000,
			});
			return;
		}
		if (onEditQuestionId) {
			setAlert({
				id: nanoid(),
				type: 'ERROR',
				message: 'Questionnaire has pending unsaved question changes',
				title: 'Unsaved Question',
				timeout: 3000,
			});
			return;
		}
		if (!form.validate().hasErrors) {
			onSubmit(questionnaire);
		}
	};

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
			<Title mb={theme.spacing.xl} size={rem(24)} fw={600} c={theme.colors.gray[8]}>
				{title}
			</Title>

			<form
				onSubmit={handleFormSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: theme.spacing.md,
				}}
			>
				{method === 'ADD' ? (
					<Select
						{...form.getInputProps('type')}
						maw={300}
						label="Questionnaire type"
						required
						placeholder="Select the questionnaire type"
						data={[EQuestionnaireType.Exam, EQuestionnaireType.Quiz, EQuestionnaireType.Survey]}
					/>
				) : null}

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
					value={form.getInputProps('description').value}
					onUpdate={(html) => {
						form.getInputProps('description').onChange(html);
					}}
					inputProps={{
						...form.getInputProps('description'),
						required: true,
						inputWrapperOrder: ['label', 'error', 'input'],
					}}
				/>

				<Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: rem(15) }}>
					<ColorSelect
						label="Form color"
						selectedColorLabel={getQuestionnaire().color}
						colorOptions={colorPickerOptions}
						onSelected={(c) => form.setFieldValue('color', c.label)}
					/>
					<ColorSelect
						label="Background color"
						selectedColorLabel={getQuestionnaire().bgColor || ''}
						colorOptions={bgColorPickerOptions}
						onSelected={handleBgColorUpdate}
					/>
				</Box>

				{type === 'Exam' ? (
					<>
						<div>
							<Checkbox
								color={theme.colors.indigo[6]}
								onChange={(event) => updateTimeLimitInput({ enabled: event.currentTarget.checked })}
								checked={timeLimitInput.enabled}
								value={0}
								mb={5}
								disabled={!type}
								label="Time limit"
							/>
							{timeLimitInput.enabled ? (
								<div style={{ display: 'flex', gap: '10px' }}>
									<NumberInput
										value={timeLimitInput.amount}
										onChange={(amount) =>
											updateTimeLimitInput({ amount: amount ? Number(amount) : undefined })
										}
										required
										placeholder="The time limit in minutes"
										suffix=" minutes"
										w={250}
										min={1}
									/>
								</div>
							) : null}
						</div>
						<div>
							<Checkbox
								color={theme.colors.indigo[6]}
								onChange={(event) => setMaxRetryInputEnabled(event.currentTarget.checked)}
								checked={maxRetryInputEnabled}
								disabled={!type}
								mb={5}
								label="Retry limit"
							/>
							{maxRetryInputEnabled ? (
								<NumberInput
									{...form.getInputProps('maxRetryAmount')}
									required
									placeholder="The max retry count"
									w={250}
									min={0}
								/>
							) : null}
						</div>
						<Checkbox
							{...form.getInputProps('randomizeQuestions')}
							color={theme.colors.indigo[6]}
							disabled={!type}
							label="Shuffle questions"
						/>
					</>
				) : null}
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

				<Title mt={theme.spacing.lg} size={18} fw={600} c={theme.colors.gray[8]}>
					Questions
				</Title>

				{questionItems.length ? (
					<div>
						<DragDropList orderedItems={getQuestionnaire().questions} onReorder={handleReorderedQuestions}>
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
