interface ImportMetaEnv {
	readonly VITE_GRAPHQL_ENDPOINT: string;
	readonly VITE_MODE: 'development' | 'production';
	readonly VITE_HOST: string;
	readonly VITE_PORT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
