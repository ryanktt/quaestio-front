import { Badge, Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconGripVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { CSSProperties, LegacyRef, PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import classes from './AccordionFormItem.module.scss';

export interface IAccordionFormItemProps {
	badge: string;
	label?: string;
	type: 'Option' | 'Question';
	method?: 'ADD' | 'EDIT';
	draggable?: boolean;
	onDelete?: () => void;
	onSave?: () => void;
	onClose?: () => void;
	showSaveOption: boolean;
	enableOpen?: boolean;
}

export default function AccordionFormItem({
	label,
	method = 'EDIT',
	badge,
	type,
	children,
	onDelete = () => {},
	onSave = () => {},
	onClose = () => {},
	enableOpen = true,
	showSaveOption,
}: PropsWithChildren & IAccordionFormItemProps) {
	const theme = useMantineTheme();
	const [contentHeight, setContentHeight] = useState(0);
	const contentRef = useRef<{ clientHeight: number }>(null);

	useLayoutEffect(() => {
		setContentHeight(contentRef?.current?.clientHeight || 0);
	});

	const buttonStyleProps = {
		variant: 'subtle',
		size: 'md',
		color: theme.colors.indigo[7],
		p: '0 15px',
	};

	const [isOpen, setOpen] = useState(false);
	const closeItem = () => {
		setOpen(false);
		onClose();
	};

	const saveItem = () => {
		onSave();
		closeItem();
	};

	const getItemButtons = () => {
		if (isOpen) {
			return (
				<>
					<Tooltip label="Cancel">
						<Button onClick={closeItem} {...buttonStyleProps}>
							<IconX size={18} />
						</Button>
					</Tooltip>
					{showSaveOption ? (
						<Tooltip label="Save Changes">
							<Button onClick={saveItem} {...buttonStyleProps}>
								<IconCheck size={18} />
							</Button>
						</Tooltip>
					) : null}
				</>
			);
		}
		if (method === 'ADD') {
			return (
				<Tooltip label="Add Option">
					<Button onClick={() => setOpen(true)} disabled={!enableOpen} {...buttonStyleProps}>
						<IconPlus size={18} />
					</Button>
				</Tooltip>
			);
		}
		if (method === 'EDIT') {
			return (
				<>
					<Tooltip label={`Delete ${type}`}>
						<Button onClick={onDelete} disabled={!enableOpen} {...buttonStyleProps}>
							<IconTrash size={18} stroke={1.7} />
						</Button>
					</Tooltip>
					<Tooltip label={`Edit ${type}`}>
						<Button onClick={() => setOpen(true)} disabled={!enableOpen} {...buttonStyleProps}>
							<IconEdit size={18} stroke={1.7} />
						</Button>
					</Tooltip>
				</>
			);
		}
		return null;
	};

	return (
		<div className={classes.item}>
			<div className={classes.toolbar}>
				<div className={classes.toolbarContent}>
					{method === 'EDIT' ? (
						<IconGripVertical className={classes.dragIcon} size={18} stroke={1.5} />
					) : null}
					<Badge variant="light" className={classes.badge} ml={method === 'ADD' ? 10 : 0}>
						{badge}
					</Badge>
					<Text className={classes.toolbarDescription} size="sm">
						{label}
					</Text>
				</div>
				<div className={classes.toolbarButtons}>{getItemButtons()}</div>
			</div>

			<div
				className={`${classes.content} ${isOpen ? classes.open : ''}`}
				style={{ '--max-content-height': `${contentHeight + 300}px` } as CSSProperties}
			>
				<div ref={contentRef as LegacyRef<HTMLDivElement>} className={classes.form}>
					{children}
				</div>
			</div>
		</div>
	);
}
