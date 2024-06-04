import '@mantine/core/styles.css';
import AuthModalContextProvider from '@contexts/AuthModal.context';
import AuthModal from '@components/AuthModal/AuthModal';
import Layout from '@hoc/Layout/Layout';
import style from './HomePublic.module.scss';

export default function HomePublic() {
	return (
		<AuthModalContextProvider>
			<Layout>
				<div className={style.HomePublic}>
					<h1>A fully featured questionnaire platform</h1>
					<p>
						Create and manage questionnaires easily - Queztro provides many form features that will cover
						you in any situation.
					</p>
					<AuthModal />
				</div>
			</Layout>
		</AuthModalContextProvider>
	);
}
