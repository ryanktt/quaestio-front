import { Draggable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { PropsWithChildren } from 'react';
import classes from './DragDropList.module.scss';

export default function DragDropItem({
	isDragDisabled,
	children,
	index,
	draggableId,
}: {
	isDragDisabled: boolean;
	draggableId: string;
	index: number;
	mb?: string;
} & PropsWithChildren) {
	return (
		<Draggable key={draggableId} index={index} draggableId={draggableId} isDragDisabled={isDragDisabled}>
			{(provided, snapshot) => (
				<div
					className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{children}
				</div>
			)}
		</Draggable>
	);
}
