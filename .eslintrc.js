module.exports = {
	env: {
		es6: true,
		node: true,
	},
	"parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 8,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
	plugins: ['prettier'],
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	globals: {
		rootRequire: false
	},
	rules: {
		// eslint
		'no-console': ['warn', { allow: ['warn', 'error'] }],
		'lines-around-comment': ['error', { beforeBlockComment: true }],
		'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
		'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
		'no-nested-ternary': 'error',
		'no-trailing-spaces': 'error',
		'prefer-object-spread': 'error',
		'space-before-blocks': 'error',
		'spaced-comment': ['error', 'always'],
		'no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'ignoreRestSiblings': true }]
	},
};
