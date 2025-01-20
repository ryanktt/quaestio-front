import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePublic from '@containers/Home/HomePublic/HomePublic';
import { GlobalContext } from '@contexts/Global/Global.context';
import HomeAdmin from '@containers/Home/HomeAdmin/HomeAdmin';

const QuestionnaireList = React.lazy(() => import('@components/Questionnaire/QuestionnaireList/QuestionnaireList'));
const UpsertQuestionnaire = React.lazy(
	() => import('@components/Questionnaire/UpsertQuestionnaire/UpsertQuestionnaire'),
);
const NotFound = React.lazy(() => import('@containers/NotFound/NotFound'));

function Router() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) navigate('/board/questionnaires');
		else navigate('/');
	}, [isLoggedIn]);

	return isLoggedIn ? (
		<HomeAdmin>
			<React.Suspense>
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
			</React.Suspense>
		</HomeAdmin>
	) : (
		<React.Suspense>
			<Routes>
				<Route path="/" element={<HomePublic />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</React.Suspense>
	);
}

export default Router;
