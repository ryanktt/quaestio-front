import { Badge, Button, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconGripVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { PropsWithChildren, useState } from 'react';
import styles from './AccordionFormItem.module.scss';

export interface IAccordionFormItemProps {
	badge: string;
	label?: string;
	type: 'Option' | 'Question';
	method?: 'ADD' | 'EDIT';
	draggable?: boolean;
	onDelete?: () => void;
	onClose?: () => void;
	onSave?: () => { preventClose?: boolean };
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
	onClose = () => {},
	onSave = () => ({ preventClose: false }),
	enableOpen = true,
	showSaveOption,
}: PropsWithChildren & IAccordionFormItemProps) {
	const theme = useMantineTheme();

	const buttonStyleProps = {
		variant: 'subtle',
		size: 'md',
		color: theme.colors.indigo[7],
		p: '0 15px',
	};

	const [isOpen, setOpen] = useState(false);
	const closeItem = () => {
		onClose();
		setOpen(false);
	};

	const saveItem = () => {
		const { preventClose } = onSave();
		if (!preventClose) closeItem();
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
		<div className={styles.item}>
			<div className={styles.toolbar}>
				<div className={styles.toolbarContent}>
					{method === 'EDIT' ? <IconGripVertical className={styles.dragIcon} size={18} stroke={1.5} /> : null}
					<Badge variant="light" className={styles.badge} ml={method === 'ADD' ? 10 : 0}>
						{badge}
					</Badge>
					<Text className={styles.toolbarDescription} size="sm">
						{label}
					</Text>
				</div>
				<div className={styles.toolbarButtons}>{getItemButtons()}</div>
			</div>

			<div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
				<div className={styles.form}>
					<div className={styles.formContent}>{children}</div>
				</div>
			</div>
		</div>
	);
}
