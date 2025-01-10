import {
	Box,
	Button,
	Center,
	Checkbox,
	Select,
	Text,
	TextInput,
	Textarea,
	Title,
	useMantineTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import { QuestionnaireType } from '@utils/generated/graphql';
import NewQuestion from './NewQuestion.tsx';

export default function Questionnaire() {
	const theme = useMantineTheme();
	const form = useForm({
		mode: 'controlled',
		initialValues: {
			type: null,
			title: '',
			description: '',
			requireEmail: false,
			requireName: false,
			questions: [],
		},
		validate: {
			title: hasLength({ min: 3, max: 255 }, 'Title must be 3-255 characters long'),
		},
	});

	const { type } = form.getValues();

	return (
		<Box
			p={theme.spacing.lg}
			style={{
				border: '1px solid',
				borderColor: theme.colors.gray[3],
				borderRadius: theme.radius.lg,
			}}
		>
			<Center>
				<Title c={theme.colors.indigo[8]} mb={10} size={20}>
					New {type ?? 'Questionnaire'}
				</Title>
			</Center>

			<form
				onSubmit={form.onSubmit(() => {})}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: theme.spacing.md,
				}}
			>
				<Select
					{...form.getInputProps('type')}
					maw={300}
					label="Questionnaire type"
					placeholder="Select the questionnaire type"
					data={[QuestionnaireType.Exam, QuestionnaireType.Quiz, QuestionnaireType.Survey]}
				/>
				<TextInput
					{...form.getInputProps('title')}
					label="Title"
					required
					disabled={!type}
					placeholder={`The ${type ?? 'Questionnaire'} title`}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					{...form.getInputProps('description')}
					label="Description"
					resize="vertical"
					disabled={!type}
					placeholder={`The ${type ?? 'Questionnaire'} description`}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Checkbox
					{...form.getInputProps('requireEmail')}
					defaultChecked={false}
					disabled={!type}
					color={theme.colors.indigo[6]}
					label="Require user email"
				/>
				<Checkbox
					{...form.getInputProps('requireName')}
					disabled={!type}
					defaultChecked={false}
					color={theme.colors.indigo[6]}
					label="Require user name"
				/>
				<Text fw="600" mt={theme.spacing.sm} c={theme.colors.indigo[7]}>
					Questions
				</Text>
				<Button
					style={{ padding: '0 8px', color: theme.colors.indigo[7], borderColor: theme.colors.indigo[7] }}
					variant="subtle"
					c={theme.colors.indigo[7]}
					radius="sm"
					w="50%"
					size="sm"
				>
					New Question
				</Button>

				<NewQuestion />
				<Center style={{ gap: '10px' }}>
					<Button w="100%" justify="center" size="sm" mt="xl" type="submit" variant="gradient">
						Create {type ?? 'Questionnaire'}
					</Button>
				</Center>
			</form>
		</Box>
	);
}
