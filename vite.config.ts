import react from '@vitejs/plugin-react-swc';
import chalk from 'chalk';
import { exec } from 'child_process';
import Joi from 'joi';
import path from 'path';
import { Plugin, defineConfig, loadEnv } from 'vite';
import vercel from 'vite-plugin-vercel';

Joi.attempt(
	loadEnv('all', process.cwd()),
	Joi.object()
		.keys({
			VITE_GRAPHQL_ENDPOINT: Joi.string().required(),
			VITE_HOST: Joi.string(),
			VITE_MODE: Joi.string().valid('development', 'production'),
			VITE_PORT: Joi.number(),
		})
		.unknown()
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
	plugins: [react(), MadgeLogger(), vercel()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components/'),
			'@containers': path.resolve(__dirname, './src/containers/'),
			'@contexts': path.resolve(__dirname, './src/contexts/'),
			'@gened': path.resolve(__dirname, './src/generated/'),
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
