import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';
import { isDate } from 'lodash';

export const getGraphqlErrorCode = (error?: ApolloError | ErrorResponse): string | undefined => {
	return (error?.graphQLErrors?.[0]?.extensions?.exception as { code?: string })?.code;
};

/** Removes undefined or empty string values from props obj. */
export const convertPropsToGqlVars = <T>(props: unknown): T => {
	if (Array.isArray(props)) {
		return props.map(convertPropsToGqlVars).filter((item) => item !== undefined) as T;
	}
	if (isDate(props)) {
		return props.toISOString() as T;
	}

	if (props && typeof props === 'object') {
		return Object.fromEntries(
			Object.entries(props)
				.filter(([, value]) => value !== '' && value !== undefined)
				.map(([key, value]) => [key, convertPropsToGqlVars(value)]),
		) as T;
	}

	if (props && typeof props === 'string') {
		return props.trim() as T;
	}

	return props as T;
};
