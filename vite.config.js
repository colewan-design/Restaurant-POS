import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        hmr: {
            // host: 'localhost',
            // your IPV4 Address
            // host: '192.168.110.72', 
            host: '192.168.110.72', 
            // host: '169.254.125.251', // autoconfiguration IPV4 Address
        },
    },
    plugins: [
        VitePWA(),
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            // reactivityTransform: true,
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],

    resolve: {
        alias: {    
            vue: 'vue/dist/vue.esm-bundler.js',
            '@': path.resolve(__dirname, './resources/js'),
        },
    }
});
