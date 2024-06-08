module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	ignorePatterns: ['dist', '*.cjs', '*.js', 'src/utils/generated/*', 'vite.config.ts'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'prettier'],
	parserOptions: {
		project: './tsconfig.json',
	},
	rules: {
		'prettier/prettier': 'error',
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
	},
	overrides: [
		{
			files: ['*.tsx', '*.ts'],
			extends: ['airbnb/hooks', 'airbnb-typescript', 'airbnb', 'plugin:prettier/recommended'],
			plugins: ['@typescript-eslint', 'prettier'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'error',
				'@typescript-eslint/comma-spacing': 'error',
				'@typescript-eslint/semi': 'error',
				'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
				'@typescript-eslint/explicit-function-return-type': 'off',
				'import/no-extraneous-dependencies': 'off',
				'react/jsx-props-no-spreading': 'off',
				'react-hooks/exhaustive-deps': 'off',
				'react/require-default-props': 'off',
				'react/react-in-jsx-scope': 'off',
				'import/no-unresolved': 'off',
				'no-shadow': 'off',
			},
		},
	],
};
