import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';

export const getGraphqlErrorCode = (error?: ApolloError | ErrorResponse): string | undefined => {
	return (error?.graphQLErrors?.[0]?.extensions?.exception as { code?: string })?.code;
};

export const convertPropsToGqlVars = <T>(props: unknown): T => {
	if (Array.isArray(props)) {
		return props.map(convertPropsToGqlVars).filter((item) => item !== null) as T;
	}

	if (props && typeof props === 'object') {
		return Object.fromEntries(
			Object.entries(props)
				.filter(([, value]) => value !== '' && value !== null && value !== undefined)
				.map(([key, value]) => [key, convertPropsToGqlVars(value)]),
		) as T;
	}

	return props as T;
};
