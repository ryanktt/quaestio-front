import { ApolloError } from '@apollo/client';

export const getGraphqlErrorCode = (error?: ApolloError): string | undefined => {
	return (error?.graphQLErrors?.[0]?.extensions?.exception as { code?: string })?.code;
};

export const gqlUtils = {};
