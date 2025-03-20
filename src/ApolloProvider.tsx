import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
	Observable,
	from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AlertContext } from '@contexts/Alert/Alert.context';
import '@mantine/core/styles.css';
import { getGraphqlErrorCode } from '@utils/graphql.ts';
import { setContext } from 'apollo-link-context';
import { nanoid } from 'nanoid/non-secure';
import { PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { createState } from 'state-pool';

interface RequestContext {
	requestId?: string;
	loading?: boolean;
	errorCode?: string;
}
const apolloRequestCtxState = createState<RequestContext | null>(null);

const middleware = new ApolloLink((operation, forward) => {
	const operationType = operation.query.definitions.find(
		(definition) => definition.kind === 'OperationDefinition',
	)?.operation;
	if (operationType !== 'mutation') return forward(operation);

	const requestStartCtx = {
		requestId: nanoid(5),
		loading: true,
	};
	operation.setContext(requestStartCtx);
	apolloRequestCtxState.setValue(requestStartCtx);
	return forward(operation);
});

const afterware = new ApolloLink((operation, forward) => {
	return new Observable((observer) => {
		const handle = forward(operation).subscribe({
			next: (result) => {
				observer.next(result);
			},
			error: (networkError) => {
				observer.error(networkError);
			},
			complete: () => {
				const { requestId, errorCode } = operation.getContext() as RequestContext;
				if (!requestId) observer.complete();
				apolloRequestCtxState.setValue({ requestId, errorCode, loading: false });
				observer.complete();
			},
		});

		return () => {
			handle.unsubscribe();
		};
	});
});

const headerLink = setContext((_, previousContext) => ({
	headers: {
		...previousContext.headers,
		Auth: new Cookies().get('authData')?.authToken,
	},
})) as unknown as ApolloLink;

const client = new ApolloClient({
	defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network', errorPolicy: 'all' } },
	cache: new InMemoryCache(),
	link: from([
		onError((error) => {
			const errorCode = getGraphqlErrorCode(error);
			if (errorCode === 'SESSION_IS_NOT_ACTIVE') {
				new Cookies().remove('authData', { path: '/' });
			}

			const { requestId } = error.operation.getContext() as RequestContext;
			if (!requestId) return;
			const requestErrorCtx = {
				errorCode,
				loading: false,
				requestId,
			};
			error.operation.setContext(requestErrorCtx);
			apolloRequestCtxState.setValue(requestErrorCtx);
		}),
		middleware,
		afterware,
		headerLink.concat(new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT })),
	]),
});

function ApolloClientProvider({ children }: PropsWithChildren) {
	const alertState = useContext(AlertContext).state;
	const [apolloRequest] = apolloRequestCtxState.useState();
	const apolloRequestMemo = useMemo(() => apolloRequest, [apolloRequest]);

	useEffect(() => {
		if (!apolloRequest) return;

		const {
			errorCode: requestErrorCode,
			loading: requestLoading,
			requestId,
		} = apolloRequest as RequestContext;
		if (!requestId) return;

		const timeout = 2000;
		if (requestLoading) {
			alertState.setAlert({
				id: requestId,
				timeout: 5000,
				type: 'LOADING',
				title: 'Loading',
				message: `Please Wait`,
			});
		} else if (requestErrorCode) {
			alertState.setAlert({
				id: requestId,
				type: 'ERROR',
				title: 'Error',
				message: `Error Code: ${requestErrorCode}`,
				timeout,
			});
		} else {
			alertState.setAlert({
				id: requestId,
				type: 'SUCCESS',
				title: 'Success',
				message: 'Your request has been successfully sent',
				timeout,
			});
		}
	}, [apolloRequestMemo]);

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloClientProvider;
