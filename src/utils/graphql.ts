import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';

export const getGraphqlErrorCode = (error?: ApolloError | ErrorResponse): string | undefined => {
	return (error?.graphQLErrors?.[0]?.extensions?.exception as { code?: string })?.code;
};

export const gqlUtils = {};
