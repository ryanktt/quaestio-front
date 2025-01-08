import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Badge, Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const data = [
	{ position: 6, description: 'A huge description, you dont even know yho', symbol: 'C', name: 'Carbon' },
	{ position: 7, description: 'A huge description, you dont even know yho', symbol: 'N', name: 'Nitrogen' },
	{ position: 39, description: 'A huge description, you dont even know yho', symbol: 'Y', name: 'Yttrium' },
	{ position: 56, description: 'A huge description, you dont even know yho', symbol: 'Ba', name: 'Barium' },
	{ position: 58, description: 'A huge description, you dont even know yho', symbol: 'Ce', name: 'Cerium' },
];

export default function QuestionnaireDragDropList() {
	const [state, handlers] = useListState(data);
	const theme = useMantineTheme();

	const options = state.map((item, index) => (
		<Draggable key={item.symbol} index={index} draggableId={item.symbol}>
			{(provided) => (
				<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignContent: 'center',
							border: `1px solid ${theme.colors.gray[3]}`,
							marginBottom: '5px',
						}}
					>
						<div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
							<Badge variant="light" color={theme.colors.indigo[9]} radius="sm" size="md" h="100%">
								O.{index + 1}
							</Badge>
							<Text c="gray.7" size="sm">
								{item.description}
							</Text>
						</div>
						<div style={{ display: 'flex', gap: '5px' }}>
							<Tooltip label="Edit Option">
								<Button variant="subtle" size="md" color={theme.colors.indigo[7]} p="0 8px">
									<IconEdit size={18} />
								</Button>
							</Tooltip>
							<Tooltip label="Delete Option">
								<Button variant="subtle" size="md" color={theme.colors.pink[7]} p="0 8px">
									<IconTrash size={18} />
								</Button>
							</Tooltip>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	));

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
					>
						{options}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
