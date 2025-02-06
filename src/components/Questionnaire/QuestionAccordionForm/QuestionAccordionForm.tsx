import DragDropList, { IDragDrogItemProps } from '@components/DragDropList/DragDropList';
import { QuestionType } from '@gened/graphql.ts';
import { Badge, Box, Checkbox, InputLabel, Select, Textarea, useMantineTheme } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import { GetInputPropsType } from 'node_modules/@mantine/form/lib/types';
import { useState } from 'react';
import AccordionFormItem from '../AccordionFormItem/AccordionFormItem.tsx';
import OptionAccordionForm, {
	IOptionAccordionFormProps,
	IOptionProps,
} from '../OptionAccordionForm/OptionAccordionForm.tsx';

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
	setOpen?: () => boolean | undefined;
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
	question: questionProp = initialProps,
	draggable = true,
	method = 'EDIT',
	badge,
	enableToolbarOptions = true,
	setOpen = () => undefined,
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
		initialValues: questionProp,
		validate: {
			description: hasLength({ min: 3, max: 255 }, 'Description must be 3-255 characters long'),
		},
	});
	const [isChanged, setChanged] = useState(false);
	const [onEditOptionId, setOnEditOptionId] = useState<string | null>(null);

	const { type } = form.getValues();
	const getQuestion = (): IQuestionProps => form.getValues();

	const getTypeByText = (val: (typeof typeValues)[number] | string | null) => {
		if (val === 'Single Choice') return QuestionType.SingleChoice;
		if (val === 'Multiple Choice') return QuestionType.MultipleChoice;
		if (val === 'True or False') return QuestionType.TrueOrFalse;
		return QuestionType.Text;
	};

	const getTextByType = (t: QuestionType) => {
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

	const handleReorderedOptions = (reorderedOptions: IOptionAccordionFormProps[]) => {
		const updatedOptions = reorderedOptions
			.map(({ option }) => form.getValues().options.find((opt) => opt.id === option?.id))
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

	const optionsProps = form.getValues().options.map<IDragDrogItemProps<IOptionAccordionFormProps>>((option, i) => ({
		badge: `Option ${i + 1}`,
		option,
		onDelete: deleteOption,
		key: option.id,
		onSave: setOption,
		draggable: !onEditOptionId,
		enableToolbarOptions: !onEditOptionId,
		setOpen: () => onEditOptionId === option.id,
		onStartEdit: (opt) => setOnEditOptionId(opt.id),
		onFinishEdit: () => setOnEditOptionId(null),
	}));

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
		if (method === 'ADD') {
			form.setInitialValues({ ...initialProps, id: nanoid() });
		}
		form.reset();
		onFinishEdit(getQuestion());
	};

	const saveItem = (): { preventClose?: boolean } => {
		if (!form.validate().hasErrors) {
			onSave(getQuestion());
			closeItem();
			return { preventClose: false };
		}
		return { preventClose: true };
	};

	const deleteItem = () => {
		onDelete(form.getValues().id);
	};

	const questionTypeBadge =
		method === 'EDIT' && questionProp.type ? (
			<Box display="flex" w={120} style={{ alignItems: 'center', justifyContent: 'start' }}>
				<Badge size="sm" radius="sm" variant={getBadgeVariantByType(questionProp.type)}>
					{getTextByType(questionProp.type)}
				</Badge>
			</Box>
		) : undefined;

	const validateInput = method === 'EDIT' || isChanged;

	return (
		<AccordionFormItem
			key={questionProp.id}
			badge={badge}
			toolbarComponents={questionTypeBadge ? [questionTypeBadge] : undefined}
			label={questionProp.description}
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
				value={type ? getTextByType(type) : ''}
				maw={300}
				required={validateInput}
				label="Question type"
				placeholder="Select the question type"
				data={typeValues}
			/>
			<Textarea
				{...getInputProps('description')}
				label="Question description"
				resize="vertical"
				minRows={4}
				maxRows={6}
				autosize
				error={validateInput ? form.errors.description : null}
				disabled={!type}
				required={validateInput}
				placeholder="The question description"
				inputWrapperOrder={['label', 'error', 'input']}
			/>

			{type === QuestionType.MultipleChoice ||
			type === QuestionType.SingleChoice ||
			type === QuestionType.TrueOrFalse ? (
				<>
					<Textarea
						{...getInputProps('rightAnswerFeedback')}
						label="Correct Answer Feedback"
						resize="vertical"
						disabled={!type}
						placeholder="Nice one!! :)"
						inputWrapperOrder={['label', 'error', 'input']}
					/>
					<Textarea
						{...getInputProps('wrongAnswerFeedback')}
						label="Wrong answer feedback"
						resize="vertical"
						disabled={!type}
						placeholder="Too bad :("
						inputWrapperOrder={['label', 'error', 'input']}
					/>
					<Checkbox
						{...getInputProps('showCorrectAnswer', 'checkbox')}
						disabled={!type}
						color={primaryColor}
						label="Show correct answer"
					/>
				</>
			) : null}

			{type === QuestionType.Text ? (
				<Textarea
					{...getInputProps('feedbackAfterSubmit')}
					resize="vertical"
					disabled={!type}
					placeholder="Hope you got it! The answer is..."
					inputWrapperOrder={['label', 'error', 'input']}
					label="Feedback after submit"
				/>
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
					<InputLabel>Options</InputLabel>

					{optionsProps.length ? (
						<DragDropList
							onReorder={handleReorderedOptions}
							itemsComponent={OptionAccordionForm}
							itemPropsList={optionsProps}
						/>
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
