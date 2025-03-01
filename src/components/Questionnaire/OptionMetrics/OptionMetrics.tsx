/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
import { Option, OptionMetrics } from '@gened/graphql';
import { Badge, Box, rem, Text, Title } from '@mantine/core';
import { useState } from 'react';
import styles from './OptionMetrics.module.scss';

function MetricsItem({
	totalSelectionCount,
	optionMetrics,
	option,
	index,
}: {
	optionMetrics: OptionMetrics;
	option: Option;
	index: number;
	totalSelectionCount: number;
}) {
	const [open, setOpen] = useState(false);

	const calculatePercentage = (part: number, total: number) => {
		if (total === 0) return 0;
		return ((part / total) * 100).toFixed(0);
	};

	const selectionPercent = calculatePercentage(optionMetrics.selectedCount, totalSelectionCount);

	return (
		<Box className={styles.option}>
			<Box
				style={{
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					alignItems: 'center',
					gap: rem(5),
				}}
				onClick={() => setOpen(!open)}
				className={styles.main}
				display="flex"
			>
				<Box display="flex" style={{ gap: rem(10), alignItems: 'center', overflow: 'hidden' }}>
					<Title size={12} c="black">
						{index + 1}
					</Title>
					<div>
						<Text truncate w={300}>
							{option.title}
						</Text>
					</div>
				</Box>
				<Box w={90}>
					{option.correct ? (
						<Badge size="sm" variant="dot" c="teal" color="teal">
							Correct
						</Badge>
					) : null}
				</Box>
				<Box display="flex" w={250} style={{ alignItems: 'center' }}>
					<Box w={100} pos="relative">
						<Box
							style={{ borderRadius: rem(3) }}
							w={100}
							h={12}
							bg="gray.5"
							pos="absolute"
							bottom={-6}
						/>
						<Box
							style={{ zIndex: 100, borderRadius: rem(3) }}
							w={selectionPercent}
							h={12}
							bg="blue.6"
							pos="absolute"
							bottom={-6}
						/>
					</Box>
					<Text ml={5} fw={600} w={33} style={{ fontSize: rem(12) }}>
						{selectionPercent}%
					</Text>
					{optionMetrics.selectedCount ? (
						<Text ml={3} style={{ fontSize: 12 }}>
							{optionMetrics.selectedCount} selection(s)
						</Text>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}

export default function OptionMetricsList({
	options,
	optionMetrics,
}: {
	options: Option[];
	optionMetrics: OptionMetrics[];
}) {
	return (
		<Box className={styles.options}>
			{options.map((option, i) => {
				const metrics = optionMetrics.find(({ _id }) => _id === option._id);
				return (
					<MetricsItem
						key={`metrics-accordion-item-${i}`}
						index={i}
						optionMetrics={metrics as OptionMetrics}
						option={option}
						totalSelectionCount={optionMetrics.reduce(
							(acc, { selectedCount }) => acc + selectedCount,
							0,
						)}
					/>
				);
			})}
		</Box>
	);
}
