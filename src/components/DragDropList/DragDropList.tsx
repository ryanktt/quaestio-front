import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ComponentType, useEffect, useState } from 'react';
import cx from 'clsx';
import classes from './DragDropList.module.scss';

export type IDragDrogItemProps<T> = T & { draggable?: boolean; key: string };

export default function DragDropList<P extends Object>({
	itemsComponent: ItemsComponent,
	itemPropsList,
	onReorder,
}: {
	itemsComponent: ComponentType<P>;
	itemPropsList: IDragDrogItemProps<P>[];
	onReorder: (state: P[]) => void;
}) {
	const [state, setState] = useState([...itemPropsList]);

	useEffect(() => {
		setState(itemPropsList);
	}, [itemPropsList]);

	const handleReorder = ({ from, to }: { from: number; to: number }) => {
		setState(() => {
			const newState = [...state];
			const [movedItem] = newState.splice(from, 1);
			newState.splice(to, 0, movedItem);

			onReorder(newState);
			return newState;
		});
	};

	const items = state.map((itemProps, index) => {
		return (
			<Draggable
				key={itemProps.key}
				index={index}
				draggableId={itemProps.key}
				isDragDisabled={!itemProps.draggable}
			>
				{(provided, snapshot) => (
					<div
						className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<ItemsComponent {...itemProps} />
					</div>
				)}
			</Draggable>
		);
	});

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) => {
				handleReorder({ from: source.index, to: destination?.index || 0 });
			}}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div className={classes.items} {...provided.droppableProps} ref={provided.innerRef}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
