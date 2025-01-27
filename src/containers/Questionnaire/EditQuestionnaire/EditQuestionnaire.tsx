// /* eslint-disable react/prop-types */
// import '@mantine/core/styles.css';
// import { useCreateSurveyMutation } from '@gened/graphql.ts';
// import { useEffect } from 'react';
// import { EQuestionnaireType, IUpsertQuestionnaireProps } from '../UpsertQuestionnaire/UpsertQuestionnaire.interface.ts';
// import { buildCreateSurveyGqlVarsFromProps } from './CreateQuestionnaire.aux.ts';
// import UpsertQuestionnaire from '../UpsertQuestionnaire/UpsertQuestionnaire.tsx';

// export default function EditQuestionnaire() {
// 	// const [surveyMutation, { data: surveyData, reset: resetSurvey }] = useCreateSurveyMutation();

// 	// const handleQuestionnaireCreation = async (props: IUpsertQuestionnaireProps) => {
// 	// 	const { type } = props;
// 	// 	if (type === EQuestionnaireType.Survey) {
// 	// 		await surveyMutation({ variables: buildCreateSurveyGqlVarsFromProps(props) });
// 	// 	}
// 	// };

// 	// useEffect(() => {
// 	// 	if (!surveyData) return;
// 	// 	resetSurvey();
// 	// }, [surveyData]);

// 	return <UpsertQuestionnaire method="EDIT" onSubmit={handleQuestionnaireCreation} />;
// }
