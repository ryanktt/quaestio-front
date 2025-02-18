/* eslint-disable react/no-danger */
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { QuestionType } from '@gened/graphql.ts';
import { Badge, Box, Checkbox, Textarea, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { createMarkup } from '@utils/html';
import styles from './ResponseForm.module.scss';

export interface IQuestionResponseFormProps {
	type: QuestionType | null;
	selectedOptionIds: string[];
	text: string;
	questionId: string;
}

export default function QuestionResponseForm({
	onChange,
	questionProps,
	questionIndex,
}: {
	onChange: (p: IQuestionResponseFormProps) => Promise<void>;
	questionProps: IQuestionProps;
	questionIndex: number;
}) {
	const theme = useMantineTheme();
	const form = useForm<IQuestionResponseFormProps>({
		mode: 'controlled',
		initialValues: {
			type: questionProps.type,
			questionId: questionProps.id,
			selectedOptionIds: [],
			text: '',
		},
	});

	const optionInputs = questionProps.options.map((option) => (
		<Box className={`${styles.box} ${styles.option}`} key={option.id}>
			<Checkbox className={styles.checkbox} label={option.title} />
		</Box>
	));

	return (
		<form
			onChange={form.onSubmit(onChange)}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.sm,
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Badge size="md">Q.{questionIndex + 1}</Badge>
				<div dangerouslySetInnerHTML={createMarkup(questionProps.description)} />
				{questionProps.type === QuestionType.Text ? <Textarea autosize minRows={3} /> : null}
				<Box display="flex" style={{ flexDirection: 'column', gap: theme.spacing.sm }}>
					{...optionInputs}
				</Box>
			</Box>
		</form>
	);
}
