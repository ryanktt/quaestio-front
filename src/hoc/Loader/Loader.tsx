import { Center, useMantineTheme } from '@mantine/core';
import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
	const theme = useMantineTheme();
	return (
		<Center h={600}>
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color={theme.colors.violet[5]}
				ariaLabel="three-dots-loading"
			/>
		</Center>
	);
}
