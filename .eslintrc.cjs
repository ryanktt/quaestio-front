module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	ignorePatterns: ['dist', '*.cjs', '*.js', 'src/utils/generated/*'],
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
				'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
				'react/jsx-props-no-spreading': 'off',
				'react/no-array-index-key': 'off',
				'react/react-in-jsx-scope': 'off',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/no-explicit-any': 'error',
				'@typescript-eslint/comma-spacing': 'error',
				'@typescript-eslint/no-shadow': 'off',
				'@typescript-eslint/semi': 'error',
				'import/no-extraneous-dependencies': 'off',
				'import/no-unresolved': 'off',
				'jsx-a11y/anchor-is-valid': 'off',
				'no-shadow': 'off',
				'react/require-default-props': 'off',
				'react-hooks/exhaustive-deps': 'off',
			},
		},
	],
};
