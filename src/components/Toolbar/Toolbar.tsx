import '@mantine/core/styles.css';
import { Box, Input, Tooltip, UnstyledButton } from '@mantine/core';
import { IconFileAnalytics, IconFilePlus, IconFiles, IconHome2, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './Toolbar.module.scss';

interface SectionNavProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

const sectionNavData = [
	{ icon: IconFilePlus, label: 'Create Questionnaire' },
	{ icon: IconFiles, label: 'Questionnaire List' },
	{ icon: IconFileAnalytics, label: 'Analytics' },
];

function ToolbarItem({ icon: Icon, label, active, onClick }: SectionNavProps) {
	return (
		<div className={classes['toolbar-item']}>
			<Tooltip label={label} position="top" transitionProps={{ duration: 0 }}>
				<UnstyledButton onClick={onClick} className={classes['toolbar-icon']} data-active={active || undefined}>
					<Icon size={20} stroke={2} />
				</UnstyledButton>
			</Tooltip>
		</div>
	);
}

function ToolbarSearch({ onClick }: { onClick?: () => void }) {
	return (
		<div className={`${classes['toolbar-search']}`}>
			<Box onClick={onClick} className={classes['toolbar-icon']}>
				<IconSearch size={16} stroke={2} />
			</Box>
			<Input className={classes['search-input']} placeholder="Search for questionnaires" variant="default" />
		</div>
	);
}

export default function Toolbar() {
	const [active, setActive] = useState(2);

	const sectionsNavItems = sectionNavData.map((link, index) => (
		<ToolbarItem {...link} key={link.label} active={index === active} onClick={() => setActive(index)} />
	));

	return (
		<div className={classes.toolbar}>
			<ToolbarSearch key="toolbar-search" />
			<div className={classes['toolbar-items']}>{sectionsNavItems}</div>
		</div>
	);
}
