import HomeAdmin from '@containers/Home/HomeAdmin/HomeAdmin';
import HomePublic from '@containers/Home/HomePublic/HomePublic';
import { GlobalContext } from '@contexts/Global/Global.context';
import Loader from '@hoc/Loader/Loader';
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

const QuestionnaireList = React.lazy(() => import('@containers/Questionnaire/QuestionnaireList/QuestionnaireList'));
const RespondQuestionnaire = React.lazy(() => import('@containers/Response/RespondQuestionnaire'));
const CreateQuestionnaire = React.lazy(
	() => import('@containers/Questionnaire/CreateQuestionnaire/CreateQuestionnaire'),
);
const EditQuestionnaire = React.lazy(() => import('@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire'));
const NotFound = React.lazy(() => import('@containers/NotFound/NotFound'));

function Router() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;

	const byAuthRoutes = isLoggedIn ? (
		<HomeAdmin>
			<React.Suspense fallback={<Loader />}>
				<Routes>
					<Route
						path="/board/*"
						element={
							<Routes>
								<Route path="/questionnaires" element={<QuestionnaireList />} />
								<Route path="/questionnaire/create" element={<CreateQuestionnaire />} />
								<Route path="/questionnaire/edit/:sharedId" element={<EditQuestionnaire />} />
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

	return (
		<Routes>
			<Route element={byAuthRoutes} path="/*" />
			<Route path="/questionnaire/:sharedId" element={<RespondQuestionnaire />} />
		</Routes>
	);
}

export default Router;
