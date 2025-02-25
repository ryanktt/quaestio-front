import { Badge } from '@mantine/core';
import styles from './StatusBadge.module.scss';

export default function StatusBadge({ active }: { active?: boolean }) {
	return (
		<Badge variant="dot" className={`${styles.status} ${active ? styles.active : ''}`}>
			{active ? 'Active' : 'Unactive'}
		</Badge>
	);
}
