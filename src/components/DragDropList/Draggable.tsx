import { Draggable } from '@hello-pangea/dnd';
import { rem } from '@mantine/core';
import cx from 'clsx';
import { PropsWithChildren } from 'react';
import classes from './DragDropList.module.scss';

export default function DragDropItem({
	isDragDisabled,
	children,
	index,
	draggableId,
	mb = rem(5),
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
					style={{ marginBottom: mb }}
				>
					{children}
				</div>
			)}
		</Draggable>
	);
}
