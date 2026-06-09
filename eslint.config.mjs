import nextConfig from 'eslint-config-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = [
	{ ignores: ['dist/', '.next/', 'node_modules/'] },
	...nextConfig,
	{
		rules: {
			...jsxA11y.flatConfigs.strict.rules
		}
	},
	prettier,
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			'react-hooks': reactHooks
		},
		languageOptions: {
			globals: {
				React: 'readonly',
				google: 'readonly'
			}
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				1,
				{
					args: 'after-used',
					argsIgnorePattern: '^_'
				}
			],
			'react-hooks/set-state-in-effect': 'warn',
			'react-hooks/refs': 'warn',
			'react-hooks/purity': 'warn'
		}
	}
];

export default eslintConfig;
