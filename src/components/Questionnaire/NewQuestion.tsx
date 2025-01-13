import { Button, Checkbox, Select, Text, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import { QuestionType } from '@utils/generated/graphql.ts';
import { IconCheck, IconX } from '@tabler/icons-react';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import OptionListItem, { IOptionProps, IUpsertOptionProps } from './UpsertOption.tsx';
import '@mantine/core/styles.css';

export interface INewQuestionProps {
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

export default function QuestionUpsert({
	onNewQuestion,
	onCancel,
}: {
	onNewQuestion: (opt: INewQuestionProps) => void;
	onCancel: () => void;
}) {
	const typeValues = ['Single Choice', 'Multiple Choice', 'True or False', 'Text'] as const;
	const theme = useMantineTheme();

	const form = useForm<INewQuestionProps>({
		initialValues: {
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
		},
		validate: {
			description: hasLength({ min: 3, max: 255 }, 'Description must be 3-255 characters long'),
		},
	});

	const { type } = form.getValues();

	const getType = (val: (typeof typeValues)[number] | string | null) => {
		if (val === 'Single Choice') return QuestionType.SingleChoice;
		if (val === 'Multiple Choice') return QuestionType.MultipleChoice;
		if (val === 'True or False') return QuestionType.TrueOrFalse;
		return QuestionType.Text;
	};

	const handleTypeChange = (val: string | null) => {
		form.reset();
		form.setFieldValue('type', getType(val));
	};

	const handleReorderedOptions = (reorderedOptions: IUpsertOptionProps[]) => {
		const updatedOptions = reorderedOptions
			.map(({ option }) => form.getValues().options.find((opt) => opt.id === option?.id))
			.filter((opt): opt is IOptionProps => !!opt);

		form.setFieldValue('options', updatedOptions);
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
	};

	const deleteOption = (optionId: string) => {
		const { options } = form.getValues();
		const index = options.findIndex((opt) => opt.id === optionId);
		if (index !== -1) {
			const updatedOptions = [...options];
			updatedOptions.splice(index, 1);

			form.setFieldValue('options', updatedOptions);
		}
	};

	const optionsProps = form.getValues().options.map<IUpsertOptionProps>((option, i) => ({
		badge: `Option ${i + 1}`,
		onDelete: deleteOption,
		onSet: setOption,
		option,
	}));

	return (
		<div style={{ margin: '15px 0' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
				<div />
				<div>
					<Tooltip label="Cancel">
						<Button mr={theme.spacing.xs} variant="gradient-red" size="xs" p="0 10px" onClick={onCancel}>
							<IconX size={18} />
						</Button>
					</Tooltip>
					<Tooltip label="Add Question">
						<Button
							variant="gradient-teal"
							p="0 10px"
							size="xs"
							onClick={() => {
								if (!form.validate().hasErrors) {
									onNewQuestion(form.getValues());
								}
							}}
						>
							<IconCheck size={18} />
						</Button>
					</Tooltip>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: theme.spacing.md,
				}}
			>
				<Select
					variant="default"
					onChange={handleTypeChange}
					maw={300}
					label="Question type"
					placeholder="Select the question type"
					data={typeValues}
				/>
				<Textarea
					{...form.getInputProps('description')}
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
							{...form.getInputProps('rightAnswerFeedback')}
							label="Correct Answer Feedback"
							resize="vertical"
							disabled={!type}
							placeholder="Nice one!! :)"
							inputWrapperOrder={['label', 'error', 'input']}
						/>
						<Textarea
							{...form.getInputProps('wrongAnswerFeedback')}
							label="Wrong answer feedback"
							resize="vertical"
							disabled={!type}
							placeholder="Too bad :("
							inputWrapperOrder={['label', 'error', 'input']}
						/>
						<Checkbox
							{...form.getInputProps('showCorrectAnswer')}
							defaultChecked={false}
							disabled={!type}
							color={theme.colors.indigo[6]}
							label="Show correct answer"
						/>
					</>
				) : null}

				{type === QuestionType.Text ? (
					<Textarea
						{...form.getInputProps('feedbackAfterSubmit')}
						resize="vertical"
						disabled={!type}
						placeholder="Hope you got it! The answer is..."
						inputWrapperOrder={['label', 'error', 'input']}
						label="Feedback after submit"
					/>
				) : null}

				<Checkbox
					{...form.getInputProps('required')}
					defaultChecked={false}
					disabled={!type}
					color={theme.colors.indigo[6]}
					label="Require answer"
				/>

				{type === QuestionType.MultipleChoice || type === QuestionType.SingleChoice ? (
					<Checkbox
						{...form.getInputProps('randomizeOptions')}
						defaultChecked={false}
						disabled={!type}
						color={theme.colors.indigo[6]}
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
								itemsComponent={OptionListItem}
								itemPropsList={optionsProps}
							/>
						) : null}

						<OptionListItem badge="New Option" method="ADD" draggable={false} onSet={setOption} />
					</>
				) : null}
			</div>
		</div>
	);
}
