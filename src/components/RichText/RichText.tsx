/* eslint-disable react/no-this-in-sfc */
import {
	Button,
	InputLabel,
	InputWrapper,
	InputWrapperProps,
	Popover,
	rem,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconCheck, IconImageInPicture } from '@tabler/icons-react';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Highlight from '@tiptap/extension-highlight';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import { useEffect, useState } from 'react';
import ImageExtension from './ImageExtension.ts';
import styles from './RichText.module.scss';

function InsertImageControl() {
	const { editor } = useRichTextEditorContext();
	const theme = useMantineTheme();

	const [opened, setOpened] = useState(false);
	const [url, setUrl] = useState('');

	const addImage = () => {
		if (url && editor) {
			editor?.commands.setImage({ src: url });
			setOpened(false);
			setUrl('');
		}
	};

	if (!editor) {
		return null;
	}

	return (
		<Popover opened={opened} onChange={setOpened}>
			<Popover.Target>
				<RichTextEditor.Control
					onClick={() => setOpened((o) => !o)}
					aria-label="Insert Image"
					title="Insert Image"
				>
					<IconImageInPicture stroke={1.5} style={{ width: rem(16) }} />
				</RichTextEditor.Control>
			</Popover.Target>

			<Popover.Dropdown display="flex" style={{ gap: rem(10), alignItems: 'center' }}>
				<TextInput size="xs" placeholder="The image URL" onChange={(e) => setUrl(e.target.value)} />
				<Button onClick={addImage} size="compact-md" variant="outline" c={theme.colors.indigo[6]}>
					<IconCheck />
				</Button>
			</Popover.Dropdown>
		</Popover>
	);
}

export default function RichTextInput({
	onUpdate = () => {},
	editable = true,
	label,
	value = '',
	inputProps,
}: {
	editable?: boolean;
	onUpdate?: (html: string) => void;
	label?: string;
	value?: string;
	inputProps: InputWrapperProps;
}) {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			ListItem,
			Bold,
			Italic,
			Strike,
			BulletList,
			Underline,
			Highlight,
			Code,
			ImageExtension,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			HardBreak.extend({
				addKeyboardShortcuts() {
					return {
						Enter: () => this.editor.commands.setHardBreak(),
					};
				},
			}),
		],

		onUpdate: ({ editor: e }) => onUpdate(e.getHTML()),
		content: value,
	});

	const theme = useMantineTheme();
	useEffect(() => editor?.setOptions({ editable }), [editor, editable]);

	return (
		<div>
			{label ? (
				<InputLabel>
					{label} {inputProps.required ? '*' : ''}
				</InputLabel>
			) : null}
			<InputWrapper {...inputProps}>
				<RichTextEditor
					style={{
						cursor: editable ? 'auto' : 'not-allowed',
						backgroundColor: editable ? theme.white : theme.colors.gray[0],
					}}
					inputMode="text"
					editor={editor}
					variant="subtle"
				>
					<RichTextEditor.Toolbar p={3}>
						<RichTextEditor.ControlsGroup className={!editable ? styles.disabled : ''}>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.ClearFormatting />
							<RichTextEditor.Highlight />
							<RichTextEditor.Code />
							<RichTextEditor.BulletList />
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignRight />
							<InsertImageControl />
						</RichTextEditor.ControlsGroup>
					</RichTextEditor.Toolbar>
					<RichTextEditor.Content
						inputMode="text"
						bg={editable ? theme.white : theme.colors.gray[0]}
						style={{
							resize: 'vertical',
							overflow: 'auto',
							color: theme.colors.gray[8],
						}}
						fz="sm"
						fw={500}
					/>
				</RichTextEditor>
			</InputWrapper>
		</div>
	);
}
