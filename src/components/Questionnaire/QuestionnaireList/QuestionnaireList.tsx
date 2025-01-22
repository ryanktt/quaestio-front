import { Badge, Box, Text as MantineText, useMantineTheme, NavLink as MantineNavLink } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconEye, IconHome2 } from '@tabler/icons-react';
import { QuestionnaireType } from '@gened/graphql';
import styles from './QuestionnaireList.module.scss';

function Column({ children, gridFr }: PropsWithChildren & { gridFr?: string }) {
	return <Box className={`${styles.column} Fr${gridFr}`}>{children}</Box>;
}

function ColumnItem({ children }: PropsWithChildren) {
	return (
		<Box className={`${styles.columnItem}`}>
			<div className={styles.columnItemWrapper}>{children}</div>
		</Box>
	);
}

function Header({ label, icon: Icon }: { label: string; icon?: typeof IconHome2 }) {
	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<MantineText size="14px" fw="600">
				{label}
			</MantineText>
			{Icon ? <Icon style={{ marginLeft: '8px' }} size={18} /> : null}
		</Box>
	);
}

function Type({ type }: { type: QuestionnaireType }) {
	const theme = useMantineTheme();

	const getTextFromQuestionnaireType = (qType: QuestionnaireType) => {
		if (qType === QuestionnaireType.QuestionnaireSurvey) return 'Survey';
		if (qType === QuestionnaireType.QuestionnaireExam) return 'Exam';
		if (qType === QuestionnaireType.QuestionnaireQuiz) return 'Quiz';
		return '';
	};

	const txtType = getTextFromQuestionnaireType(type);

	let badgeVariant = 'filled-pink';
	if (txtType === 'Quiz') badgeVariant = 'filled-violet';
	if (txtType === 'Exam') badgeVariant = 'filled-cyan';
	return (
		<Badge variant={badgeVariant} radius={theme.radius.sm}>
			{getTextFromQuestionnaireType(type)}
		</Badge>
	);
}

function Status({ active }: { active?: boolean }) {
	return (
		<Badge variant="dot" className={`${styles.status} ${active ? styles.active : ''}`}>
			{active ? 'Active' : 'Unactive'}
		</Badge>
	);
}

function Text({ children }: PropsWithChildren) {
	return (
		<MantineText size="15px" truncate>
			{children}
		</MantineText>
	);
}

function ID({ children: id }: PropsWithChildren) {
	const theme = useMantineTheme();
	return (
		<MantineNavLink
			p={0}
			component={Link}
			style={{ borderRadius: theme.radius.sm }}
			c={theme.colors.indigo[9]}
			to={`/board/questionnaire/${id}`}
			label={id}
		/>
	);
}

export default function QuestionnaireList() {
	return (
		<div>
			<Box className={styles.list}>
				<Column>
					<ColumnItem>
						<Header label="Type" />
					</ColumnItem>
					<ColumnItem>
						<Type type={QuestionnaireType.QuestionnaireSurvey} />
					</ColumnItem>
					<ColumnItem>
						<Type type={QuestionnaireType.QuestionnaireQuiz} />
					</ColumnItem>
					<ColumnItem>
						<Type type={QuestionnaireType.QuestionnaireExam} />
					</ColumnItem>
					<ColumnItem>
						<Type type={QuestionnaireType.QuestionnaireSurvey} />
					</ColumnItem>
				</Column>
				<Column gridFr="2">
					<ColumnItem>
						<Header label="Title" />
					</ColumnItem>
					<ColumnItem>
						<Text>Um título bom pra teste um novo mundo</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>Um título bom pra teste um novo mundo</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>Um título bom pra teste um novo mundo</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>Um título bom pra teste um novo mundo</Text>
					</ColumnItem>
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Status" />
					</ColumnItem>
					<ColumnItem>
						<Status />
					</ColumnItem>
					<ColumnItem>
						<Status active />
					</ColumnItem>
					<ColumnItem>
						<Status active />
					</ColumnItem>
					<ColumnItem>
						<Status active />
					</ColumnItem>
				</Column>
				<Column>
					<ColumnItem>
						<Header label="ID" />
					</ColumnItem>
					<ColumnItem>
						<ID>X12345YYY</ID>
					</ColumnItem>
					<ColumnItem>
						<ID>X12345YYY</ID>
					</ColumnItem>
					<ColumnItem>
						<ID>X12345YYY</ID>
					</ColumnItem>
					<ColumnItem>
						<ID>X12345YYY</ID>
					</ColumnItem>
				</Column>

				<Column>
					<ColumnItem>
						<Header label="Views" icon={IconEye} />
					</ColumnItem>
					<ColumnItem>
						<Text>100</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>100</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>100</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>100</Text>
					</ColumnItem>
				</Column>
				<Column>
					<ColumnItem>
						<Header label="Entries" icon={IconCheck} />
					</ColumnItem>
					<ColumnItem>
						<Text>10</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>10</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>10</Text>
					</ColumnItem>
					<ColumnItem>
						<Text>10</Text>
					</ColumnItem>
				</Column>
			</Box>
		</div>
	);
}
