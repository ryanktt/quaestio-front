import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
	overwrite: true,
	schema: import.meta.env.VITE_GRAPHQL_ENDPOINT,
	documents: 'src/**/*.ts',
	watch: import.meta.env.VITE_MODE === 'development',
	generates: {
		'src/generated/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
				scalars: {
					DateTime: 'Date',
				},
			},
		},
	},
};

export default config;
