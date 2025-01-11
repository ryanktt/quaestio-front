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
import { useState } from 'react';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import NewQuestion, { INewQuestionProps } from './NewQuestion.tsx';
import QuestionnaireListItem, { IQuestionnaireListItemProps } from './QuestionnaireListItem.tsx';

export interface INewQuestionnaireProps {
	type: QuestionnaireType | null;
	title: string;
	description: string;
	requireEmail: boolean;
	requireName: boolean;
	questions: INewQuestionProps[];
}

export default function Questionnaire() {
	const theme = useMantineTheme();
	const form = useForm<INewQuestionnaireProps>({
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
	const { type, questions } = form.getValues();

	const [newQuestionOpen, setNewQuestionOpen] = useState(false);

	const handleReorderedQuestions = (reorderedQuestions: { id: string }[]) => {
		const updatedQuestions = reorderedQuestions
			.map(({ id }) => questions.find((opt) => opt.id === id))
			.filter((opt): opt is INewQuestionProps => !!opt);

		form.setFieldValue('questions', updatedQuestions);
	};

	const setQuestion = (newOpt: INewQuestionProps) => {
		let foundQuestion;
		const updatedQuestions = form.getValues().questions.map((opt) => {
			if (opt.id === newOpt.id) {
				foundQuestion = true;
				return newOpt;
			}
			return opt;
		});

		if (!foundQuestion) updatedQuestions.push(newOpt);

		form.setFieldValue('questions', updatedQuestions);
		setNewQuestionOpen(false);
	};

	const questionsProps = questions.map<IQuestionnaireListItemProps>((question, i) => ({
		id: question.id,
		badge: `Question ${i + 1}`,
		description: question.description,
	}));
	return (
		<Box
			p={theme.spacing.lg}
			style={{
				boxShadow: theme.shadows.sm,
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
					disabled={!type}
					required
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
					color={theme.colors.indigo[6]}
					disabled={!type}
					label="Require user email"
				/>
				<Checkbox
					{...form.getInputProps('requireName')}
					defaultChecked={false}
					color={theme.colors.indigo[6]}
					disabled={!type}
					label="Require user name"
				/>
				<Text fw="600" mt={theme.spacing.sm} c={theme.colors.indigo[7]}>
					Questions
				</Text>

				{questionsProps.length ? (
					<div>
						<DragDropList
							onReorder={handleReorderedQuestions}
							itemsComponent={QuestionnaireListItem}
							itemPropsList={questionsProps}
						/>
					</div>
				) : null}
				<Button
					color={theme.colors.indigo[7]}
					variant="outline"
					radius="sm"
					w="50%"
					display={newQuestionOpen ? 'none' : 'block'}
					onClick={() => {
						setNewQuestionOpen(true);
					}}
					size="sm"
					disabled={!type}
				>
					New Question
				</Button>
				{newQuestionOpen ? (
					<NewQuestion onCancel={() => setNewQuestionOpen(false)} onNewQuestion={setQuestion} />
				) : null}
				<Center style={{ gap: '10px' }}>
					<Button
						disabled={!type}
						w="100%"
						justify="center"
						size="sm"
						mt="xl"
						type="submit"
						variant="gradient"
					>
						Create {type ?? 'Questionnaire'}
					</Button>
				</Center>
			</form>
		</Box>
	);
}
