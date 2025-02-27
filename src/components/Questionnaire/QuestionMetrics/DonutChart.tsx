/* eslint-disable react/no-array-index-key */
import { DonutChartCell, DonutChart as MantineDonutChart } from '@mantine/charts';
import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';

function Legend({ color, name, value }: DonutChartCell) {
	const theme = useMantineTheme();

	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<Box w={110} display="flex" style={{ alignItems: 'center' }}>
				<IconCircleFilled width={12} height={12} color={theme.colors[color][5]} />
				<Text ml={5} size="xs" fw={600} c="gray.7">
					{name}
				</Text>
			</Box>
			<Text size="xs" fw={700} c="gray.7">
				{value}
			</Text>
		</Box>
	);
}

export default function DonutChart({ data }: { data: DonutChartCell[] }) {
	const theme = useMantineTheme();

	return (
		<Group
			display="flex"
			style={{
				alignItems: 'center',
				gap: theme.spacing.sm,
				borderRadius: theme.radius.md,
				border: `1px solid${theme.colors.gray[4]}`,
			}}
			bg="gray.0"
			p="xs"
		>
			<MantineDonutChart styles={{ root: { display: 'flex' } }} size={70} data={data} withTooltip={false} />
			<Group maw={300}>
				{data.map(({ color, name, value }, i) => (
					<Legend color={color} name={name} value={value} key={`legend-${i}`} />
				))}
				<Legend
					value={data.reduce((acc, { value }) => acc + value, 0)}
					color="gray"
					name="Total"
					key="legend"
				/>
			</Group>
		</Group>
	);
}
