import { CreateSurveyMutationVariables } from '@gened/graphql';
import { convertPropsToGqlVars } from '@utils/graphql';
import { buildQuestionDiscriminatorsFromProps } from './UpsertQuestion/UpsertQuestion.aux.ts';
import { IUpsertQuestionnaireProps } from './UpsertQuestionnaire.interface.ts';

export const buildCreateSurveyGqlVarsFromProps = (props: IUpsertQuestionnaireProps): CreateSurveyMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateSurveyMutationVariables;
};

export const preventTE = '';
