import { Button, Checkbox, Textarea, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';

export interface INewOptionProps {
	id: string;
	title: string;
	feedbackAfterSubmit: string;
	correct: boolean | '';
}

export default function NewOption({ onNewOption }: { onNewOption: (opt: INewOptionProps) => void }) {
	const theme = useMantineTheme();
	const form = useForm<INewOptionProps>({
		mode: 'uncontrolled',
		initialValues: {
			id: nanoid(),
			feedbackAfterSubmit: '',
			correct: '',
			title: '',
		},
		validate: {
			title: hasLength({ min: 3, max: 255 }, 'Title must be 3-255 characters long'),
		},
		validateInputOnBlur: true,
	});

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: theme.spacing.md,
				}}
			>
				<Textarea
					{...form.getInputProps('title')}
					label="Option title"
					required
					resize="vertical"
					placeholder="The option title"
					error={form.errors.title}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('feedbackAfterSubmit')}
					label="Option feedback"
					resize="vertical"
					placeholder="Feedback for this option"
					error={form.errors.feedbackAfterSubmit}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Checkbox {...form.getInputProps('correct')} color={theme.colors.indigo[6]} label="Correct option" />
				<Button
					w="50%"
					style={{ color: theme.colors.indigo[7], borderColor: theme.colors.indigo[7] }}
					variant="outline"
					size="sm"
					mt="md"
					onClick={() => {
						if (!form.validate().hasErrors) {
							onNewOption(form.getValues());
						}
					}}
				>
					Add Option
				</Button>
			</div>
		</div>
	);
}
