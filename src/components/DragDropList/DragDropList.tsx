import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { PropsWithChildren, useEffect, useState } from 'react';
import classes from './DragDropList.module.scss';

export type IDragDrogItemProps<T> = T & { draggable?: boolean; key: string };

export default function DragDropList({
	orderedItems,
	onReorder,
	children,
}: {
	onReorder: (listState: { id: string }[]) => void;
	orderedItems: { id: string }[];
} & PropsWithChildren) {
	const [state, setState] = useState<typeof orderedItems>([]);

	useEffect(() => {
		setState(orderedItems);
	}, [orderedItems]);

	const handleReorder = ({ from, to }: { from: number; to: number }) => {
		setState(() => {
			const newState = [...state];
			const [movedItem] = newState.splice(from, 1);
			newState.splice(to, 0, movedItem);

			onReorder(newState);
			return newState;
		});
	};

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) => {
				handleReorder({ from: source.index, to: destination?.index || 0 });
			}}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided) => (
					<div className={classes.items} {...provided.droppableProps} ref={provided.innerRef}>
						{children}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
