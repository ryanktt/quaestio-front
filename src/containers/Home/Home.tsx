import { useContext } from 'react';
import { GlobalContext } from '@contexts/Global/Global.context.tsx';
import HomePublic from './HomePublic/HomePublic.tsx';
import HomeAdmin from './HomeAdmin/HomeAdmin.tsx';

export default function Home() {
	const { isLoggedIn } = useContext(GlobalContext).state.auth;

	return isLoggedIn ? <HomeAdmin /> : <HomePublic />;
}
