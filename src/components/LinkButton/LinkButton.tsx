import { Box, Title, rem } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import styles from './LinkButton.module.scss';

export default function LinkButton({ path, label }: { path: string; label: string }) {
	const navigate = useNavigate();

	return (
		<Box className={styles.link} onClick={() => navigate(path)}>
			<Box w="100%" style={{ display: 'flex', alignItems: 'center' }}>
				<Title size="md" fw={500} c="white">
					{label}
				</Title>
			</Box>
			<IconExternalLink color="white" style={{ height: rem(22), width: rem(22) }} />
		</Box>
	);
}
