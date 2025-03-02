/* eslint-disable react/no-danger */
import { Badge, Button, rem, Text, Tooltip, useMantineTheme } from '@mantine/core';
import {
	IconCheck,
	IconChevronDown,
	IconChevronUp,
	IconGripVertical,
	IconPlus,
	IconTrash,
	IconX,
} from '@tabler/icons-react';
import { createMarkup } from '@utils/html';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import styles from './AccordionFormItem.module.scss';

export interface IAccordionFormItemProps {
	badge: string;
	badgeColor?: string;
	label?: string;
	type: 'Option' | 'Question';
	method?: 'ADD' | 'EDIT';
	draggable?: boolean;
	onDelete?: () => void;
	onClose?: () => void;
	onSave?: () => { preventClose?: boolean };
	isEditing: boolean;
	toolbarComponents?: React.ReactNode[];
	variant?: 'subtle' | 'filled';
	enableToolbarOptions?: boolean;
	deletable?: boolean;
	setOpen?: () => boolean | null;
}

export default function AccordionFormItem({
	label,
	method = 'EDIT',
	badge,
	badgeColor,
	type,
	children,
	onDelete = () => {},
	onClose = () => {},
	onSave = () => ({ preventClose: false }),
	enableToolbarOptions = true,
	setOpen: setOpenProp = () => null,
	variant = 'subtle',
	deletable = true,
	isEditing,
	toolbarComponents = [],
}: PropsWithChildren & IAccordionFormItemProps) {
	const theme = useMantineTheme();

	const buttonStyleProps = {
		color: variant === 'subtle' ? theme.colors.indigo[7] : theme.white,
		variant: 'subtle',
		size: 'md',
		h: 45,
		p: '0 15px',
	};

	const [isOpen, setOpen] = useState(setOpenProp() ?? false);

	const closeItem = () => {
		onClose();
		setOpen(false);
	};

	const saveItem = () => {
		const { preventClose } = onSave();
		if (!preventClose) closeItem();
	};

	useEffect(() => {
		setOpen(setOpenProp() ?? isOpen);
	}, [setOpenProp]);

	const getItemButtons = () => {
		if (isOpen) {
			return isEditing ? (
				<>
					<Tooltip label="Cancel Changes ">
						<Button onClick={closeItem} {...buttonStyleProps}>
							<IconX style={{ width: rem(18), height: rem(18) }} />
						</Button>
					</Tooltip>

					<Tooltip label="Save Changes">
						<Button onClick={saveItem} {...buttonStyleProps}>
							<IconCheck style={{ width: rem(18), height: rem(18) }} />
						</Button>
					</Tooltip>
				</>
			) : (
				<Tooltip label="Hide">
					<Button onClick={closeItem} {...buttonStyleProps}>
						<IconChevronUp style={{ width: rem(18), height: rem(18) }} />
					</Button>
				</Tooltip>
			);
		}
		if (method === 'ADD') {
			return (
				<Tooltip label={`Add ${type}`}>
					<Button
						onClick={() => setOpen(true)}
						disabled={!enableToolbarOptions}
						{...buttonStyleProps}
					>
						<IconPlus style={{ width: rem(18), height: rem(18) }} />
					</Button>
				</Tooltip>
			);
		}
		if (method === 'EDIT') {
			return (
				<>
					{deletable ? (
						<Tooltip label={`Delete ${type}`}>
							<Button onClick={onDelete} disabled={!enableToolbarOptions} {...buttonStyleProps}>
								<IconTrash style={{ width: rem(17), height: rem(17) }} stroke={1.7} />
							</Button>
						</Tooltip>
					) : null}
					<Tooltip label={`Show ${type}`}>
						<Button
							onClick={() => setOpen(true)}
							disabled={!enableToolbarOptions}
							{...buttonStyleProps}
						>
							<IconChevronDown style={{ width: rem(18), height: rem(18) }} />
						</Button>
					</Tooltip>
				</>
			);
		}
		return null;
	};

	return (
		<div className={`${styles.item} ${styles[variant]} }`}>
			<div className={styles.toolbar}>
				<div className={styles.toolbarContent}>
					{method === 'EDIT' ? (
						<div className={styles.dragIcon}>
							<IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
						</div>
					) : null}
					<Badge
						variant={variant === 'subtle' ? 'light' : 'filled'}
						className={styles.badge}
						c={badgeColor ? theme.colors[badgeColor][8] : undefined}
						bg={badgeColor ? theme.colors[badgeColor][1] : undefined}
						ml={method === 'ADD' ? 10 : 0}
					>
						{badge}
					</Badge>
					{toolbarComponents.length ? (
						<div style={{ margin: `0 ${rem(10)}`, display: 'flex', alignItems: 'center' }}>
							{...toolbarComponents}
						</div>
					) : null}
					{type === 'Question' ? (
						<div
							className={`${styles.toolbarDescription} ${styles.html}`}
							dangerouslySetInnerHTML={createMarkup(label || '')}
						/>
					) : (
						<Text className={styles.toolbarDescription} size="sm">
							{label}
						</Text>
					)}
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
