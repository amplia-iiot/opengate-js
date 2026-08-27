import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        // test/client holds browser mocha specs, dead since 2021. Only test/unit runs here.
        include: ['test/unit/**/*.test.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text-summary', 'lcov'],
            include: ['src/**/*.js'],
            exclude: ['src/util/searchingFields/source-precompiled/**']
        }
    }
});
