import { Badge, Button, Checkbox, Text, Textarea, Tooltip, useMantineTheme } from '@mantine/core';
import { IconCheck, IconEdit, IconGripVertical, IconPlus, IconTrash, IconX } from '@tabler/icons-react';
import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { hasLength, useForm } from '@mantine/form';
import classes from './Questionnaire.module.scss';

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

	const handleChanged = (e: ChangeEvent, item: keyof IOptionProps) => {
		form.getInputProps(item).onChange(e);
		setChanged(true);
	};

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
						<Button onClick={closeItem} variant="subtle" size="md" color={theme.colors.pink[9]}>
							<IconX size={18} />
						</Button>
					</Tooltip>
					{isChanged ? (
						<Tooltip label="Save">
							<Button onClick={setItem} variant="subtle" size="md" color={theme.colors.cyan[9]}>
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
					<Button onClick={() => setOpen(true)} variant="subtle" size="md" color={theme.colors.indigo[9]}>
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
						<Button onClick={() => setOpen(true)} variant="subtle" size="md" color={theme.colors.indigo[9]}>
							<IconEdit size={18} />
						</Button>
					</Tooltip>
				</>
			);
		}
		return null;
	};

	return (
		<div style={{ border: '1px solid', borderColor: theme.colors.gray[3], borderRadius: theme.radius.md }}>
			<div className={classes.draggable}>
				{draggable ? <IconGripVertical className={classes.icon} size={18} stroke={1.5} /> : null}
				<div
					key={getOption().id}
					style={{
						width: '100%',
						justifyContent: 'space-between',
						alignContent: 'center',
						display: 'flex',
					}}
				>
					<div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
						<Badge variant="light" color={theme.colors.indigo[9]} size="md" ml={10}>
							{badge}
						</Badge>
						<Text c={theme.colors.gray[6]} size="sm">
							{optionProp.title}
						</Text>
					</div>
					<div style={{ display: 'flex' }}>{getItemButtons()}</div>
				</div>
			</div>

			{isOpen ? (
				<div style={{ padding: theme.spacing.sm, backgroundColor: theme.colors.gray[0] }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: theme.spacing.md,
							margin: '15px 0',
						}}
					>
						<Textarea
							{...form.getInputProps('title')}
							onChange={(e) => handleChanged(e, 'title')}
							label="Option description"
							required
							resize="vertical"
							placeholder="The option description"
							error={form.errors.title}
							inputWrapperOrder={['label', 'error', 'input']}
						/>
						<Textarea
							{...form.getInputProps('feedbackAfterSubmit')}
							onChange={(e) => handleChanged(e, 'feedbackAfterSubmit')}
							label="Option feedback"
							resize="vertical"
							placeholder="Feedback for this option"
							error={form.errors.feedbackAfterSubmit}
							inputWrapperOrder={['label', 'error', 'input']}
						/>
						<Checkbox
							{...form.getInputProps('correct')}
							onChange={(e) => handleChanged(e, 'correct')}
							color={theme.colors.indigo[6]}
							label="Correct option"
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}
