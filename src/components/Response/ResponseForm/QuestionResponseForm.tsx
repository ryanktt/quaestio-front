/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { QuestionType } from '@gened/graphql.ts';
import { Badge, Box, Checkbox, CheckboxProps, Textarea, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { useForm } from '@mantine/form';
import { IconCircleFilled } from '@tabler/icons-react';
import { colorSchemes, IColorSchemes } from '@utils/color';
import { createMarkup } from '@utils/html';
import styles from './ResponseForm.module.scss';

export interface IQuestionResponseFormProps {
	type: QuestionType | null;
	selectedOptionIds: string[];
	text: string;
	questionId: string;
}

const CheckboxIcon: CheckboxProps['icon'] = function ({ indeterminate, ...others }) {
	return indeterminate ? <IconCircleFilled {...others} /> : <IconCircleFilled {...others} />;
};

export default function QuestionResponseForm({
	onChange,
	questionProps,
	questionIndex,
	colorScheme,
}: {
	onChange: (p: IQuestionResponseFormProps) => Promise<void>;
	questionProps: IQuestionProps;
	questionIndex: number;
	colorScheme: IColorSchemes;
}) {
	const theme = useMantineTheme();
	const [primaryColor] = colorSchemes[colorScheme];
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
			<Checkbox icon={CheckboxIcon} className={styles.checkbox} label={option.title} />
		</Box>
	));

	return (
		<div
			// onChange={form.onSubmit(onChange)}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.sm,
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Badge color={theme.colors[primaryColor][6]} size="md">
					Q.{questionIndex + 1}
				</Badge>
				<div dangerouslySetInnerHTML={createMarkup(questionProps.description)} />
				{questionProps.type === QuestionType.Text ? (
					<Textarea
						color={theme.colors[primaryColor][6]}
						c={theme.colors[primaryColor][6]}
						autosize
						minRows={3}
					/>
				) : null}
				<Box display="flex" style={{ flexDirection: 'column', gap: theme.spacing.sm }}>
					{...optionInputs}
				</Box>
			</Box>
		</div>
	);
}
