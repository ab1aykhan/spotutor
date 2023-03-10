module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		// add more generic rulesets here, such as:
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		// 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		"indent": ["error", "tab"],
		"vue/multi-word-component-names": "off"
	},
	"parser": "vue-eslint-parser",
	"parserOptions": {
		// Required for certain syntax usages
		"ecmaVersion": 2020,
		
	},
}