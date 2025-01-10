import { Badge, Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export interface IQuestionnaireListItemProps {
	id: string;
	badge: string;
	description: string;
}

export default function QuestionnaireListItem({ badge, description, id }: IQuestionnaireListItemProps) {
	const theme = useMantineTheme();

	return (
		<div
			key={id}
			style={{
				width: '100%',
				justifyContent: 'space-between',
				alignContent: 'center',
				display: 'flex',
			}}
		>
			<div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
				<Badge variant="light" color={theme.colors.indigo[9]} radius="sm" size="md" h="100%">
					{badge}
				</Badge>
				<Text c={theme.colors.gray[6]} size="sm">
					{description}
				</Text>
			</div>
			<div style={{ display: 'flex' }}>
				<Tooltip label="Edit Option">
					<Button variant="subtle" size="md" color={theme.colors.indigo[8]} p="0 15px">
						<IconEdit size={18} />
					</Button>
				</Tooltip>
				<Tooltip label="Delete Option">
					<Button variant="subtle" size="md" color={theme.colors.pink[9]} p="0 15px">
						<IconTrash size={18} />
					</Button>
				</Tooltip>
			</div>
		</div>
	);
}
