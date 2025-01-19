import { Badge, Button, Checkbox, Select, Text, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconGripVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { hasLength, useForm } from '@mantine/form';
import { QuestionType } from '@gened/graphql.ts';
import DragDropList from '@components/DragDropList/DragDropList';
import { GetInputPropsType } from 'node_modules/@mantine/form/lib/types';
import classes from './UpsertQuestion.module.scss';
import UpsertOption, { IOptionProps, IUpsertOptionProps } from '../UpsertOption/UpsertOption.tsx';

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

export interface IUpsertQuestionProps {
	badge: string;
	question?: IQuestionProps;
	method?: IMethod;
	draggable?: boolean;
	onDelete?: (optionId: string) => void;
	onSet?: (option: IQuestionProps) => void;
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

export default function UpsertQuestion({
	question: questionProp = initialProps,
	draggable = true,
	method = 'EDIT',
	badge,
	onDelete = () => {},
	onSet = () => {},
}: IUpsertQuestionProps) {
	const theme = useMantineTheme();
	const buttonStyleProps = { variant: 'subtle', size: 'md', color: theme.colors.indigo[0], p: '0 15px' };
	const primaryColor = theme.colors.indigo[6];

	const typeValues = ['Single Choice', 'Multiple Choice', 'True or False', 'Text'] as const;
	const form = useForm<IQuestionProps>({
		mode: 'controlled',
		initialValues: questionProp,
		validate: {
			description: hasLength({ min: 3, max: 255 }, 'Description must be 3-255 characters long'),
		},
	});
	const [isOpen, setOpen] = useState(false);
	const [isChanged, setChanged] = useState(false);

	const { type } = form.getValues();
	const getQuestion = (): IQuestionProps => form.getValues();

	const getTypeByText = (val: (typeof typeValues)[number] | string | null) => {
		if (val === 'Single Choice') return QuestionType.SingleChoice;
		if (val === 'Multiple Choice') return QuestionType.MultipleChoice;
		if (val === 'True or False') return QuestionType.TrueOrFalse;
		return QuestionType.Text;
	};

	const getTextByType = () => {
		if (type === QuestionType.SingleChoice) return 'Single Choice';
		if (type === QuestionType.MultipleChoice) return 'Multiple Choice';
		if (type === QuestionType.TrueOrFalse) return 'True or False';
		if (type === QuestionType.Text) return 'Text';
		return null;
	};

	const handleTypeChange = (val: string | null) => {
		form.reset();
		form.setFieldValue('type', getTypeByText(val));
	};

	const handleReorderedOptions = (reorderedOptions: IUpsertOptionProps[]) => {
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

	const optionsProps = form.getValues().options.map<IUpsertOptionProps>((option, i) => ({
		badge: `Option ${i + 1}`,
		onDelete: deleteOption,
		onSet: setOption,
		option,
	}));

	const handleChange = (e: ChangeEvent, name: keyof IQuestionProps) => {
		form.getInputProps(name).onChange(e);
		setChanged(true);
	};

	const getInputProps = (name: keyof IQuestionProps, inputType: GetInputPropsType = 'input') => ({
		...form.getInputProps(name, { type: inputType }),
		onChange: (e: ChangeEvent) => handleChange(e, name),
	});

	const closeItem = () => {
		setOpen(false);
		setChanged(false);
		form.reset();
		if (method === 'ADD') {
			form.setInitialValues({ ...initialProps, id: nanoid() });
			form.reset();
		}
	};

	const setItem = () => {
		if (!form.validate().hasErrors) {
			onSet(getQuestion());
			closeItem();
		}
	};

	const getItemButtons = () => {
		if (isOpen) {
			return (
				<>
					<Tooltip label="Cancel">
						<Button onClick={closeItem} {...buttonStyleProps}>
							<IconX size={18} />
						</Button>
					</Tooltip>
					{isChanged ? (
						<Tooltip label="Save">
							<Button onClick={setItem} {...buttonStyleProps}>
								<IconCheck size={18} />
							</Button>
						</Tooltip>
					) : null}
				</>
			);
		}
		if (method === 'ADD') {
			return (
				<Tooltip label="Add Question">
					<Button onClick={() => setOpen(true)} {...buttonStyleProps}>
						<IconPlus size={18} />
					</Button>
				</Tooltip>
			);
		}
		if (method === 'EDIT') {
			return (
				<>
					<Tooltip label="Delete Option">
						<Button onClick={() => onDelete(getQuestion().id)} {...buttonStyleProps}>
							<IconTrash size={18} />
						</Button>
					</Tooltip>
					<Tooltip label="Edit Option">
						<Button onClick={() => setOpen(true)} {...buttonStyleProps}>
							<IconEdit size={18} />
						</Button>
					</Tooltip>
				</>
			);
		}
		return null;
	};

	return (
		<div className={classes.item}>
			<div className={classes.toolbar}>
				{draggable ? <IconGripVertical className={classes.dragIcon} size={18} stroke={1.5} /> : null}
				<div className={classes.toolbarElements}>
					<div className={classes.toolbarContent}>
						<Badge variant="white" className={classes.badge} size="md" ml={!draggable ? 10 : 0}>
							{badge}
						</Badge>
						<Text className={classes.toolbarDescription} size="sm">
							{questionProp.description}
						</Text>
					</div>
					<div className={classes.toolbarButtons}>{getItemButtons()}</div>
				</div>
			</div>

			{isOpen ? (
				<div className={classes.form}>
					<Select
						variant="default"
						onChange={handleTypeChange}
						value={getTextByType()}
						maw={300}
						label="Question type"
						placeholder="Select the question type"
						data={typeValues}
					/>
					<Textarea
						{...getInputProps('description')}
						label="Question description"
						resize="vertical"
						error={form.errors.description}
						disabled={!type}
						required
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
							<Text fw="600" mt={theme.spacing.sm} c={theme.colors.indigo[7]}>
								Options
							</Text>

							{optionsProps.length ? (
								<DragDropList
									onReorder={handleReorderedOptions}
									itemsComponent={UpsertOption}
									itemPropsList={optionsProps}
								/>
							) : null}

							<UpsertOption badge="New Option" method="ADD" draggable={false} onSet={setOption} />
						</>
					) : null}
				</div>
			) : null}
		</div>
	);
}
