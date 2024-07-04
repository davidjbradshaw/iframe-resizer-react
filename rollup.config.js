import svgr from '@svgr/rollup'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-url'

import pkg from './package.json'

export default {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: false,
    },
  ],
  plugins: [
    external({
      includeDependencies: true,
    }),
    postcss({
      modules: true,
    }),
    url(),
    svgr(),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
    copy({
      targets: [
        {
          src: "../iframe-resizer/example/frame.*",
          dest: "example/public/html",
        },
        {
          src: "node_modules/iframe-resizer/js/iframeResizer.*",
          dest: "example/public/js",
        },
        {
          src: "src/index.d.ts",
          dest: "dist",
        },
      ],
    }),
  ],
};
