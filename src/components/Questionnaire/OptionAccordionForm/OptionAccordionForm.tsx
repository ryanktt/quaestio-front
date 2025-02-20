import AccordionFormItem from '@components/Questionnaire/AccordionFormItem/AccordionFormItem.tsx';
import { Checkbox, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import { GetInputPropsType } from 'node_modules/@mantine/form/lib/types';
import { ChangeEvent, useState } from 'react';

export interface IOptionProps {
	id: string;
	title: string;
	feedbackAfterSubmit: string;
	correct: boolean | '';
}

export interface IOptionAccordionFormProps {
	badge: string;
	option?: IOptionProps;
	method?: 'ADD' | 'EDIT';
	enableToolbarOptions?: boolean;
	setOpen?: () => boolean | null;
	onDelete?: (optionId: string) => void;
	onSave?: (option: IOptionProps) => void;
	onStartEdit?: (option: IOptionProps) => void;
	onFinishEdit?: (option: IOptionProps) => void;
}

const initialProps: IOptionProps = {
	id: nanoid(),
	feedbackAfterSubmit: '',
	correct: '',
	title: '',
};

export default function OptionAccordionForm({
	option: optionProp = initialProps,
	method = 'EDIT',
	badge,
	enableToolbarOptions = true,
	setOpen = () => null,
	onDelete = () => {},
	onSave = () => {},
	onStartEdit = () => {},
	onFinishEdit = () => {},
}: IOptionAccordionFormProps) {
	const theme = useMantineTheme();
	const form = useForm<IOptionProps>({
		mode: 'controlled',
		initialValues: optionProp,
		validate: {
			title: hasLength({ min: 1 }, 'Title is missings'),
		},
		validateInputOnBlur: true,
	});

	const [isChanged, setChanged] = useState(false);
	const getOption = (): IOptionProps => form.getValues();
	const [feedbackEnabled, setFeedbackEnabled] = useState(!!getOption().feedbackAfterSubmit);

	const handleChange = (e: ChangeEvent, item: keyof IOptionProps) => {
		form.getInputProps(item).onChange(e);
		setChanged(true);
		onStartEdit(getOption());
	};

	const getInputProps = (item: keyof IOptionProps, inputType: GetInputPropsType = 'input') => ({
		...form.getInputProps(item, { type: inputType }),
		onChange: (e: ChangeEvent) => handleChange(e, item),
	});

	const closeItem = () => {
		setChanged(false);
		onFinishEdit(getOption());
		setTimeout(() => {
			form.reset();
		}, 300);
	};

	const saveItem = (): { preventClose?: boolean } => {
		const savedOption = getOption();
		if (!form.validate().hasErrors) {
			form.setInitialValues(method === 'ADD' ? { ...initialProps, id: nanoid() } : savedOption);
			onSave(getOption());
			closeItem();
			return { preventClose: false };
		}
		return { preventClose: true };
	};

	const deleteItem = () => {
		onDelete(form.getValues().id);
	};

	return (
		<AccordionFormItem
			key={getOption().id}
			badge={badge}
			type="Option"
			method={method}
			label={optionProp.title}
			enableToolbarOptions={enableToolbarOptions}
			isEditing={isChanged}
			setOpen={setOpen}
			onSave={saveItem}
			onClose={closeItem}
			onDelete={deleteItem}
		>
			<TextInput
				{...getInputProps('title')}
				label="Option title"
				required={!(method === 'ADD') || isChanged}
				placeholder="The option title"
				inputWrapperOrder={['label', 'error', 'input']}
			/>
			<div>
				<Checkbox
					color={theme.colors.indigo[6]}
					onChange={(event) => setFeedbackEnabled(event.currentTarget.checked)}
					checked={feedbackEnabled}
					mb={5}
					label="Option feedback"
				/>
				{feedbackEnabled ? (
					<Textarea
						{...getInputProps('feedbackAfterSubmit')}
						label="Option feedback"
						resize="vertical"
						placeholder="Feedback for this option"
						error={method === 'ADD' ? null : form.getInputProps('feedbackAfterSubmit').error}
						inputWrapperOrder={['label', 'error', 'input']}
					/>
				) : null}
			</div>

			<Checkbox {...getInputProps('correct', 'checkbox')} color={theme.colors.indigo[6]} label="Correct option" />
		</AccordionFormItem>
	);
}
