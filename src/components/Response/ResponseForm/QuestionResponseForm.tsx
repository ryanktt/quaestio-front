/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import { IOptionProps } from '@components/Questionnaire/OptionAccordionForm/OptionAccordionForm';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { QuestionType } from '@gened/graphql.ts';
import { Badge, Box, Checkbox, CheckboxProps, rem, Textarea, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconCircleFilled } from '@tabler/icons-react';
import { colorSchemes, IColorSchemes } from '@utils/color';
import { createMarkup } from '@utils/html';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styles from './ResponseForm.module.scss';

export interface IQuestionResponseProps {
	type: QuestionType;
	selectedOptionIds: string[];
	text: string;
	answeredAt?: Date;
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
	onChange: (p: IQuestionResponseProps) => void;
	questionProps: IQuestionProps;
	questionIndex: number;
	colorScheme: IColorSchemes;
}) {
	const theme = useMantineTheme();
	const [primaryColor] = colorSchemes[colorScheme];

	const [optionProps, setOptionProps] = useState<IOptionProps[]>([]);

	useEffect(() => {
		if (questionProps.randomizeOptions) setOptionProps(_.shuffle(questionProps.options));
		else setOptionProps(questionProps.options);
	}, []);

	const [state, setState] = useState<IQuestionResponseProps>({
		type: questionProps.type as QuestionType,
		questionId: questionProps.id,
		selectedOptionIds: [],
		text: '',
	});

	useEffect(() => {
		const isAnswered =
			(questionProps.type === QuestionType.Text && !!state.text) ||
			(questionProps.type !== QuestionType.Text && !!state.selectedOptionIds.length);
		onChange({ ...state, answeredAt: isAnswered ? new Date() : undefined });
	}, [state]);

	const toggleSelectOption = (selected: boolean, optionId: string) => {
		let updatedSelectedOptIds = [];
		if (selected) {
			if (
				questionProps.type === QuestionType.SingleChoice ||
				questionProps.type === QuestionType.TrueOrFalse
			) {
				updatedSelectedOptIds = [optionId];
			} else {
				updatedSelectedOptIds = [...state.selectedOptionIds, optionId];
			}
		} else {
			updatedSelectedOptIds = state.selectedOptionIds.filter((id) => optionId !== id);
		}
		setState({ ...state, selectedOptionIds: updatedSelectedOptIds });
	};

	const getOptionInput = (option: IOptionProps) => {
		if (questionProps.type === QuestionType.TrueOrFalse) {
			return (
				<Box
					className={`${styles.box} ${styles.option} ${option.true ? styles.true : styles.false}`}
					key={option.id}
				>
					<Checkbox
						onChange={(e) => toggleSelectOption(e.target.checked, option.id)}
						checked={!!state.selectedOptionIds.find((id) => id === option.id)}
						icon={CheckboxIcon}
						className={styles.checkbox}
						label={option.title}
					/>
				</Box>
			);
		}

		return (
			<Box className={`${styles.box} ${styles.option}`} key={option.id}>
				<Checkbox
					onChange={(e) => toggleSelectOption(e.target.checked, option.id)}
					checked={!!state.selectedOptionIds.find((id) => id === option.id)}
					icon={CheckboxIcon}
					className={styles.checkbox}
					label={option.title}
				/>
			</Box>
		);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: theme.spacing.sm,
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Badge color={theme.colors[primaryColor][8]} size="md">
					Q.{questionIndex + 1}
				</Badge>
				<div dangerouslySetInnerHTML={createMarkup(questionProps.description)} />
				{questionProps.type === QuestionType.Text ? (
					<Textarea
						color={theme.colors[primaryColor][7]}
						c={theme.colors[primaryColor][7]}
						required={questionProps.required}
						onChange={(e) => setState({ ...state, text: e.target.value })}
						autosize
						minRows={3}
					/>
				) : null}
				<Box
					style={{
						display: 'flex',
						...(questionProps.type !== QuestionType.TrueOrFalse
							? { flexDirection: 'column' }
							: {}),
						gap: rem(5),
					}}
				>
					{...optionProps.map(getOptionInput)}
				</Box>
			</Box>
		</div>
	);
}
