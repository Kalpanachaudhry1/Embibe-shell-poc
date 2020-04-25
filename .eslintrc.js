module.exports = {
    parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:you-dont-need-lodash-underscore/compatible'
    ],
    parserOptions: {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: 'module',  // Allows for the use of imports
        ecmaFeatures: {
            jsx: true,  // Allows for the parsing of JSX
        },
        project: './tsconfig.json',
    },
    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".tsx"] }],
        "react/jsx-indent": 'off',
        "import/no-unresolved": "off",
        "import/order": [1,
            {
                "alphabetize": {
                    order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
                    caseInsensitive: true /* ignore case. Options: [true, false] */
                }
            }
        ],
        "no-param-reassign": [2, { "props": false }],
        "jsx-quotes": ["error", "prefer-single"],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "ts": "never",
              "tsx": "never"
            }
        ],
        "react/prop-types": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/indent": ["off", 4]
    },
    settings: {
        react: {
            version: 'detect',  // Tells eslint-plugin-react to automatically detect the version of React to use
        },
        "import/resolver": {
            typescript: {} // this loads <rootdir>/tsconfig.json to eslint
        },
    },
    globals: {
        browser: true,
        fetch: true,
        serviceworker: true,
        describe: true,
        it: true,
        expect: true,
        document: true,
    },
    // ignorePatterns: ["craco.config.js", "node_modules/"],
}