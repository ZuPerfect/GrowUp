/*
 * @Author: zhupengfei6623
 * @Date: 2020-10-14 16:33:37
 * @Description: file content
 */
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  globals: {
    App: true,
    L: true,
    alert: true,
    isNaN: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    'max-len': [0, 130],
    'no-param-reassign': 'off',
    'global-require': 0,
    'import/no-dynamic-require': 0,
    // 关闭规则，对象属性不采用简写形式
    'object-shorthand': 'off',
    // 允许使用三元表达式
    'no-unneeded-ternary': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'no-prototype-builtins': 'off',
    'no-eval': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-nested-ternary': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    'quotes': 'off',
    "space-before-function-paren": 0
  }
}
