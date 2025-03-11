/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import AlertItem from '@components/Alert/Alert';
import { IOptionProps } from '@components/Questionnaire/OptionAccordionForm/OptionAccordionForm';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { QuestionType } from '@gened/graphql.ts';
import { Badge, Box, Checkbox, CheckboxProps, rem, Text, Textarea, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconBulb, IconCheck, IconCircleFilled, IconExclamationMark } from '@tabler/icons-react';
import { colorSchemes, IColorSchemes } from '@utils/color';
import { createMarkup } from '@utils/html';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './ResponseForm.module.scss';

export interface IQuestionResponseProps {
	type: QuestionType;
	selectedOptionIds: string[];
	text: string;
	answeredAt?: Date;
	correct?: boolean;
	questionId: string;
	correctOptionIds?: string[];
}

const CheckboxIcon: CheckboxProps['icon'] = function ({ indeterminate, ...others }) {
	return indeterminate ? <IconCircleFilled {...others} /> : <IconCircleFilled {...others} />;
};

function Feedback({
	msg,
	type,
	color: c,
}: {
	msg: string;
	type: 'wrong' | 'right' | 'neutral';
	color: string;
}) {
	const theme = useMantineTheme();

	let color = c;
	let icon = <IconBulb size={18} stroke={1.6} color={theme.colors[color][8]} />;
	if (type === 'wrong') {
		color = 'pink';
		icon = <IconExclamationMark size={18} stroke={1.6} color={theme.colors[color][8]} />;
	}
	if (type === 'right') {
		color = 'teal';
		icon = <IconCheck size={18} stroke={1.6} color={theme.colors[color][8]} />;
	}

	return (
		<Box
			style={{
				border: `1px solid${theme.colors[color][2]}`,
				borderBottomWidth: '2px',
				borderRadius: theme.radius.sm,
				borderBottomRightRadius: theme.radius.md,
			}}
			p="sm"
			bg={theme.colors[color][0]}
			display="flex"
		>
			{icon}
			<Text ml={3} fw={600} style={{ fontSize: rem(13) }} c={theme.colors[color][7]}>
				{msg}
			</Text>
		</Box>
	);
}

function OptionCheckbox({
	option,
	question,
	readMode,
	onChange,
	checked,
	showFeedback,
	feedbackColor,
}: {
	option: IOptionProps;
	question: IQuestionProps;
	readMode: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	checked: boolean;
	showFeedback: boolean;
	feedbackColor: string;
}) {
	const feedback =
		showFeedback && option.feedbackAfterSubmit ? (
			<Box pr={rem(15)} mt={rem(0)}>
				<Feedback color={feedbackColor} msg={option.feedbackAfterSubmit} type="neutral" />
			</Box>
		) : null;

	const isTrueOrFalse = question.type === QuestionType.TrueOrFalse;

	return (
		<Box w="100%" style={{ display: 'flex', flexDirection: 'column', gap: rem(5) }}>
			<Box
				className={`${styles.box} ${styles.option} ${isTrueOrFalse ? (option.true ? styles.true : styles.false) : ''}`}
				key={option.id}
			>
				<Checkbox
					onChange={onChange}
					checked={checked}
					readOnly={readMode}
					icon={CheckboxIcon}
					className={styles.checkbox}
					label={option.title}
				/>
			</Box>
			{feedback}
		</Box>
	);
}

export default function QuestionResponseForm({
	onChange,
	question,
	questionIndex,
	colorScheme,
	readMode = false,
	questionResponseProps,
	correctedResponseProps,
	onError,
	showErrors: showErrorsProp = false,
}: {
	onChange: (p: IQuestionResponseProps) => void;
	question: IQuestionProps;
	questionIndex: number;
	colorScheme: IColorSchemes;
	readMode?: boolean;
	questionResponseProps?: IQuestionResponseProps;
	correctedResponseProps?: IQuestionResponseProps;
	showErrors: boolean;
	onError: (elementId: string, error: boolean) => void;
}) {
	const theme = useMantineTheme();
	const [primaryColor] = colorSchemes[colorScheme];

	const [option, setOptionProps] = useState<IOptionProps[]>([]);

	useEffect(() => {
		if (question.randomizeOptions) setOptionProps(_.shuffle(question.options));
		else setOptionProps(question.options);
	}, []);

	const [state, setState] = useState<IQuestionResponseProps>(
		questionResponseProps || {
			type: question.type as QuestionType,
			questionId: question.id,
			selectedOptionIds: [],
			text: '',
		},
	);

	const elementId = `question-form-${question.id}`;
	let missingCompletion = false;
	if (question.type === QuestionType.Text) {
		missingCompletion = !state.text.length;
	} else {
		missingCompletion = !state.selectedOptionIds.length;
	}
	const showError = missingCompletion && showErrorsProp;

	onError(elementId, missingCompletion);

	useEffect(() => {
		const isAnswered =
			(question.type === QuestionType.Text && !!state.text) ||
			(question.type !== QuestionType.Text && !!state.selectedOptionIds.length);
		onChange({ ...state, answeredAt: isAnswered ? new Date() : undefined });
	}, [state]);

	const toggleSelectOption = (selected: boolean, optionId: string) => {
		let updatedSelectedOptIds = [];
		if (selected) {
			if (question.type === QuestionType.SingleChoice || question.type === QuestionType.TrueOrFalse) {
				updatedSelectedOptIds = [optionId];
			} else {
				updatedSelectedOptIds = [...state.selectedOptionIds, optionId];
			}
		} else {
			updatedSelectedOptIds = state.selectedOptionIds.filter((id) => optionId !== id);
		}
		setState({ ...state, selectedOptionIds: updatedSelectedOptIds });
	};

	const showWrongAnswerFeedback =
		!!question.wrongAnswerFeedback && correctedResponseProps?.correct === false;
	const showRightAnswerFeedback =
		!!question.rightAnswerFeedback && correctedResponseProps?.correct === true;
	const showTextFeedback = !!question.feedbackAfterSubmit && correctedResponseProps;
	const showFeedback = showRightAnswerFeedback || showWrongAnswerFeedback || showTextFeedback;

	const optionCheckboxes = option.map((opt) => {
		return (
			<OptionCheckbox
				showFeedback={!!correctedResponseProps}
				checked={!!state.selectedOptionIds.find((id) => id === opt.id)}
				onChange={(e) => {
					if (!readMode) toggleSelectOption(e.target.checked, opt.id);
				}}
				option={opt}
				question={question}
				readMode={readMode}
				feedbackColor={primaryColor}
				key={opt.id}
			/>
		);
	});

	return (
		<div
			id={elementId}
			style={{
				display: 'flex',
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Box>
					<Badge color={theme.colors[primaryColor][8]} size="md">
						Q.{questionIndex + 1}
					</Badge>
					{}
				</Box>
				<div dangerouslySetInnerHTML={createMarkup(question.description)} />
				{question.type === QuestionType.Text ? (
					<Textarea
						color={theme.colors[primaryColor][7]}
						c={theme.colors[primaryColor][7]}
						required={question.required}
						onChange={(e) => setState({ ...state, text: e.target.value })}
						autosize
						readOnly={readMode}
						minRows={3}
					/>
				) : null}
				<Box
					className={styles.options}
					style={question.type !== QuestionType.TrueOrFalse ? { flexDirection: 'column' } : {}}
				>
					{optionCheckboxes}
				</Box>

				{showFeedback ? (
					<Box mt={theme.spacing.lg}>
						{showWrongAnswerFeedback ? (
							<Feedback color={primaryColor} msg={question.wrongAnswerFeedback} type="wrong" />
						) : null}
						{showRightAnswerFeedback ? (
							<Feedback color={primaryColor} msg={question.rightAnswerFeedback} type="right" />
						) : null}
						{showTextFeedback ? (
							<Feedback
								color={primaryColor}
								msg={question.feedbackAfterSubmit}
								type="neutral"
							/>
						) : null}
					</Box>
				) : null}

				{showError ? (
					<Box mt={theme.spacing.lg}>
						<AlertItem
							alert={{
								type: 'ERROR',
								title: 'Answer required',
								id: 'required',
								withCloseBtn: false,
							}}
						/>
					</Box>
				) : null}
			</Box>
		</div>
	);
}
