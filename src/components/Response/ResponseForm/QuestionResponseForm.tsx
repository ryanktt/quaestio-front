/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import AlertItem from '@components/Alert/Alert';
import { IOptionProps } from '@components/Questionnaire/OptionAccordionForm/OptionAccordionForm';
import { IQuestionProps } from '@components/Questionnaire/QuestionAccordionForm/QuestionAccordionForm.tsx';
import { EQuestionnaireType } from '@components/Questionnaire/Questionnaire.interface';
import { QuestionType } from '@gened/graphql.ts';
import {
	Badge,
	Box,
	Checkbox,
	CheckboxProps,
	Flex,
	Rating,
	rem,
	Text,
	Textarea,
	useMantineTheme,
} from '@mantine/core';
import '@mantine/core/styles.css';
import {
	IconBulb,
	IconCheck,
	IconCircleFilled,
	IconExclamationMark,
	IconQuestionMark,
	IconX,
} from '@tabler/icons-react';
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
	rating?: number;
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
		color = 'red';
		icon = <IconExclamationMark size={18} stroke={1.6} color={theme.colors[color][8]} />;
	}
	if (type === 'right') {
		color = 'green';
		icon = <IconCheck size={18} stroke={1.6} color={theme.colors[color][8]} />;
	}

	return (
		<Box
			style={{
				border: `1px solid${theme.colors[color][2]}`,
				borderRadius: theme.radius.md,
			}}
			p="xs"
			bg={theme.colors[color][0]}
			display="flex"
		>
			{icon}
			<Text ml={3} fw={500} style={{ fontSize: rem(13) }} c={theme.colors[color][7]}>
				{msg}
			</Text>
		</Box>
	);
}

function OptionCheckbox({
	option,
	readMode,
	onChange,
	checked,
	showFeedback,
	feedbackColor,
	correct,
	showCorrect,
	adminView = false,
	questionnaireType,
}: {
	option: IOptionProps;
	readMode: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	checked: boolean;
	showFeedback: boolean;
	feedbackColor: string;
	showCorrect: boolean;
	questionnaireType: EQuestionnaireType | null;
	adminView?: boolean;
	correct?: boolean;
}) {
	const theme = useMantineTheme();
	const feedback =
		showFeedback && option.feedbackAfterSubmit ? (
			<Box mt={5}>
				<Feedback color={feedbackColor} msg={option.feedbackAfterSubmit} type="neutral" />
			</Box>
		) : null;

	const getCorrectionStyle = () => {
		if (
			((showCorrect && showFeedback) || adminView) &&
			((typeof correct === 'boolean' && checked) || correct === true) &&
			questionnaireType !== EQuestionnaireType.Survey
		) {
			return correct ? styles.right : styles.wrong;
		}
		return '';
	};

	return (
		<Box
			w="100%"
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: rem(5),
				...(feedback && {
					background: theme.white,
					borderRadius: theme.radius.lg,
					padding: rem(8),
					border: `1px solid ${theme.colors.gray[1]}`,
				}),
			}}
		>
			<Box className={`${styles.box} ${styles.option}  ${getCorrectionStyle()}`} key={option.id}>
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
	questionnaireType,
	questionResponseProps,
	correctedResponseProps,
	onError,
	showErrors: showErrorsProp = false,
	adminView = false,
}: {
	onChange: (p: IQuestionResponseProps) => void;
	question: IQuestionProps;
	questionIndex: number;
	colorScheme: IColorSchemes;
	readMode?: boolean;
	questionResponseProps?: IQuestionResponseProps;
	correctedResponseProps?: IQuestionResponseProps;
	showErrors: boolean;
	adminView?: boolean;
	questionnaireType: EQuestionnaireType | null;
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
		missingCompletion = question.required && !state.text.length;
	} else {
		missingCompletion = question.required && !state.selectedOptionIds.length;
	}
	const showError = missingCompletion && showErrorsProp;

	onError(elementId, missingCompletion);

	useEffect(() => {
		const isAnswered =
			(question.type === QuestionType.Text && !!state.text) ||
			(question.type === QuestionType.Rating && !!state.rating) ||
			(question.type !== QuestionType.Text &&
				question.type !== QuestionType.Rating &&
				!!state.selectedOptionIds.length);
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
		const correct =
			typeof opt.correct === 'boolean'
				? opt.correct
				: correctedResponseProps?.correctOptionIds?.includes(opt.id);

		return (
			<OptionCheckbox
				showFeedback={!!correctedResponseProps}
				checked={!!state.selectedOptionIds.find((id) => id === opt.id)}
				showCorrect={question.showCorrectAnswer}
				questionnaireType={questionnaireType}
				correct={correct}
				adminView={adminView}
				onChange={(e) => {
					if (!readMode) toggleSelectOption(e.target.checked, opt.id);
				}}
				option={opt}
				readMode={readMode}
				feedbackColor={primaryColor}
				key={opt.id}
			/>
		);
	});

	const getRightWrongIcon = () => {
		if (!((question.showCorrectAnswer && !!correctedResponseProps) || adminView)) {
			return null;
		}

		let color = 'blue';
		let icon = <IconQuestionMark size={14} color={theme.colors[color][6]} />;
		if (
			questionnaireType !== EQuestionnaireType.Survey &&
			question.type !== QuestionType.Rating &&
			question.type !== QuestionType.Text
		) {
			if (questionResponseProps?.correct === false || correctedResponseProps?.correct === false) {
				color = 'red';
				icon = <IconX size={14} color={theme.colors[color][6]} />;
			}
			if (questionResponseProps?.correct === true || correctedResponseProps?.correct === true) {
				color = 'green';
				icon = <IconCheck size={14} color={theme.colors[color][6]} />;
			}
		} else if (questionResponseProps?.answeredAt || correctedResponseProps?.answeredAt) {
			return null;
		}

		return (
			<Box display="flex" p={3} style={{ borderRadius: rem(100) }} bg={theme.colors[color][1]}>
				{icon}
			</Box>
		);
	};

	return (
		<div
			id={elementId}
			style={{
				display: 'flex',
				width: '100%',
			}}
		>
			<Box className={`${styles.box} ${styles.question}`}>
				<Flex justify="space-between">
					<Badge color={theme.colors[primaryColor][8]} size="md">
						Q.{questionIndex + 1}
					</Badge>
					{getRightWrongIcon()}
				</Flex>
				<div dangerouslySetInnerHTML={createMarkup(question.description)} />

				{question.type === QuestionType.Text ? (
					<Textarea
						color={theme.colors[primaryColor][7]}
						c={theme.colors[primaryColor][7]}
						required={question.required}
						value={state.text}
						onChange={(e) => setState({ ...state, text: e.target.value })}
						autosize
						readOnly={readMode}
						minRows={3}
					/>
				) : null}

				{question.type === QuestionType.Rating ? (
					<Rating
						ml={theme.spacing.md}
						size={40}
						value={state.rating}
						readOnly={readMode}
						onChange={(rating) => setState({ ...state, rating })}
						styles={{ label: { marginRight: rem(12) } }}
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
								title: 'Response required',
								message: 'Please, provide a response for this question.',
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
