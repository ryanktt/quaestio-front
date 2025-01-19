import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from '@containers/NotFound/NotFound';
import HomePublic from '@containers/Home/HomePublic/HomePublic';
import QuestionnaireList from '@components/Questionnaire/QuestionnaireList/QuestionnaireList';
import UpsertQuestionnaire from '@components/Questionnaire/UpsertQuestionnaire/UpsertQuestionnaire';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '@contexts/Global/Global.context';
import HomeAdmin from '@containers/Home/HomeAdmin/HomeAdmin';

function Router() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) navigate('/board/questionnaires');
	}, []);

	if (!isLoggedIn) {
		return (
			<Routes>
				<Route path="/" element={<HomePublic />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<HomeAdmin>
			<Routes>
				<Route
					path="/board/*"
					element={
						<Routes>
							<Route path="/questionnaires" element={<QuestionnaireList />} />
							<Route path="/questionnaire/create" element={<UpsertQuestionnaire />} />
						</Routes>
					}
				/>
			</Routes>
		</HomeAdmin>
	);
}

export default Router;
