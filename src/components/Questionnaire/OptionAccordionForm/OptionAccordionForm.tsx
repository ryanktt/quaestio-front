import AccordionFormItem from '@components/Questionnaire/AccordionFormItem/AccordionFormItem.tsx';
import { GetInputPropsType } from 'node_modules/@mantine/form/lib/types';
import { Checkbox, Textarea, useMantineTheme } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { nanoid } from 'nanoid/non-secure';
import { ChangeEvent, useState } from 'react';

export interface IOptionProps {
	id: string;
	title: string;
	feedbackAfterSubmit: string;
	correct: boolean | '';
}

export interface IUpsertOptionProps {
	badge: string;
	option?: IOptionProps;
	method?: 'ADD' | 'EDIT';
	draggable?: boolean;
	onDelete?: (optionId: string) => void;
	onSave?: (option: IOptionProps) => void;
}

const initialProps: IOptionProps = {
	id: nanoid(),
	feedbackAfterSubmit: '',
	correct: '',
	title: '',
};

export default function OptionAccordionForm({
	option: optionProp = initialProps,
	draggable = true,
	method = 'EDIT',
	badge,
	onDelete = () => {},
	onSave = () => {},
}: IUpsertOptionProps) {
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

	const handleChange = (e: ChangeEvent, item: keyof IOptionProps) => {
		form.getInputProps(item).onChange(e);
		setChanged(true);
	};

	const getInputProps = (item: keyof IOptionProps, inputType: GetInputPropsType = 'input') => ({
		...form.getInputProps(item, { type: inputType }),
		onChange: (e: ChangeEvent) => handleChange(e, item),
	});

	const closeItem = () => {
		setChanged(false);
		if (method === 'ADD') {
			form.setValues({ ...optionProp, id: nanoid() });
		}
		form.reset();
	};

	const saveItem = () => {
		if (!form.validate().hasErrors) {
			onSave(getOption());
			closeItem();
		}
	};

	const deleteItem = () => {
		onDelete(form.getValues().id);
	};

	return (
		<AccordionFormItem
			badge={badge}
			type="Option"
			draggable={draggable}
			method={method}
			label={optionProp.title}
			showSaveOption={isChanged}
			onSave={saveItem}
			onClose={closeItem}
			onDelete={deleteItem}
		>
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
			<Checkbox {...getInputProps('correct', 'checkbox')} color={theme.colors.indigo[6]} label="Correct option" />
		</AccordionFormItem>
	);
}
