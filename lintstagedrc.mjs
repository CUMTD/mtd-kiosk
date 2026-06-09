import path from 'path';

const buildEslintCommand = (filenames) => [`eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`];

const config = {
	'**/*.(ts|tsx)': () => 'npx tsc --noEmit',
	'*.{js,jsx,ts,tsx}': [buildEslintCommand],
	'**/*.(md|json)': (filenames) => `npx prettier --write ${filenames.join(' ')}`
};

export default config;
