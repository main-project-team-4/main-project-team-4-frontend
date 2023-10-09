module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules/'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
};

// {
//   "parser": "@typescript-eslint/parser",
//   "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
//   "plugins": ["@typescript-eslint", "prettier"],
//   "ignorePatterns": ["node_modules/"],
//   "env": {
//       "browser": true,
//       "node": true
//   },
//   "rules": { "@typescript-eslint/explicit-module-boundary-types": "off" }
// }
