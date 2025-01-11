import { Button, Checkbox, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { nanoid } from 'nanoid/non-secure';

export interface INewOptionProps {
	id: string;
	title: string;
	feedbackAfterSubmit: string;
	correct: boolean | '';
}

export default function NewOption({
	onNewOption,
	onCancel,
}: {
	onNewOption: (opt: INewOptionProps) => void;
	onCancel: () => void;
}) {
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
		<div style={{ margin: '15px 0' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
				<div />
				<div>
					<Tooltip label="Cancel">
						<Button mr={theme.spacing.xs} variant="gradient-red" size="xs" p="0 10px" onClick={onCancel}>
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
									onNewOption(form.getValues());
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
				<Textarea
					{...form.getInputProps('title')}
					label="Option description"
					required
					resize="vertical"
					placeholder="The option description"
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
			</div>
		</div>
	);
}
