import { QuestionType } from '@utils/generated/graphql.ts';
import { Button, Checkbox, Select, Text, Textarea, useMantineTheme } from '@mantine/core';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import { useForm } from '@mantine/form';
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
	});

	const { options } = form.getValues();

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
		badge: `O.${i + 1}`,
		description: option.title,
	}));

	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
				<div />
				<div>
					<Button
						style={{ color: theme.colors.pink[6], borderColor: theme.colors.pink[3] }}
						mr={theme.spacing.sm}
						variant="outline"
						size="sm"
						p="0 10px"
						onClick={onCancel}
					>
						<IconX />
					</Button>
					<Button
						style={{ color: theme.colors.teal[6], borderColor: theme.colors.teal[3] }}
						variant="default"
						p="0 10px"
						styles={{ root: { '&:hover': { backgroundColor: theme.colors.teal[9] } } }}
						size="sm"
						onClick={() => {
							if (!form.validate().hasErrors) {
								onNewQuestion(form.getValues());
							}
						}}
					>
						<p style={{ marginRight: theme.spacing.sm }}>Add Question</p>
						<IconCheck />
					</Button>
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
					required
					placeholder="The question description"
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('rightAnswerFeedback')}
					label="Correct Answer Feedback"
					resize="vertical"
					placeholder="Nice one!! :)"
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('wrongAnswerFeedback')}
					label="Wrong answer feedback"
					resize="vertical"
					placeholder="Too bad :("
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Checkbox
					{...form.getInputProps('randomizeOptions')}
					defaultChecked={false}
					color={theme.colors.indigo[6]}
					label="Randomize options"
				/>
				<Text fw="600" mt={theme.spacing.sm} c={theme.colors.indigo[7]}>
					Options
				</Text>

				<Button
					style={{ padding: '0 8px', color: theme.colors.indigo[7], borderColor: theme.colors.indigo[7] }}
					w="50%"
					c={theme.colors.indigo[7]}
					variant="outline"
					radius="sm"
					display={newOptionOpen ? 'none' : 'block'}
					onClick={() => {
						setNewOptionOpen(true);
					}}
					size="sm"
				>
					New Option
				</Button>
				{optionsProps.length ? (
					<DragDropList
						onReorder={handleReorderedOptions}
						itemsComponent={QuestionnaireListItem}
						itemPropsList={optionsProps}
					/>
				) : null}

				{newOptionOpen ? <NewOption onCancel={() => setNewOptionOpen} onNewOption={setOption} /> : null}
			</div>
		</div>
	);
}
