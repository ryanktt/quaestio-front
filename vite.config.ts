import { Plugin, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { exec } from 'child_process';
import chalk from 'chalk';
import path from 'path';

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

export default defineConfig({
	plugins: [react(), MadgeLogger()],
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, './src/components/'),
			'@constainers': path.resolve(__dirname, './src/constainers/'),
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
				additionalData: `@import "./src/_mantine";`,
			},
		},
	},
	worker: {},
});
