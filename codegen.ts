import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:5000/graphql',
	documents: 'src/**/*.tsx',
	generates: {
		'src/utils/generated/graphql.ts': {
			// preset: 'client',
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: { withHooks: true },
		},
	},
};

export default config;
