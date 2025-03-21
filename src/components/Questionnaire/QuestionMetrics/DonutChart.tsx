/* eslint-disable react/no-array-index-key */
import { DonutChartCell, DonutChart as MantineDonutChart } from '@mantine/charts';
import { Box, Text, getGradient, rem, useMantineTheme } from '@mantine/core';
import { IconCircleFilled } from '@tabler/icons-react';

function Legend({ color, name, value }: DonutChartCell) {
	const theme = useMantineTheme();

	return (
		<Box display="flex" style={{ alignItems: 'center' }}>
			<Box w={110} display="flex" style={{ alignItems: 'center' }}>
				<IconCircleFilled
					style={{ width: rem(12), height: rem(12) }}
					color={theme.colors[color][5]}
				/>
				<Text ml={5} style={{ fontSize: rem(13) }} fw={500} c="gray.7">
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

	const totalValue = data.reduce((acc, { value }) => value + acc, 0);

	return (
		<Box
			display="flex"
			style={{
				alignItems: 'center',
				gap: theme.spacing.sm,
				background: getGradient({ from: 'gray.0', to: 'white', deg: 30 }, theme),
				borderRadius: theme.radius.md,
				border: `1px solid${theme.colors.gray[4]}`,
			}}
			miw={250}
			p="xs"
		>
			{totalValue ? (
				<MantineDonutChart
					size={70}
					data={data}
					valueFormatter={(v) => {
						const percentage = ((v / totalValue) * 100).toFixed(0);
						return `${percentage}%`;
					}}
				/>
			) : null}
			<Box style={{ display: 'flex', flexDirection: 'column', gap: rem(3) }}>
				{data.map(({ color, name, value }, i) => (
					<Legend color={color} name={name} value={value} key={`legend-${i}`} />
				))}
				<Legend
					value={data.reduce((acc, { value }) => acc + value, 0)}
					color="gray"
					name="Total"
					key="legend"
				/>
			</Box>
		</Box>
	);
}
