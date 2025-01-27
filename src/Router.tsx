import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePublic from '@containers/Home/HomePublic/HomePublic';
import { GlobalContext } from '@contexts/Global/Global.context';
import HomeAdmin from '@containers/Home/HomeAdmin/HomeAdmin';

const QuestionnaireList = React.lazy(() => import('@containers/Questionnaire/QuestionnaireList/QuestionnaireList'));
const CreateQuestionnaire = React.lazy(
	() => import('@containers/Questionnaire/CreateQuestionnaire/CreateQuestionnaire'),
);
const NotFound = React.lazy(() => import('@containers/NotFound/NotFound'));

function Router() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;

	return isLoggedIn ? (
		<HomeAdmin>
			<React.Suspense>
				<Routes>
					<Route
						path="/board/*"
						element={
							<Routes>
								<Route path="/questionnaires" element={<QuestionnaireList />} />
								<Route path="/questionnaire/create" element={<CreateQuestionnaire />} />
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
