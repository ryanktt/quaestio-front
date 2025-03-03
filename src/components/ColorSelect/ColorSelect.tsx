import {
	Box,
	ColorSwatch,
	Combobox,
	Group,
	Input,
	InputLabel,
	Text,
	useCombobox,
	useMantineTheme,
} from '@mantine/core';
import { useEffect, useState } from 'react';

export type IColorOption = { label: string; value: string };

function ColorSelect({
	selectedColorLabel,
	colorOptions,
	onSelected,
	label,
}: {
	label: string;
	selectedColorLabel?: string;
	colorOptions: IColorOption[];
	onSelected: (c: IColorOption) => void;
}) {
	const theme = useMantineTheme();
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});
	const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

	useEffect(() => {
		const selected = colorOptions.find(({ label: l }) => l === selectedColorLabel);
		if (selected) setSelectedColor(selected);
		else setSelectedColor(colorOptions[0]);
	}, [selectedColorLabel]);

	return (
		<div>
			<InputLabel>{label}</InputLabel>
			<Combobox store={combobox} withinPortal={false}>
				<Combobox.Target>
					<Input
						fw={500}
						component="button"
						type="button"
						onClick={() => combobox.toggleDropdown()}
					>
						<Group style={{ overflow: 'hidden', flexWrap: 'nowrap', minWidth: '0' }}>
							<ColorSwatch color={selectedColor.value} size={18} />
							<Text size="sm" fw={500} style={{ color: theme.colors.dark[7] }} tt="capitalize">
								{selectedColor.label}
							</Text>
						</Group>
					</Input>
				</Combobox.Target>

				<Combobox.Dropdown>
					<Box
						display="flex"
						p={theme.spacing.sm}
						style={{ gap: theme.spacing.sm, flexWrap: 'wrap' }}
					>
						{colorOptions.map((color) => (
							<Combobox.Option
								p={0}
								key={color.value}
								value={color.value}
								onClick={() => {
									onSelected(color);
									combobox.closeDropdown();
								}}
							>
								<Group>
									<ColorSwatch color={color.value} size={25} />
								</Group>
							</Combobox.Option>
						))}
					</Box>
				</Combobox.Dropdown>
			</Combobox>
		</div>
	);
}

export default ColorSelect;
