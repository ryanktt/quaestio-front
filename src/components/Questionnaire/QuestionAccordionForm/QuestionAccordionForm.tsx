import DragDropList from '@components/DragDropList/DragDropList';
import DragDropItem from '@components/DragDropList/Draggable.tsx';
import RichTextInput from '@components/RichText/RichText.tsx';
import { QuestionType } from '@gened/graphql.ts';
import { Badge, Box, Checkbox, Select, Textarea, Title, useMantineTheme } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import { GetInputPropsType } from 'node_modules/@mantine/form/lib/types';
import { useState } from 'react';
import AccordionFormItem from '../AccordionFormItem/AccordionFormItem.tsx';
import OptionAccordionForm, { IOptionProps } from '../OptionAccordionForm/OptionAccordionForm.tsx';

type IMethod = 'ADD' | 'EDIT';

export interface IQuestionProps {
	id: string;
	type: QuestionType | null;
	description: string;
	required: boolean;
	wrongAnswerFeedback: string;
	rightAnswerFeedback: string;
	randomizeOptions: boolean;
	feedbackAfterSubmit: string;
	showCorrectAnswer: boolean;
	options: IOptionProps[];
}

export interface IQuestionAccordionFormProps {
	badge: string;
	question?: IQuestionProps;
	method?: IMethod;
	draggable?: boolean;
	enableToolbarOptions?: boolean;
	setOpen?: () => boolean | null;
	onDelete?: (optionId: string) => void;
	onSave?: (option: IQuestionProps) => void;
	onStartEdit?: (option: IQuestionProps) => void;
	onFinishEdit?: (option: IQuestionProps) => void;
}

const initialProps: IQuestionProps = {
	id: nanoid(),
	type: null,
	description: '',
	wrongAnswerFeedback: '',
	rightAnswerFeedback: '',
	feedbackAfterSubmit: '',
	showCorrectAnswer: false,
	randomizeOptions: false,
	required: false,
	options: [],
};

export default function QuestionAccordionForm({
	question: questionProps = initialProps,
	draggable = true,
	method = 'EDIT',
	badge,
	enableToolbarOptions = true,
	setOpen = () => null,
	onDelete = () => {},
	onSave = () => {},
	onStartEdit = () => {},
	onFinishEdit = () => {},
}: IQuestionAccordionFormProps) {
	const theme = useMantineTheme();
	const primaryColor = theme.colors.indigo[6];
	const typeValues = ['Single Choice', 'Multiple Choice', 'True or False', 'Text'] as const;
	const form = useForm<IQuestionProps>({
		mode: 'controlled',
		initialValues: questionProps,
		validate: {
			description: hasLength({ min: 1 }, 'Description is missing'),
		},
	});
	const { type, rightAnswerFeedback, wrongAnswerFeedback, feedbackAfterSubmit } = form.getValues();
	const getQuestion = (): IQuestionProps => form.getValues();

	const [isChanged, setChanged] = useState(false);
	const [rightAnswerFeedbackEnabled, setRightAnswerFeedbackEnabled] = useState(!!rightAnswerFeedback);
	const [wrongAnswerFeedbackEnabled, setWrongAnswerFeedbackEnabled] = useState(!!wrongAnswerFeedback);
	const [textFeedbackEnabled, setTextFeedbackEnabled] = useState(!!feedbackAfterSubmit);
	const [onEditOptionId, setOnEditOptionId] = useState<string | null>(null);

	const getTypeByText = (val: (typeof typeValues)[number] | string | null) => {
		if (val === 'Single Choice') return QuestionType.SingleChoice;
		if (val === 'Multiple Choice') return QuestionType.MultipleChoice;
		if (val === 'True or False') return QuestionType.TrueOrFalse;
		return QuestionType.Text;
	};

	const getTextByType = () => {
		const t = getQuestion().type;
		if (t === QuestionType.SingleChoice) return 'Single Choice';
		if (t === QuestionType.MultipleChoice) return 'Multiple Choice';
		if (t === QuestionType.TrueOrFalse) return 'True or False';
		if (t === QuestionType.Text) return 'Text';
		return null;
	};

	const getBadgeVariantByType = (t: QuestionType) => {
		if (t === QuestionType.SingleChoice) return 'light-teal';
		if (t === QuestionType.MultipleChoice) return 'light-grape';
		if (t === QuestionType.TrueOrFalse) return 'light-blue';
		if (t === QuestionType.Text) return 'light-orange';
		return '';
	};

	const handleReorderedOptions = (reorderedOptions: { id: string }[]) => {
		const updatedOptions = reorderedOptions
			.map(({ id }) => form.getValues().options.find((opt) => opt.id === id))
			.filter((opt): opt is IOptionProps => !!opt);

		form.setFieldValue('options', updatedOptions);
		setChanged(true);
	};

	const setOption = (upsertedOpt: IOptionProps) => {
		let foundOption;
		const updatedOptions = form.getValues().options.map((opt) => {
			if (opt.id === upsertedOpt.id) {
				foundOption = true;
				return upsertedOpt;
			}
			return opt;
		});

		if (!foundOption) updatedOptions.push(upsertedOpt);
		form.setFieldValue('options', updatedOptions);
		setChanged(true);
	};

	const deleteOption = (optionId: string) => {
		const { options } = form.getValues();
		const index = options.findIndex((opt) => opt.id === optionId);
		if (index !== -1) {
			const updatedOptions = [...options];
			updatedOptions.splice(index, 1);

			form.setFieldValue('options', updatedOptions);
			setChanged(true);
		}
	};

	const optionsProps = form.getValues().options.map((option, i) => (
		<DragDropItem index={i} isDragDisabled={!!onEditOptionId} key={option.id} draggableId={option.id}>
			<OptionAccordionForm
				badge={`Option ${i + 1}`}
				key={option.id}
				option={option}
				onDelete={deleteOption}
				onSave={setOption}
				enableToolbarOptions={!onEditOptionId}
				setOpen={() => (onEditOptionId ? onEditOptionId === option.id : null)}
				onStartEdit={(opt) => setOnEditOptionId(opt.id)}
				onFinishEdit={() => setOnEditOptionId(null)}
			/>
		</DragDropItem>
	));

	const handleChange = (e: unknown, eName: keyof IQuestionProps) => {
		const formInputProps = form.getInputProps(eName);
		let value: unknown = e;
		if (eName === 'type') value = getTypeByText(String(e));

		formInputProps.onChange(value);
		setChanged(true);
		onStartEdit(getQuestion());
	};

	const getInputProps = (name: keyof IQuestionProps, inputType: GetInputPropsType = 'input') => ({
		...form.getInputProps(name, { type: inputType }),
		onChange: (e: unknown) => handleChange(e, name),
	});

	const closeItem = () => {
		setChanged(false);
		onFinishEdit(getQuestion());
		setTimeout(() => {
			form.reset();
		}, 300);
	};

	const saveItem = (): { preventClose?: boolean } => {
		const savedQuestion = getQuestion();
		if (!form.validate().hasErrors) {
			form.setInitialValues(method === 'ADD' ? { ...initialProps, id: nanoid() } : savedQuestion);
			onSave(savedQuestion);
			closeItem();
			return { preventClose: false };
		}
		return { preventClose: true };
	};

	const deleteItem = () => {
		onDelete(form.getValues().id);
	};

	const questionTypeBadge =
		method === 'EDIT' && questionProps.type ? (
			<Box display="flex" w={120} style={{ alignItems: 'center', justifyContent: 'start' }}>
				<Badge size="sm" radius="sm" variant={getBadgeVariantByType(questionProps.type)}>
					{getTextByType()}
				</Badge>
			</Box>
		) : undefined;

	const validateInput = method === 'EDIT' || isChanged;

	return (
		<AccordionFormItem
			badge={badge}
			key={getQuestion().id}
			toolbarComponents={questionTypeBadge ? [questionTypeBadge] : undefined}
			label={questionProps.description}
			isEditing={isChanged}
			draggable={draggable}
			enableToolbarOptions={enableToolbarOptions}
			variant="filled"
			type="Question"
			method={method}
			setOpen={setOpen}
			onSave={saveItem}
			onClose={closeItem}
			onDelete={deleteItem}
		>
			<Select
				variant="default"
				{...getInputProps('type')}
				value={getTextByType()}
				maw={300}
				required={validateInput}
				label="Question type"
				placeholder="Select the question type"
				data={typeValues}
			/>
			<RichTextInput
				editable={!!type}
				label="Question description"
				value={getInputProps('description').value}
				onUpdate={(html) => getInputProps('description').onChange(html)}
				inputProps={{
					error: getInputProps('description').error,
					required: validateInput,
					inputWrapperOrder: ['label', 'error', 'input'],
				}}
			/>
			{type === QuestionType.MultipleChoice ||
			type === QuestionType.SingleChoice ||
			type === QuestionType.TrueOrFalse ? (
				<>
					<div>
						<Checkbox
							color={theme.colors.indigo[6]}
							onChange={(event) => setRightAnswerFeedbackEnabled(event.currentTarget.checked)}
							checked={rightAnswerFeedbackEnabled}
							disabled={!type}
							mb={5}
							label="Correct answer feedback"
						/>
						{rightAnswerFeedbackEnabled ? (
							<Textarea
								{...getInputProps('rightAnswerFeedback')}
								resize="vertical"
								disabled={!type}
								placeholder="Nice one!! :)"
								inputWrapperOrder={['label', 'error', 'input']}
							/>
						) : null}
					</div>

					<div>
						<Checkbox
							color={theme.colors.indigo[6]}
							onChange={(event) => setWrongAnswerFeedbackEnabled(event.currentTarget.checked)}
							checked={wrongAnswerFeedbackEnabled}
							disabled={!type}
							mb={5}
							label="Wrong answer feedback"
						/>
						{wrongAnswerFeedbackEnabled ? (
							<Textarea
								{...getInputProps('wrongAnswerFeedback')}
								resize="vertical"
								disabled={!type}
								placeholder="Too bad :("
								inputWrapperOrder={['label', 'error', 'input']}
							/>
						) : null}
					</div>

					<Checkbox
						{...getInputProps('showCorrectAnswer', 'checkbox')}
						disabled={!type}
						color={primaryColor}
						label="Show correct answer"
					/>
				</>
			) : null}

			{type === QuestionType.Text ? (
				<div>
					<Checkbox
						color={theme.colors.indigo[6]}
						onChange={(event) => setTextFeedbackEnabled(event.currentTarget.checked)}
						checked={textFeedbackEnabled}
						disabled={!type}
						mb={5}
						label="Feedback after submit"
					/>
					{textFeedbackEnabled ? (
						<Textarea
							{...getInputProps('feedbackAfterSubmit')}
							resize="vertical"
							disabled={!type}
							placeholder="Hope you got it! The answer is..."
							inputWrapperOrder={['label', 'error', 'input']}
							label="Feedback after submit"
						/>
					) : null}
				</div>
			) : null}

			<Checkbox
				{...getInputProps('required', 'checkbox')}
				disabled={!type}
				color={primaryColor}
				label="Require answer"
			/>

			{type === QuestionType.MultipleChoice || type === QuestionType.SingleChoice ? (
				<Checkbox
					{...getInputProps('randomizeOptions', 'checkbox')}
					disabled={!type}
					color={primaryColor}
					label="Randomize options"
				/>
			) : null}

			{type === QuestionType.MultipleChoice ||
			type === QuestionType.SingleChoice ||
			type === QuestionType.TrueOrFalse ? (
				<>
					<Title mt={theme.spacing.lg} size={18} fw={500} c={theme.colors.gray[8]}>
						Options
					</Title>

					{optionsProps.length ? (
						<DragDropList orderedItems={getQuestion().options} onReorder={handleReorderedOptions}>
							{optionsProps}
						</DragDropList>
					) : null}

					<OptionAccordionForm
						badge="New Option"
						method="ADD"
						onSave={setOption}
						enableToolbarOptions={!onEditOptionId}
						onStartEdit={(opt) => setOnEditOptionId(opt.id)}
						onFinishEdit={() => setOnEditOptionId(null)}
					/>
				</>
			) : null}
		</AccordionFormItem>
	);
}
