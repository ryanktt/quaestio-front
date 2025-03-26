/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from '@components/ListTable/ListTable.module.scss';
import { QuestionnaireType } from '@gened/graphql';
import {
	Badge,
	Box,
	Text as MantineText,
	Title,
	Tooltip,
	UnstyledButton,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { IconClipboard, IconExternalLink, IconHome2 } from '@tabler/icons-react';
import moment from 'moment';
import { PropsWithChildren, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ListColumn({ children, className }: PropsWithChildren & { className?: string }) {
	return <Box className={`${styles.column} ${className}`}>{children}</Box>;
}

export function ListColumnItem({ children }: PropsWithChildren) {
	return (
		<Box className={`${styles.columnItem}`}>
			<div className={styles.columnItemWrapper}>{children}</div>
		</Box>
	);
}

export function ListHeader({ label, icon: Icon }: { label: string; icon?: typeof IconHome2 }) {
	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<Title size="sm">{label}</Title>
			{Icon ? <Icon style={{ marginLeft: rem(8), width: rem(10), height: rem(10) }} /> : null}
		</Box>
	);
}

export function ListType({ type }: { type: QuestionnaireType }) {
	const theme = useMantineTheme();
	const getTextFromQuestionnaireType = (qType: QuestionnaireType) => {
		if (qType === QuestionnaireType.QuestionnaireSurvey) return 'Survey';
		if (qType === QuestionnaireType.QuestionnaireExam) return 'Exam';
		if (qType === QuestionnaireType.QuestionnaireQuiz) return 'Quiz';
		return '';
	};
	const txtType = getTextFromQuestionnaireType(type);
	let color = 'blue';
	if (txtType === 'Quiz') color = 'violet';
	if (txtType === 'Exam') color = 'cyan';
	return (
		<Badge variant="light" color={color} radius={theme.radius.sm}>
			{getTextFromQuestionnaireType(type)}
		</Badge>
	);
}

export function ListText({ children }: PropsWithChildren) {
	return (
		<MantineText size="sm" m="xs">
			{children}
		</MantineText>
	);
}

export function ListCopy({ id }: { id: string }) {
	const [copied, setCopied] = useState(false);
	const copyIdToClipboard = () => {
		if ('clipboard' in navigator) {
			navigator.clipboard.writeText(id);
		}
		setCopied(true);
	};
	return (
		<Tooltip label={!copied ? 'Copy ID to clipboard' : 'Copied'}>
			<UnstyledButton
				type="button"
				mr={8}
				pb={1}
				className={styles.btn}
				onMouseLeave={() => setCopied(false)}
				onClick={copyIdToClipboard}
			>
				<IconClipboard style={{ width: rem(14), height: rem(14) }} stroke={1.6} />
			</UnstyledButton>
		</Tooltip>
	);
}

export function ListID({
	id,
	redirectPath,
	tooltipLabel,
}: {
	id: string;
	redirectPath: string;
	tooltipLabel: string;
}) {
	const navigate = useNavigate();

	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<ListCopy id={id} />
			<Tooltip label={tooltipLabel}>
				<UnstyledButton
					className={`${styles.btn} ${styles.id}`}
					onClick={() => navigate(redirectPath)}
				>
					<IconExternalLink style={{ width: rem(14), height: rem(14) }} stroke={1.6} />
					<p>{id}</p>
				</UnstyledButton>
			</Tooltip>
		</Box>
	);
}

export function ListDate({ date }: { date?: Date }) {
	return (
		<MantineText size="sm" m="xs">
			{date ? moment(date).format('MM/DD/YYYY - HH:MM') : '-'}
		</MantineText>
	);
}

export const LIST_DEBOUNCE_DELAY = 500;
