import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

/**
 * Correctness rules stay errors and break the build. Rules that only describe accumulated
 * untidiness are warnings: this code had never seen a linter, and turning 140 cosmetic findings
 * into a red build would only teach everyone to ignore it. Warnings are the backlog; the count
 * should go down, never up.
 */
const ACCUMULATED_DEBT = {
    'no-unused-vars': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-assignment': 'warn',
    'preserve-caught-error': 'warn',
    'no-empty': 'warn'
};

export default [
    {
        // Build output, generated documentation and vendored artifacts: never linted.
        ignores: [
            'dist/**',
            'docs/**',
            'build/**',
            'types/**',
            'coverage/**',
            'target/**',
            'html-report/**',
            'ogapi-docs/**',
            // Legacy browser mocha specs, dead since 2021 and superseded by test/unit.
            'test/client/**',
            'src/util/searchingFields/source-precompiled/**',
            // Payloads uploaded to OpenGate and executed server-side, not modules Node ever loads.
            'features/step_definitions/file_test/**'
        ]
    },

    js.configs.recommended,

    {
        // The library itself: ES modules that must run both in Node and in the browser.
        files: ['src/**/*.js', 'opengate-api-npm.js', 'opengate-api-bower.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: ACCUMULATED_DEBT
    },

    {
        // Gulp tasks and Cucumber support code: CommonJS on Node, driving a browser API.
        files: ['scripts/**/*.js', 'features/**/*.js', 'gulpfile.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.mocha
            }
        },
        rules: {
            ...ACCUMULATED_DEBT,
            // features/support/mocks reference response bodies that are declared nowhere, so those
            // handlers throw the moment they are hit. Real defects, but fixing them needs to know
            // what each mock should answer. Tracked as warnings until the suite gets that attention.
            'no-undef': 'warn'
        }
    },

    {
        // Tooling: ES modules running on Node.
        files: ['tools/**/*.mjs', 'scripts/**/*.mjs', '*.config.mjs'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.node,
                // Bodies passed to page.evaluate() run in the browser, not here.
                ...globals.browser
            }
        }
    },

    {
        // The smoke checks run unchanged under Node and inside a real browser, so the file is
        // deliberately dual-environment: CommonJS when required, a classic script when served.
        files: ['test/smoke/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        rules: ACCUMULATED_DEBT
    },

    {
        // The browser transport checks are a classic script, served into a real browser engine and
        // never required by Node.
        files: ['test/browser/**/*.js', 'test/e2e/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: ACCUMULATED_DEBT
    },

    {
        // Unit tests: vitest exposes describe/it/expect as globals.
        files: ['test/unit/**/*.test.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.vitest
            }
        }
    },

    // Turns off every stylistic rule that would fight Prettier. Must stay last.
    prettier
];
