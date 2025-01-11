import { QuestionType } from '@utils/generated/graphql.ts';
import { Button, Checkbox, Select, Text, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import NewOption, { INewOptionProps } from './NewOption.tsx';
import '@mantine/core/styles.css';
import QuestionnaireListItem, { IQuestionnaireListItemProps } from './QuestionnaireListItem.tsx';

export interface INewQuestionProps {
	id: string;
	type: QuestionType | null;
	description: string;
	wrongAnswerFeedback: string;
	rightAnswerFeedback: string;
	randomizeOptions: boolean;
	options: INewOptionProps[];
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

	const [newOptionOpen, setNewOptionOpen] = useState(false);
	const form = useForm<INewQuestionProps>({
		initialValues: {
			id: nanoid(),
			type: null,
			description: '',
			wrongAnswerFeedback: '',
			rightAnswerFeedback: '',
			randomizeOptions: false,
			options: [],
		},
		validate: {
			description: hasLength({ min: 3, max: 255 }, 'Description must be 3-255 characters long'),
		},
	});

	const { type, options } = form.getValues();

	const getType = (val: (typeof typeValues)[number] | string | null) => {
		if (val === 'Single Choice') return QuestionType.SingleChoice;
		if (val === 'Multiple Choice') return QuestionType.MultipleChoice;
		if (val === 'True or False') return QuestionType.TrueOrFalse;
		return QuestionType.Text;
	};

	const handleTypeChange = (val: string | null) => {
		form.setFieldValue('type', getType(val));
	};

	const handleReorderedOptions = (reorderedOptions: { id: string }[]) => {
		const updatedOptions = reorderedOptions
			.map(({ id }) => options.find((opt) => opt.id === id))
			.filter((opt): opt is INewOptionProps => !!opt);

		form.setFieldValue('options', updatedOptions);
	};

	const setOption = (newOpt: INewOptionProps) => {
		let foundOption;
		const updatedOptions = form.getValues().options.map((opt) => {
			if (opt.id === newOpt.id) {
				foundOption = true;
				return newOpt;
			}
			return opt;
		});

		if (!foundOption) updatedOptions.push(newOpt);

		form.setFieldValue('options', updatedOptions);
		setNewOptionOpen(false);
	};

	const optionsProps = options.map<IQuestionnaireListItemProps>((option, i) => ({
		id: option.id,
		badge: `Option ${i + 1}`,
		description: option.title,
	}));

	return (
		<div style={{ margin: '15px 0' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
				<div />
				<div>
					<Tooltip label="Cancel">
						<Button mr={theme.spacing.sm} variant="gradient-red" size="xs" p="0 10px" onClick={onCancel}>
							<IconX size={18} />
						</Button>
					</Tooltip>
					<Tooltip label="Add Option">
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
					gap: '12px',
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
					{...form.getInputProps('randomizeOptions')}
					defaultChecked={false}
					disabled={!type}
					color={theme.colors.indigo[6]}
					label="Randomize options"
				/>
				<Text fw="600" mt={theme.spacing.sm} c={theme.colors.indigo[7]}>
					Options
				</Text>

				{optionsProps.length ? (
					<DragDropList
						onReorder={handleReorderedOptions}
						itemsComponent={QuestionnaireListItem}
						itemPropsList={optionsProps}
					/>
				) : null}

				<Button
					w="50%"
					color={theme.colors.indigo[7]}
					variant="outline"
					radius="sm"
					display={newOptionOpen ? 'none' : 'block'}
					disabled={!type}
					onClick={() => {
						setNewOptionOpen(true);
					}}
					size="sm"
				>
					New Option
				</Button>

				{newOptionOpen ? <NewOption onCancel={() => setNewOptionOpen(false)} onNewOption={setOption} /> : null}
			</div>
		</div>
	);
}
