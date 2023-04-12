module.exports = {
	root: true,
	env: {
	  node: true,
	},
	parser: "vue-eslint-parser",
	parserOptions: {
	  parser: "@typescript-eslint/parser",
	  ecmaVersion: 2020,
	  sourceType: "module",
	},
	extends: [
	  "plugin:@typescript-eslint/recommended",
	  "eslint:recommended",
	  "prettier/@typescript-eslint",
	  "plugin:prettier/recommended",
	  "plugin:vue/vue3-recommended",
	  "plugin:vue/recommended",
	  "prettier/vue",
	],
	plugins: ["prettier", "@typescript-eslint"],
	rules: {
	  "no-unused-vars": "off",
	  "@typescript-eslint/no-unused-vars-experimental": "error",
	  "vue/valid-attribute-name": "off",
	  "vue/no-parsing-error": ["off", {
		"unexpected-character-in-attribute-name": false,
		"unexpected-character-in-unquoted-attribute-value": false,
	  }],
	  "vue/html-indent": ["error", type, {
		"attribute": 1,
		"baseIndent": 1,
		"closeBracket": 0,
		"alignAttributesVertically": true,
		"ignores": []
	  }],
	  "vue/max-attributes-per-line": ["error", {
		"singleline": {
		  "max": 1
		},      
		"multiline": {
		  "max": 1
		}
	  }]
	},
	"ignorePatterns": ["dist"],
}   