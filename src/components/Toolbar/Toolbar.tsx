import '@mantine/core/styles.css';
import { Box, Input, Tooltip, UnstyledButton } from '@mantine/core';
import { IconFilePlus, IconFiles, IconHome2, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Toolbar.module.scss';

interface ToolbarNavProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

const toolbarNavData = [
	{ icon: IconFilePlus, label: 'Create Questionnaire', path: '/create-questionnaire' },
	{ icon: IconFiles, label: 'Questionnaire List', path: '/questionnaire-list' },
];

function ToolbarItem({ icon: Icon, label, active, onClick }: ToolbarNavProps) {
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
	const location = useLocation();
	const navigate = useNavigate();

	const sectionsNavItems = toolbarNavData.map((link) => (
		<ToolbarItem
			{...link}
			key={link.label}
			active={location.pathname === link.path}
			onClick={() => navigate(link.path)}
		/>
	));

	return (
		<div className={classes.toolbar}>
			<ToolbarSearch key="toolbar-search" />
			<div className={classes['toolbar-items']}>{sectionsNavItems}</div>
		</div>
	);
}
