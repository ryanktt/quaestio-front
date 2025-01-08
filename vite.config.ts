import { Plugin, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { exec } from 'child_process';
import Joi from 'joi';
import chalk from 'chalk';
import path from 'path';

Joi.attempt(
	loadEnv('all', process.cwd()),
	Joi.object()
		.keys({
			VITE_GRAPHQL_ENDPOINT: Joi.string().required(),
			VITE_HOST: Joi.string().required(),
			VITE_MODE: Joi.string().valid('development', 'production'),
			VITE_PORT: Joi.number(),
		})
		.required(),
);

function MadgeLogger(): Plugin {
	exec('npx --no-install madge --circular src/App.tsx', (err, stdout, stderr) => {
		if (err) {
			console.error(chalk.red(`Error checking for circular dependencies: ${err}`));
			return;
		}
		console.log(chalk.cyanBright(stdout));
		if (stderr) console.error(chalk.cyan(stderr));
	});
	return { name: 'MadgeLogger' };
}

const env = loadEnv('all', process.cwd());
export default defineConfig({
	mode: env.VITE_MODE,
	server: {
		port: Number(env.VITE_PORT),
		host: env.VITE_HOST,
	},
	plugins: [react(), MadgeLogger()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components/'),
			'@containers': path.resolve(__dirname, './src/containers/'),
			'@contexts': path.resolve(__dirname, './src/contexts/'),
			'@gql': path.resolve(__dirname, './src/utils/gql/'),
			'@utils': path.resolve(__dirname, './src/utils/'),
			'@scss': path.resolve(__dirname, './src/scss/'),
			'@hoc': path.resolve(__dirname, './src/hoc/'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/scss/_master";`,
			},
		},
	},
	worker: {},
});
