import { Badge, Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconGripVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { PropsWithChildren, useState } from 'react';
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
}

export default function AccordionFormItem({
	draggable = true,
	label,
	method = 'EDIT',
	badge,
	type,
	children,
	onDelete = () => {},
	onSave = () => {},
	onClose = () => {},
	showSaveOption,
}: PropsWithChildren & IAccordionFormItemProps) {
	const theme = useMantineTheme();

	const buttonStyleProps = { variant: 'subtle', size: 'md', color: theme.colors.indigo[7], p: '0 15px' };

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
					<Button onClick={() => setOpen(true)} {...buttonStyleProps}>
						<IconPlus size={18} />
					</Button>
				</Tooltip>
			);
		}
		if (method === 'EDIT') {
			return (
				<>
					<Tooltip label={`Delete ${type}`}>
						<Button onClick={onDelete} {...buttonStyleProps}>
							<IconTrash size={18} stroke={1.7} />
						</Button>
					</Tooltip>
					<Tooltip label={`Edit ${type}`}>
						<Button onClick={() => setOpen(true)} {...buttonStyleProps}>
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
					{draggable ? <IconGripVertical className={classes.dragIcon} size={18} stroke={1.5} /> : null}
					<Badge variant="light" className={classes.badge} ml={!draggable ? 10 : 0}>
						{badge}
					</Badge>
					<Text className={classes.toolbarDescription} size="sm">
						{label}
					</Text>
				</div>
				<div className={classes.toolbarButtons}>{getItemButtons()}</div>
			</div>

			<div className={`${classes.content} ${isOpen ? classes.open : ''}`}>
				<div className={classes.form}>{children}</div>
			</div>
		</div>
	);
}
