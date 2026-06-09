import path from 'path';

const buildEslintCommand = (filenames) => [`eslint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(' ')}`];

const config = {
	'**/*.{ts|tsx}': () => 'tsc --noEmit',
	'*.{js,jsx,ts,tsx}': [buildEslintCommand],
	'**/*.{md|json}': (filenames) => `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`
};

export default config;
