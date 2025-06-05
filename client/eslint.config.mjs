import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylisticJsx from '@stylistic/eslint-plugin-jsx'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: { 
      '@stylistic/jsx': stylisticJsx 
    },
    env: { 
      node: true 
    },
    rules: {
      "@stylistic/jsx/jsx-self-closing-comp": [
        "error", 
        { 
          component: true, 
          html: true
         }
      ]
    }
  },
];