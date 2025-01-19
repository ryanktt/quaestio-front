import { getObjSelectedFields } from '@utils/objects.ts';
import { convertPropsToGqlVars } from '@utils/graphql.ts';
import { OptionInput } from '@gened/graphql.ts';
import { IOptionProps } from './UpsertOption.tsx';

export const buildGqlOptionVarsFromProps = (optionProps: IOptionProps): OptionInput => {
	return convertPropsToGqlVars(
		getObjSelectedFields(optionProps, ['correct', 'feedbackAfterSubmit', 'title']),
	) as OptionInput;
};

export const buildGqlOptionsVarsFromProps = (optionsProps?: IOptionProps[]): OptionInput[] | undefined => {
	if (!optionsProps) return undefined;
	return optionsProps.map(buildGqlOptionVarsFromProps);
};
