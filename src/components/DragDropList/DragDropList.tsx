import { nanoid } from 'nanoid/non-secure';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useListState } from '@mantine/hooks';
import { ComponentType } from 'react';
import cx from 'clsx';
import { IconGripVertical } from '@tabler/icons-react';
import classes from './DragDropList.module.scss';

export default function DragDropList<P extends Object>({
	itemComponent: ItemComponent,
	onDragUpdate,
	itemPropsList,
}: {
	itemComponent: ComponentType<P>;
	itemPropsList: P[];
	onDragUpdate?: () => void;
}) {
	const [state, handlers] = useListState([...itemPropsList]);

	const items = state.map((itemProps, index) => {
		const key = nanoid();

		return (
			<Draggable key={key} index={index} draggableId={key}>
				{(provided, snapshot) => (
					<div
						className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<div className={classes.draggable}>
							<IconGripVertical className={classes.icon} size={18} stroke={1.5} />
							<ItemComponent {...itemProps} />
						</div>
					</div>
				)}
			</Draggable>
		);
	});

	return (
		<DragDropContext
			onDragUpdate={onDragUpdate}
			onDragEnd={({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
