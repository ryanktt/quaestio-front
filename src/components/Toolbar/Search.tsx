import { DEBOUNCE_DELAY } from '@containers/Questionnaire/QuestionnaireList/QuestionnaireList';
import { GlobalContext } from '@contexts/Global/Global.context';
import { Box, Input, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Toolbar.module.scss';

export default function Search() {
	const { setSearchStr } = useContext(GlobalContext).state;
	const navigate = useNavigate();

	const handleSearchChange = (val: string) => {
		setSearchStr(val);
		setTimeout(() => {
			navigate('/board/questionnaires');
		}, DEBOUNCE_DELAY);
	};
	return (
		<div className={`${styles.search}`}>
			<Box className={styles.icon}>
				<IconSearch style={{ height: rem(16), width: rem(16) }} stroke={2} />
			</Box>
			<Input
				onChange={(e) => handleSearchChange(e.target.value)}
				className={styles['search-input']}
				placeholder="Search..."
				variant="default"
			/>
		</div>
	);
}
