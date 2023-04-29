module.exports = {
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'next/core-web-vitals',
  ],
  plugins: ['@typescript-eslint', 'react', 'prefer-arrow'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'eqeqeq': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ], // 関数定義をアロー関数式に統一
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ], // 通常の関数だろうが無名関数だろうが、関数定義をfunction (props){...}ではなく、(props)=>{...}に統一する
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowTernary: true },
    ], // 返り値がvoidの三項演算子(judge?a:b)を許容する スタイリッシュに書けて好きなので
  },
};
