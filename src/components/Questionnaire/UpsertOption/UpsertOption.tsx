import { Badge, Button, Checkbox, Text, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconGripVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { hasLength, useForm } from '@mantine/form';
import classes from './UpsertOption.module.scss';

type IMethod = 'ADD' | 'EDIT';

export interface IOptionProps {
	id: string;
	title: string;
	feedbackAfterSubmit: string;
	correct: boolean | '';
}

export interface IUpsertOptionProps {
	badge: string;
	option?: IOptionProps;
	method?: IMethod;
	draggable?: boolean;
	onDelete?: (optionId: string) => void;
	onSet?: (option: IOptionProps) => void;
}

const initialProps: IOptionProps = {
	id: nanoid(),
	feedbackAfterSubmit: '',
	correct: '',
	title: '',
};

export default function UpsertOption({
	option: optionProp = initialProps,
	draggable = true,
	method = 'EDIT',
	badge,
	onDelete = () => {},
	onSet = () => {},
}: IUpsertOptionProps) {
	const theme = useMantineTheme();

	const buttonStyleProps = { variant: 'subtle', size: 'md', color: theme.colors.indigo[9] };
	const form = useForm<IOptionProps>({
		mode: 'uncontrolled',
		initialValues: optionProp,
		validate: {
			title: hasLength({ min: 2, max: 255 }, 'Title must be 3-255 characters long'),
		},
		validateInputOnBlur: true,
	});

	const [isOpen, setOpen] = useState(false);
	const [isChanged, setChanged] = useState(false);

	const getOption = (): IOptionProps => form.getValues();

	const handleChange = (e: ChangeEvent, item: keyof IOptionProps) => {
		form.getInputProps(item).onChange(e);
		setChanged(true);
	};

	const getInputProps = (item: keyof IOptionProps) => ({
		...form.getInputProps(item),
		onChange: (e: ChangeEvent) => handleChange(e, item),
	});

	const closeItem = () => {
		setOpen(false);
		setChanged(false);
		form.reset();
		if (method === 'ADD') {
			form.setInitialValues({ ...initialProps, id: nanoid() });
			form.reset();
		}
	};

	const setItem = () => {
		if (!form.validate().hasErrors) {
			onSet(getOption());
			closeItem();
		}
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
					{isChanged ? (
						<Tooltip label="Save">
							<Button onClick={setItem} {...buttonStyleProps}>
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
					<Tooltip label="Delete Option">
						<Button
							onClick={() => onDelete(getOption().id)}
							variant="subtle"
							size="md"
							color={theme.colors.indigo[9]}
						>
							<IconTrash size={18} />
						</Button>
					</Tooltip>
					<Tooltip label="Edit Option">
						<Button onClick={() => setOpen(true)} {...buttonStyleProps}>
							<IconEdit size={18} />
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
				{draggable ? <IconGripVertical className={classes.dragIcon} size={18} stroke={1.5} /> : null}
				<div key={getOption().id} className={classes.toolbarContent}>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							gap: '15px',
						}}
					>
						<Badge variant="light" className={classes.badge} ml={!draggable ? 10 : 0}>
							{badge}
						</Badge>
						<Text truncate="end" c={theme.colors.gray[6]} size="sm">
							{optionProp.title}
						</Text>
					</div>
					<div style={{ display: 'flex' }}>{getItemButtons()}</div>
				</div>
			</div>

			{isOpen ? (
				<div className={classes.form}>
					<Textarea
						{...getInputProps('title')}
						label="Option description"
						required
						resize="vertical"
						placeholder="The option description"
						error={form.errors.title}
						inputWrapperOrder={['label', 'error', 'input']}
					/>
					<Textarea
						{...getInputProps('feedbackAfterSubmit')}
						label="Option feedback"
						resize="vertical"
						placeholder="Feedback for this option"
						error={form.errors.feedbackAfterSubmit}
						inputWrapperOrder={['label', 'error', 'input']}
					/>
					<Checkbox {...getInputProps('correct')} color={theme.colors.indigo[6]} label="Correct option" />
				</div>
			) : null}
		</div>
	);
}
