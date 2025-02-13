import { Tooltip, UnstyledButton } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconFilePlus, IconHome2, IconList } from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from './Search.tsx';
import classes from './Toolbar.module.scss';

interface ToolbarNavProps {
	icon: typeof IconHome2;
	label: string;
	active?: boolean;
	onClick?: () => void;
}

const toolbarNavData = [
	{ icon: IconList, label: 'Questionnaire List', path: '/board/questionnaires' },
	{ icon: IconFilePlus, label: 'Create Questionnaire', path: '/board/questionnaire/create' },
];

function ToolbarItem({ icon: Icon, label, active, onClick }: ToolbarNavProps) {
	return (
		<div className={classes.item}>
			<Tooltip label={label} position="top">
				<UnstyledButton onClick={onClick} className={classes.itemIcon} data-active={active || undefined}>
					<Icon size={20} stroke={2} />
				</UnstyledButton>
			</Tooltip>
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
			<Search key="search" />
			<div className={classes.items}>{sectionsNavItems}</div>
		</div>
	);
}
