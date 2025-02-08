import AccordionFormItem from '@components/Questionnaire/AccordionFormItem/AccordionFormItem.tsx';
import RichTextInput from '@components/RichText/RichText';
import { Checkbox, useMantineTheme } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import { GetInputPropsType } from 'node_modules/@mantine/form/lib/types';
import { useState } from 'react';

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
			title: hasLength({ min: 2, max: 255 }, 'Title must be 3-255 characters long'),
		},
		validateInputOnBlur: true,
	});

	const [isChanged, setChanged] = useState(false);
	const getOption = (): IOptionProps => form.getValues();

	const handleChange = (e: unknown, item: keyof IOptionProps) => {
		form.getInputProps(item).onChange(e);
		setChanged(true);
		onStartEdit(getOption());
	};

	const getInputProps = (item: keyof IOptionProps, inputType: GetInputPropsType = 'input') => ({
		...form.getInputProps(item, { type: inputType }),
		onChange: (e: unknown) => handleChange(e, item),
	});

	const closeItem = () => {
		setChanged(false);
		onFinishEdit(getOption());
		form.reset();
		if (method === 'ADD') {
			form.setInitialValues({ ...initialProps, id: nanoid() });
			form.reset();
		}
	};

	const saveItem = (): { preventClose?: boolean } => {
		if (!form.validate().hasErrors) {
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
			key={optionProp.id}
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
			<RichTextInput
				label="Description"
				value={getOption().title}
				onUpdate={(html) => {
					getInputProps('title').onChange(html);
				}}
				inputProps={{
					error: form.errors.title,
					required: true,
					inputWrapperOrder: ['label', 'error', 'input'],
				}}
			/>
			<RichTextInput
				label="Option feedback"
				value={getOption().feedbackAfterSubmit}
				onUpdate={(html) => {
					getInputProps('feedbackAfterSubmit').onChange(html);
				}}
				inputProps={{
					error: form.errors.feedbackAfterSubmit,
					inputWrapperOrder: ['label', 'error', 'input'],
				}}
			/>

			<Checkbox {...getInputProps('correct', 'checkbox')} color={theme.colors.indigo[6]} label="Correct option" />
		</AccordionFormItem>
	);
}
