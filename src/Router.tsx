import HomeAdmin from '@containers/Home/HomeAdmin/HomeAdmin';
import HomePublic from '@containers/Home/HomePublic/HomePublic';
import Response from '@containers/Response/Response';
import { GlobalContext } from '@contexts/Global/Global.context';
import Loader from '@hoc/Loader/Loader';
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

const QuestionnaireList = React.lazy(
	() => import('@containers/Questionnaire/QuestionnaireList/QuestionnaireList'),
);
const ResponseList = React.lazy(() => import('@containers/Response/ResponseList/ResponseList'));
const QuestionnaireAnalytics = React.lazy(
	() => import('@containers/Questionnaire/QuestionnaireAnalytics/QuestionnaireAnalytics'),
);
const RespondQuestionnaire = React.lazy(() => import('@containers/Response/RespondQuestionnaire'));
const CreateQuestionnaire = React.lazy(
	() => import('@containers/Questionnaire/CreateQuestionnaire/CreateQuestionnaire'),
);
const EditQuestionnaire = React.lazy(
	() => import('@containers/Questionnaire/EditQuestionnaire/EditQuestionnaire'),
);
const NotFound = React.lazy(() => import('@containers/NotFound/NotFound'));

function Router() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;

	const adminPage = (
		<HomeAdmin>
			<React.Suspense fallback={<Loader />}>
				<Routes>
					<Route
						path="/*"
						element={
							<Routes>
								<Route path="/questionnaires" element={<QuestionnaireList />} />
								<Route path="/questionnaire/create" element={<CreateQuestionnaire />} />
								<Route path="/questionnaire/:sharedId" element={<QuestionnaireAnalytics />} />
								<Route path="/questionnaire/edit/:sharedId" element={<EditQuestionnaire />} />
								<Route path="/response/:id" element={<Response />} />
								<Route path="/responses" element={<ResponseList />} />
							</Routes>
						}
					/>
				</Routes>
			</React.Suspense>
		</HomeAdmin>
	);

	return (
		<Routes>
			<Route path="/questionnaire/:sharedId" element={<RespondQuestionnaire />} />
			{isLoggedIn ? <Route path="/board/*" element={adminPage} /> : null}
			<Route path="/" element={<HomePublic />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default Router;
