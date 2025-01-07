import { Box, Button, Center, Checkbox, TextInput, Textarea, Title, useMantineTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { hasLength, useForm } from '@mantine/form';
import { QuestionnaireType } from '@utils/generated/graphql';
import { useState } from 'react';

export default function QuestionnaireUpsert() {
	const theme = useMantineTheme();
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { title: '', description: '', requireEmail: false, requireName: false, questions: [] },
		validate: {
			title: hasLength({ min: 3, max: 255 }, 'Title must be 3-255 characters long'),
			description: hasLength({ min: 3, max: 255 }, 'Title must be 1-500 characters long'),
		},
	});

	const [type] = useState<QuestionnaireType>(QuestionnaireType.Survey);

	return (
		<Box
			p="20px"
			style={{
				border: '1px solid',
				borderColor: theme.colors.gray[3],
				borderRadius: theme.radius.md,
			}}
		>
			<Title mb={10} size={20}>
				New {type}
			</Title>
			<form
				onSubmit={form.onSubmit(() => {})}
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '12px',
				}}
			>
				<TextInput
					label="Name"
					placeholder={`The ${type}'s name`}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Textarea
					label="Description"
					placeholder={`The ${type}'s description`}
					inputWrapperOrder={['label', 'error', 'input']}
				/>
				<Checkbox defaultChecked={false} color={theme.colors.indigo[6]} label="Require user email" />
				<Checkbox defaultChecked={false} color={theme.colors.indigo[6]} label="Require user name" />
				<Center>
					<Button w="fit-content" justify="center" size="sm" mt="xl" type="submit" variant="gradient">
						Create {type}
					</Button>
				</Center>
			</form>
		</Box>
	);
}
