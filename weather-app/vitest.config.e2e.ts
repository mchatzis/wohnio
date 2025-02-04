import { resolve } from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['**/*.e2e-spec.ts'],
        environment: 'node',
        alias: {
            '@': resolve(__dirname, './src')
        },
    },
    plugins: [swc.vite()]
});