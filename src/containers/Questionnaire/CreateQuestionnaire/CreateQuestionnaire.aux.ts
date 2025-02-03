/* eslint-disable no-underscore-dangle */
import { IQuestionnaireFormProps } from '@components/Questionnaire/QuestionnaireForm/QuestionnaireForm.interface';
import { CreateSurveyMutationVariables } from '@gened/graphql';
import { convertPropsToGqlVars } from '@utils/graphql';
import { buildQuestionDiscriminatorsFromProps } from '../Questionnaire.aux.ts';

export const buildCreateSurveyGqlVarsFromProps = (props: IQuestionnaireFormProps): CreateSurveyMutationVariables => {
	return convertPropsToGqlVars({
		...props,
		questions: buildQuestionDiscriminatorsFromProps(props.questions),
		type: undefined,
	}) as CreateSurveyMutationVariables;
};

export default { buildCreateSurveyGqlVarsFromProps };
