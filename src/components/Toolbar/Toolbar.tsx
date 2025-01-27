import '@mantine/core/styles.css';
import { Box, Input, Tooltip, UnstyledButton } from '@mantine/core';
import { IconFilePlus, IconHome2, IconList, IconSearch } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Toolbar.module.scss';

interface ToolbarNavProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

const toolbarNavData = [
	{ icon: IconFilePlus, label: 'Create Questionnaire', path: '/board/questionnaire/create' },
	{ icon: IconList, label: 'Questionnaire List', path: '/board/questionnaires' },
];

function ToolbarItem({ icon: Icon, label, active, onClick }: ToolbarNavProps) {
	return (
		<div className={classes.item}>
			<Tooltip label={label} position="top" transitionProps={{ duration: 0 }}>
				<UnstyledButton onClick={onClick} className={classes.itemIcon} data-active={active || undefined}>
					<Icon size={20} stroke={2} />
				</UnstyledButton>
			</Tooltip>
		</div>
	);
}

function ToolbarSearch({ onClick }: { onClick?: () => void }) {
	return (
		<div className={`${classes.search}`}>
			<Box onClick={onClick} className={classes.icon}>
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
			<ToolbarSearch key="search" />
			<div className={classes.items}>{sectionsNavItems}</div>
		</div>
	);
}
