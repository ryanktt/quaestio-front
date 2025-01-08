import { Box, Button, Checkbox, Select, Text, Textarea, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import NewOption from './NewOption.tsx';
import QuestionnaireDragDropList from './DragDropList.tsx';

// interface IOption {
// 	feedbackAfterSubmit?: string;
// 	correct: boolean | null;
// 	title: string;
// }

export default function QuestionUpsert() {
	const theme = useMantineTheme();

	const form = useForm({
		initialValues: {
			type: null,
			description: '',
			wrongAnswerFeedback: '',
			rightAnswerFeedback: '',
			randomizeOptions: false,
			options: [],
		},
	});

	return (
		<Box>
			<form
				onSubmit={form.onSubmit(() => {})}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '12px',
				}}
			>
				<Select
					maw={300}
					label="Question type"
					placeholder="Select the question type"
					data={['Single Choice', 'Multiple Choice', 'True or False', 'Text']}
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

				<Text mb={0}>Options</Text>
				<Checkbox
					{...form.getInputProps('randomizeOptions')}
					defaultChecked={false}
					color={theme.colors.indigo[6]}
					label="Randomize options"
				/>
				<QuestionnaireDragDropList />
				<Button
					style={{ padding: '0 8px', color: theme.colors.indigo[7], borderColor: theme.colors.indigo[7] }}
					variant="outline"
					radius="sm"
					w="50%"
					size="sm"
				>
					New Option
				</Button>

				<NewOption />
			</form>
		</Box>
	);
}
