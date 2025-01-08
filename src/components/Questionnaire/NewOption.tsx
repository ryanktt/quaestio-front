import { Box, Button, Checkbox, TextInput, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';

export default function OptionUpsert() {
	const theme = useMantineTheme();
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			feedbackAfterSubmit: '',
			correct: null,
			title: '',
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
				<TextInput
					{...form.getInputProps('title')}
					label="Option title"
					required
					placeholder="The option title"
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<TextInput
					{...form.getInputProps('title')}
					label="Option feedback"
					placeholder="Feedback for this option"
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Checkbox
					{...form.getInputProps('correct')}
					defaultChecked={false}
					color={theme.colors.indigo[6]}
					label="Correct option"
				/>
				<Button
					w="fit-content"
					style={{ color: theme.colors.indigo[7], borderColor: theme.colors.indigo[7] }}
					justify="center"
					variant="outline"
					size="sm"
					mt="md"
					type="submit"
				>
					Add Option
				</Button>
			</form>
		</Box>
	);
}
