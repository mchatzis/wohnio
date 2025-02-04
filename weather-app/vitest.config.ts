import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['src/**/*.spec.ts'],
        globals: false,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.(t|j)s'],
        },
        environment: 'node',
        alias: {
            '@': resolve(__dirname, './src')
        },
        setupFiles: [resolve(__dirname, 'vitest.setup.ts')],
    },
    plugins: [
        swc.vite({
            module: { type: 'es6' },
        }),
    ],
});