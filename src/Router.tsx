import { Routes, Route } from 'react-router-dom';
import NotFound from '@containers/NotFound/NotFound';
import HomePublic from '@containers/Home/Home';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePublic />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default Router;
