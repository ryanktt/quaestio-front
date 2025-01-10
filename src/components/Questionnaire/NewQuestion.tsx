import { QuestionType } from '@utils/generated/graphql.ts';
import { Button, Checkbox, Select, Text, Textarea, useMantineTheme } from '@mantine/core';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import NewOption, { INewOptionProps } from './NewOption.tsx';
import '@mantine/core/styles.css';
import QuestionnaireListItem, { IQuestionnaireListItemProps } from './QuestionnaireListItem.tsx';

interface INewQuestionProps {
	type: QuestionType | null;
	description: string | null;
	wrongAnswerFeedback: string;
	rightAnswerFeedback: string;
	randomizeOptions: boolean;
	options: INewOptionProps[];
}

export default function QuestionUpsert() {
	const typeValues = ['Single Choice', 'Multiple Choice', 'True or False', 'Text'] as const;
	const theme = useMantineTheme();

	const [newOptionOpen, setNewOptionOpen] = useState(true);
	const form = useForm<INewQuestionProps>({
		initialValues: {
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
					required
					placeholder="The question description"
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('rightAnswerFeedback')}
					label="Correct Answer Feedback"
					placeholder="Nice one!! :)"
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('description')}
					label="Wrong answer feedback"
					resize="vertical"
					placeholder="Too bad :("
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Text fw={600} c={theme.colors.indigo[8]}>
					Options
				</Text>
				<Checkbox
					{...form.getInputProps('randomizeOptions')}
					defaultChecked={false}
					color={theme.colors.indigo[6]}
					label="Randomize options"
				/>
				{optionsProps.length ? (
					<div>
						<DragDropList
							onReorder={handleReorderedOptions}
							itemsComponent={QuestionnaireListItem}
							itemPropsList={optionsProps}
						/>
					</div>
				) : null}

				<Button
					style={{ padding: '0 8px', color: theme.colors.indigo[7], borderColor: theme.colors.indigo[7] }}
					c={theme.colors.indigo[7]}
					variant="outline"
					radius="sm"
					w="50%"
					display={newOptionOpen ? 'none' : 'block'}
					disabled={newOptionOpen}
					onClick={() => {
						setNewOptionOpen(true);
					}}
					size="sm"
				>
					New Option
				</Button>

				{newOptionOpen ? <NewOption onNewOption={setOption} /> : null}
			</div>
		</div>
	);
}
