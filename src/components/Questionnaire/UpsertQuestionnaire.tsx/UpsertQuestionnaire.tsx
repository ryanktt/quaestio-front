import { Button, Center, Checkbox, Select, Text, TextInput, Textarea, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import DragDropList from '@components/DragDropList/DragDropList.tsx';
import { CreateSurveyMutationVariables, QuestionnaireType, useCreateSurveyMutation } from '@gened/graphql.ts';
import { useEffect } from 'react';
import { convertPropsToGqlVars } from '@utils/graphql.ts';
import UpsertQuestion, { IQuestionProps, IUpsertQuestionProps } from '../UpsertQuestion/UpsertQuestion.tsx';

export interface IUpsertQuestionnaireProps {
	type: QuestionnaireType | null;
	title: string;
	description: string;
	requireEmail: boolean;
	requireName: boolean;
	questions: IQuestionProps[];
}

export default function UpsertQuestionnaire() {
	const theme = useMantineTheme();
	const form = useForm<IUpsertQuestionnaireProps>({
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

	const handleReorderedQuestions = (reorderedQuestions: IUpsertQuestionProps[]) => {
		const { questions } = form.getValues();
		const updatedQuestions = reorderedQuestions
			.map(({ question }) => questions.find((q) => q.id === question?.id))
			.filter((question): question is IQuestionProps => !!question);

		form.setFieldValue('questions', updatedQuestions);
	};

	const setQuestion = (newQuestion: IQuestionProps) => {
		let foundQuestion;
		const updatedQuestions = form.getValues().questions.map((question) => {
			if (question.id === newQuestion.id) {
				foundQuestion = true;
				return newQuestion;
			}
			return question;
		});
		if (!foundQuestion) updatedQuestions.push(newQuestion);

		form.setFieldValue('questions', updatedQuestions);
	};

	const deleteQuestion = (questionId: string) => {
		const { questions } = form.getValues();
		const index = questions.findIndex((question) => question.id === questionId);
		if (index !== -1) {
			const updatedQuestions = [...questions];
			updatedQuestions.splice(index, 1);

			form.setFieldValue('questions', updatedQuestions);
		}
	};

	const questionsProps = form.getValues().questions.map<IUpsertQuestionProps>((question, i) => ({
		question,
		badge: `Question ${i + 1}`,
		onDelete: deleteQuestion,
		onSet: setQuestion,
	}));

	const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useCreateSurveyMutation();

	const handleQuestionnaireCreation = async () => {
		const props = convertPropsToGqlVars(form.getValues());

		if (type === QuestionnaireType.Survey) {
			await surveyMutation({ variables: props as CreateSurveyMutationVariables });
		}
	};

	useEffect(() => {
		if (!surveyData) return;
		resetSurvey();
	}, [surveyData]);

	return (
		<div
			style={{
				padding: theme.spacing.lg,
				boxShadow: theme.shadows.sm,
				width: '100%',
				border: '1px solid',
				borderColor: theme.colors.gray[2],
				borderRadius: theme.radius.lg,
			}}
		>
			<Center>
				<Title c={theme.colors.indigo[8]} mb={10} size={20}>
					New {type ?? 'Questionnaire'}
				</Title>
			</Center>

			<form
				onSubmit={form.onSubmit(handleQuestionnaireCreation)}
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
					{...form.getInputProps('requireEmail', { type: 'checkbox' })}
					color={theme.colors.indigo[6]}
					disabled={!type}
					label="Require user email"
				/>
				<Checkbox
					{...form.getInputProps('requireName', { type: 'checkbox' })}
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
							itemsComponent={UpsertQuestion}
							itemPropsList={questionsProps}
						/>
					</div>
				) : null}

				<UpsertQuestion badge="New Question" method="ADD" draggable={false} onSet={setQuestion} />
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
		</div>
	);
}
