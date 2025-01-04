import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
	overwrite: true,
	schema: import.meta.env.VITE_GRAPHQL_ENDPOINT,
	documents: 'src/**/*.ts',
	generates: {
		'src/utils/generated/graphql.ts': {
			// preset: 'client',
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: { withHooks: true },
		},
	},
};

export default config;
