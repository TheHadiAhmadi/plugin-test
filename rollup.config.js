import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from "path";
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';


/**
 * @type {import ("rollup").RollupOptions}
 */
export default {
    input: './index.ts',
    output: {
        format: 'esm',
        dir: './dist'
    },
    external: ['svelte', 'express', 'rollup', '@rollup/plugin-node-resolve','@undefined/plugin-svelte','@undefined/plugin-base','@undefined/plugin-express'],
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        typescript(),
    ]
}